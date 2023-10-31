<?php

namespace Widget\Metas\Category;

use Typecho\Common;
use Typecho\Db;
use Typecho\Widget\Exception;
use Widget\Base\Metas;
use Widget\Base\TreeTrait;

if (!defined('__TYPECHO_ROOT_DIR__')) {
    exit;
}

/**
 * Category Admin
 */
class Admin extends Metas
{
    use TreeTrait;

    /**
     * 执行函数
     *
     * @throws Db\Exception
     */
    public function execute()
    {
        $parentId = $this->request->filter('int')->get('parent', 0);
        $this->stack = $this->getRows($this->getChildIds($parentId));
    }

    /**
     * 向上的返回链接
     *
     * @throws Db\Exception
     */
    public function backLink()
    {
        if ($this->request->is('parent')) {
            $category = $this->getRow($this->request->filter('int')->get('parent'));

            if (!empty($category)) {
                $parent = $this->getRow($category['parent']);

                if ($parent) {
                    echo '<a href="'
                        . Common::url('manage-categories.php?parent=' . $parent['mid'], $this->options->adminUrl)
                        . '">';
                } else {
                    echo '<a href="' . Common::url('manage-categories.php', $this->options->adminUrl) . '">';
                }

                echo '&laquo; ';
                _e('返回父级分类');
                echo '</a>';
            }
        }
    }

    /**
     * 获取菜单标题
     *
     * @return string|null
     * @throws Db\Exception|Exception
     */
    public function getMenuTitle(): ?string
    {
        if ($this->request->is('parent')) {
            $category = $this->getRow($this->request->filter('int')->get('parent'));

            if (!empty($category)) {
                return _t('管理 %s 的子分类', $category['name']);
            }
        } else {
            return null;
        }

        throw new Exception(_t('分类不存在'), 404);
    }

    /**
     * 获取菜单标题
     *
     * @return string
     */
    public function getAddLink(): string
    {
        if ($this->request->is('parent')) {
            return 'category.php?parent=' . $this->request->filter('int')->get('parent');
        } else {
            return 'category.php';
        }
    }

    /**
     * @return array
     */
    protected function initTreeRows(): array
    {
        return $this->db->fetchAll($this->select()
            ->where('type = ?', 'category'));
    }
}
