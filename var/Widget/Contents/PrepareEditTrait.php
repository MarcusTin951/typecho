<?php

namespace Widget\Contents;

use Typecho\Common;
use Typecho\Db\Exception as DbException;
use Typecho\Widget\Exception;
use Widget\Base\Metas;

trait PrepareEditTrait
{

    /**
     * 准备编辑
     *
     * @param string $type
     * @param bool $hasDraft
     * @param string $notFoundMessage
     * @return $this
     * @throws Exception|DbException
     */
    protected function prepareEdit(string $type, bool $hasDraft, string $notFoundMessage): self
    {
        if ($this->request->is('cid')) {
            $contentTypes = [$type];
            if ($hasDraft) {
                $contentTypes[] = $type . '_draft';
            }

            $this->db->fetchRow($this->select()
                ->where('table.contents.type IN ?', $contentTypes)
                ->where('table.contents.cid = ?', $this->request->filter('int')->get('cid'))
                ->limit(1), [$this, 'push']);

            if (!$this->have()) {
                throw new Exception($notFoundMessage, 404);
            }

            if ($hasDraft) {
                if ($type . '_draft' === $this->type && $this->parent) {
                    $this->response->redirect(
                        Common::url('write-' . $type . '.php?cid=' . $this->parent, $this->options->adminUrl)
                    );
                }

                $draft = $this->type === $type . '_draft' ? $this->row : $this->db->fetchRow($this->select()
                    ->where('table.contents.parent = ? AND table.contents.type = ?', $this->cid, $type . '_draft')
                    ->limit(1), [$this, 'filter']);

                if (isset($draft)) {
                    $draft['slug'] = ltrim($draft['slug'], '@');
                    $draft['type'] = $type;
                    $draft['draft'] = $draft;
                    $draft['cid'] = $this->cid;
                    $draft['tags'] = $this->db->fetchAll($this->db
                        ->select()->from('table.metas')
                        ->join('table.relationships', 'table.relationships.mid = table.metas.mid')
                        ->where('table.relationships.cid = ?', $draft['cid'])
                        ->where('table.metas.type = ?', 'tag'), [Metas::alloc(), 'filter']);

                    $this->push($draft);
                }
            }

            if (!$this->allow('edit')) {
                throw new Exception(_t('没有编辑权限'), 403);
            }
        }

        return $this;
    }

    /**
     * @return $this
     */
    abstract public function prepare(): self;

    /**
     * 获取网页标题
     *
     * @return string
     */
    public function getMenuTitle(): string
    {
        return _t('编辑 %s', $this->prepare()->title);
    }


    /**
     * 获取权限
     *
     * @param mixed ...$permissions
     * @return bool
     * @throws Exception|DbException
     */
    public function allow(...$permissions): bool
    {
        $allow = true;

        foreach ($permissions as $permission) {
            $permission = strtolower($permission);

            if ('edit' == $permission) {
                $allow &= ($this->user->pass('editor', true) || $this->authorId == $this->user->uid);
            } else {
                $permission = 'allow' . ucfirst(strtolower($permission));
                $optionPermission = 'default' . ucfirst($permission);
                $allow &= ($this->{$permission} ?? $this->options->{$optionPermission});
            }
        }

        return $allow;
    }
}
