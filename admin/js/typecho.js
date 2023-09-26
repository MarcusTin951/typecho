function scrollableEditor(f,d){var t,e=f.css(),n=f.width(),l=null,h=[],c=[],s=500,g=[],o={display:"block",position:"absolute",left:"-99999px",top:"-99999px"},i=$("<div></div>").appendTo(document.body),u=!1;for(t in e)t.match(/^(direction|font-family|font-size|font-style|font-weight|letter-spacing|line-height|text-align|vertical-align|white-space|word-wrap|word-break|word-spacing)$/i)&&(o[t]=e[t]);function r(e){var t=f.val().split("\n"),n=0;i.width(f.width()),c=[];for(var r,o,a=0;a<t.length;a++)i.text(t[a]),n+=i.height(),c.push(n);i.html(""),e=e,r=0,g=[],h=[],$(".line",d).each(function(){var e=$(this),t=e.data("start"),n=e.data("end"),o=e.data("start-original"),e=e.position().top+d.scrollTop();g.push([t,n,e,this]),void 0!==o?(h.push([t,o-1,c[o-1],r,0]),h.push([o,n,c[n],c[o-1],1])):h.push([t,n,c[n],r,1]),r=c[n]}),o=D(),e?null!==o&&b(o):b()}i.css(o),i.css("min-height",o["line-height"]);var m={};function p(e,n){var o,r,a=e.get(0),i=a.id;m[i]!=n&&(m[i]=n,o=performance.now(),r=a.scrollTop,window.requestAnimationFrame(function e(t){m[i]==n&&((t-=o)<s?(a.scrollTo({top:r+t/s*(n-r)}),window.requestAnimationFrame(e)):(a.scrollTo({top:n}),m[i]=-1))}))}function b(e){var t=f.height(),t=(f.innerHeight()-t)/2,n=f.scrollTop()-t,o=d.scrollTop(),r=0,a=null;if(void 0!==e){for(var i=0;i<g.length;i++)if(e>=(s=g[i])[0]&&e<=s[1]){(i==g.length-1||s[2]<o||g[i+1][2]>o+d.height())&&d.scrollTop(s[2]);break}}else{for(var l=0;l<h.length;l++)if(n<=(a=h[l])[2]){r=(n-a[3])*a[4]/(a[2]-a[3]);break}if(a)for(var c=0;c<g.length;c++){var s=g[c];if(a[0]>=s[0]&&a[1]<=s[1]){var u=g[c+1]?g[c+1][2]:d.get(0).scrollHeight,u=(0==l?0:s[2])+(u-s[2])*r;p(d,u);break}}}}function v(e){var e=$(e),t=e.parent();return 0<e.length&&e.prop("tagName").match(/^(hr|tr)$/i)?e:0<t.length&&"div"==t.prop("tagName").toLowerCase()?e.next():t}function D(){var e=f.val(),t=f.getSelection().start,n=0,o=0,r=null;if(u){for(;;){if(!(0<=(n=e.indexOf("\n",n))&&n<t))break;o++,n+=1}for(var a=0;a<g.length;a++){var i=g[a];if(o>=i[0]&&o<=i[1]){v(l).removeClass("focus"),v(i[3]).addClass("focus"),l=i[3],r=o;break}}}return r}f.on("touch keypress click",D),f.on("focus",function(){u=!0}).on("blur",function(){u=!1,v(l).removeClass("focus")}),f.on("resize",r);var a={editor:[!1,0,b],preview:[!1,0,function(){var e=f.height(),e=(f.innerHeight()-e)/2,t=d.scrollTop(),n=!1;if(!(g.length<=0)){for(var o=0;o<g.length;o++)if(t<g[o][2]){n=!0;break}var r,a=0<(r=n?g[0<o?o-1:0]:g[g.length-1])[0]?c[r[0]-1]:0,i=c[r[1]],l=n?g[0<o?o:1][2]:d.get(0).scrollHeight,l=(t-r[2])/(l-r[2]);p(f,a+(i-a)*l+e)}}]};return f.on("DOMMouseScroll mousewheel touchmove",function(){a.editor[0]=!0,a.editor[1]=performance.now()}),d.on("DOMMouseScroll mousewheel touchmove",function(){a.preview[0]=!0,a.preview[1]=performance.now()}),setInterval(function(){for(t in f.width()!=n&&(n=f.width(),f.trigger("resize")),a){var e=a[t];e[0]&&100<=performance.now()-e[1]&&(e[0]=!1,e[2]())}},50),r}window.Typecho={insertFileToEditor:function(e,t,n){},uploadFile:function(e){},editorResize:function(e,t){$("#"+e).resizeable({minHeight:100,afterResize:function(e){$.post(t,{size:e})}})},uploadComplete:function(e){}},function(u){u.fn.dropdownMenu=function(n){this.each(function(){var e=this,t=u.extend({menuEl:null,btnEl:null},n);u(t.btnEl,e).click(function(){return u(this).toggleClass("active"),u(t.menuEl,e).toggle(),!1})})},u.fn.resizeable=function(e){var s=u.extend({minHeight:100,afterResize:null},e);return this.each(function(){var o,e=u('<span class="resize"><i></i></span>').insertAfter(this),r=0,a=s.minHeight,n=this;function i(e){var t=c(e).y,n=o+t;return t<=r&&(n-=5),r=t,n=Math.max(a,n),textarea.height(n+"px"),n<a&&l(),!1}function l(e){var t=textarea.outerHeight();u(document).unbind("mousemove",i).unbind("mouseup",l),textarea.css("opacity",1),textarea.focus(),textarea=null,o=null,r=0,s.afterResize&&s.afterResize.call(n,t)}function c(e){return{x:e.clientX+document.documentElement.scrollLeft,y:e.clientY+document.documentElement.scrollTop}}e.bind("mousedown",{el:this},function(e){return(textarea=u(e.data.el)).blur(),r=c(e).y,o=textarea.height()-r,textarea.css("opacity",.25),u(document).mousemove(i).mouseup(l),!1})})},u.fn.tableSelectable=function(e){var n=this,o=u.extend({checkEl:null,rowEl:null,selectAllEl:null,actionEl:null},e);function r(e){var e=u(e),t=u(o.checkEl,e),n=t.prop("checked");t.length&&(t.prop("checked",!n),n?e.removeClass("checked"):e.addClass("checked"))}u(o.rowEl,this).each(function(){u(o.checkEl,this).click(function(e){r(u(this).parents(o.rowEl))})}).click(function(e){var t=u(e.toElement||e.target),n=t.prop("tagName").toLowerCase();0<=u.inArray(n,["input","textarea","a","button","i"])&&"checkbox"!=t.attr("type")?e.stopPropagation():r(this)}),u(o.selectAllEl).click(function(){u(this).prop("checked")?u(o.rowEl,n).each(function(){var e=u(this);0<u(o.checkEl,this).prop("checked",!0).length&&e.addClass("checked")}):u(o.rowEl,n).each(function(){var e=u(this);0<u(o.checkEl,this).prop("checked",!1).length&&e.removeClass("checked")})}),u(o.actionEl).click(function(){var e=u(this),t=e.attr("lang");return t&&!confirm(t)||n.parents("form").attr("action",e.attr("href")).submit(),!1})}}($),function(l){l.tableDnD={currentTable:null,dragObject:null,mouseOffset:null,oldY:0,build:function(o){return o=o||{},this.each(function(){var e,t,n;this.tableDnDConfig={onDragStyle:o.onDragStyle,onDropStyle:o.onDropStyle,onDragClass:o.onDragClass||"tDnD_whileDrag",onDrop:o.onDrop,onDragStart:o.onDragStart,scrollAmount:o.scrollAmount||5},l.tableDnD.makeDraggable(this),0==$("tfoot",this).length&&0<$("thead",this).length&&(t=$("thead",this),e=$("th",t).length,e=$('<tfoot class="kit-hidden-mb"><tr><td style="padding:0;height:0;line-height:0;border:none" colspan="'+e+'"></td></tr></tfoot>').insertAfter(t),"tfoot"!=(t=$("tr:last",this)).parent().prop("tagName").toLowerCase())&&(n=(t=$("td",t)).height(),t.height(n-e.outerHeight()))}),l(document).bind("mousemove",l.tableDnD.mousemove).bind("mouseup",l.tableDnD.mouseup),this},makeDraggable:function(t){for(var e=t.rows,n=t.tableDnDConfig,o=0;o<e.length;o++)$(e[o]).hasClass("nodrag")||l(e[o]).mousedown(function(e){if("TD"==e.target.tagName)return l.tableDnD.dragObject=this,l.tableDnD.currentTable=t,l.tableDnD.mouseOffset=l.tableDnD.getMouseOffset(this,e),n.onDragStart&&n.onDragStart(t,this),!1}).css("cursor","move")},mouseCoords:function(e){return e.pageX||e.pageY?{x:e.pageX,y:e.pageY}:{x:e.clientX+document.body.scrollLeft-document.body.clientLeft,y:e.clientY+document.body.scrollTop-document.body.clientTop}},getMouseOffset:function(e,t){t=t||window.event;e=this.getPosition(e),t=this.mouseCoords(t);return{x:t.x-e.x,y:t.y-e.y}},getPosition:function(e){var t=0,n=0;for(0==e.offsetHeight&&(e=e.firstChild);e.offsetParent;)t+=e.offsetLeft,n+=e.offsetTop,e=e.offsetParent;return{x:t+=e.offsetLeft,y:n+=e.offsetTop}},mousemove:function(e){var t,n,o,r;if(null!=l.tableDnD.dragObject)return t=l(l.tableDnD.dragObject),n=l.tableDnD.currentTable.tableDnDConfig,o=(e=l.tableDnD.mouseCoords(e)).y-l.tableDnD.mouseOffset.y,r=window.pageYOffset,document.all&&(void 0!==document.compatMode&&"BackCompat"!=document.compatMode?r=document.documentElement.scrollTop:void 0!==document.body&&(r=document.body.scrollTop)),e.y-r<n.scrollAmount?window.scrollBy(0,-n.scrollAmount):(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight)-(e.y-r)<n.scrollAmount&&window.scrollBy(0,n.scrollAmount),o!=l.tableDnD.oldY&&(e=o>l.tableDnD.oldY,l.tableDnD.oldY=o,n.onDragClass?t.addClass(n.onDragClass):t.css(n.onDragStyle),r=l.tableDnD.findDropTargetRow(t,o))&&(e&&l.tableDnD.dragObject!=r?l.tableDnD.dragObject.parentNode.insertBefore(l.tableDnD.dragObject,r.nextSibling):e||l.tableDnD.dragObject==r||l.tableDnD.dragObject.parentNode.insertBefore(l.tableDnD.dragObject,r)),!1},findDropTargetRow:function(e,t){for(var n=l.tableDnD.currentTable.rows,o=0;o<n.length;o++){var r=n[o],a=this.getPosition(r).y,i=parseInt(r.offsetHeight)/2;if(0==r.offsetHeight&&(a=this.getPosition(r.firstChild).y,i=parseInt(r.firstChild.offsetHeight)/2),a-i<t&&t<a+i)return r==e?null:(a=l.tableDnD.currentTable.tableDnDConfig).onAllowDrop?a.onAllowDrop(e,r)?r:null:$(r).hasClass("nodrop")?null:r}return null},mouseup:function(e){var t,n;l.tableDnD.currentTable&&l.tableDnD.dragObject&&(t=l.tableDnD.dragObject,(n=l.tableDnD.currentTable.tableDnDConfig).onDragClass?l(t).removeClass(n.onDragClass):l(t).css(n.onDropStyle),l.tableDnD.dragObject=null,n.onDrop&&n.onDrop(l.tableDnD.currentTable,t),l.tableDnD.currentTable=null)},serialize:function(){if(l.tableDnD.currentTable){for(var e="",t=l.tableDnD.currentTable.id,n=l.tableDnD.currentTable.rows,o=0;o<n.length;o++)0<e.length&&(e+="&"),e+=t+"[]="+n[o].id;return e}return"Error: No Table id set, you need to set an id on your table and every row"}},l.fn.extend({tableDnD:l.tableDnD.build})}($),function(b){t=document.createElement("input"),e="onpaste",t.setAttribute(e,"");var v,e,D=("function"==typeof t[e]?"paste":"input")+".mask",t=navigator.userAgent,w=/iphone/i.test(t),y=/android/i.test(t);b.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},b.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&((n=this.createTextRange()).collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(n,g){var o,m,i,l,p;return!n&&0<this.length?b(this[0]).data(b.mask.dataName)():(g=b.extend({placeholder:b.mask.placeholder,completed:null},g),o=b.mask.definitions,m=[],i=p=n.length,l=null,b.each(n.split(""),function(e,t){"?"==t?(p--,i=e):o[t]?(m.push(new RegExp(o[t])),null===l&&(l=m.length-1)):m.push(null)}),this.trigger("unmask").each(function(){var c=b(this),s=b.map(n.split(""),function(e,t){if("?"!=e)return o[e]?g.placeholder:e}),r=c.val();function u(e){for(;++e<p&&!m[e];);return e}function f(e,t){var n,o;if(!(e<0)){for(n=e,o=u(t);n<p;n++)if(m[n]){if(!(o<p&&m[n].test(s[o])))break;s[n]=s[o],s[o]=g.placeholder,o=u(o)}h(),c.caret(Math.max(l,e))}}function e(e){var t,n,o=e.which;8===o||46===o||w&&127===o?(t=(n=c.caret()).begin,(n=n.end)-t==0&&(t=46!==o?function(e){for(;0<=--e&&!m[e];);return e}(t):n=u(t-1),n=46===o?u(n):n),d(t,n),f(t,n-1),e.preventDefault()):27==o&&(c.val(r),c.caret(0,a()),e.preventDefault())}function t(e){var t,n=e.which,o=c.caret();if(!(e.ctrlKey||e.altKey||e.metaKey||n<32)&&n){if(o.end-o.begin!=0&&(d(o.begin,o.end),f(o.begin,o.end-1)),(o=u(o.begin-1))<p&&(t=String.fromCharCode(n),m[o].test(t))){for(var r,a,i=o,l=g.placeholder;i<p;i++)if(m[i]){if(r=u(i),a=s[i],s[i]=l,!(r<p&&m[r].test(a)))break;l=a}s[o]=t,h(),n=u(o),y?setTimeout(b.proxy(b.fn.caret,c,n),0):c.caret(n),g.completed&&p<=n&&g.completed.call(c)}e.preventDefault()}}function d(e,t){for(var n=e;n<t&&n<p;n++)m[n]&&(s[n]=g.placeholder)}function h(){c.val(s.join(""))}function a(e){var t,n=c.val(),o=-1,r=0;for(pos=0;r<p;r++)if(m[r]){for(s[r]=g.placeholder;pos++<n.length;)if(t=n.charAt(pos-1),m[r].test(t)){s[r]=t,o=r;break}if(pos>n.length)break}else s[r]===n.charAt(pos)&&r!==i&&(pos++,o=r);return e?h():o+1<i?(c.val(""),d(0,p)):(h(),c.val(c.val().substring(0,o+1))),i?r:l}c.data(b.mask.dataName,function(){return b.map(s,function(e,t){return m[t]&&e!=g.placeholder?e:null}).join("")}),c.attr("readonly")||c.one("unmask",function(){c.unbind(".mask").removeData(b.mask.dataName)}).bind("focus.mask",function(){var e;clearTimeout(v),r=c.val(),e=a(),v=setTimeout(function(){h(),e==n.length?c.caret(0,e):c.caret(e)},10)}).bind("blur.mask",function(){a(),c.val()!=r&&c.change()}).bind("keydown.mask",e).bind("keypress.mask",t).bind(D,function(){setTimeout(function(){var e=a(!0);c.caret(e),g.completed&&e==c.val().length&&g.completed.call(c)},0)}),a()}))}})}(jQuery),jQuery.fn.extend({getSelection:function(){var o=this.get(0);return o?(("selectionStart"in o?function(){var e=o.selectionEnd-o.selectionStart;return{start:o.selectionStart,end:o.selectionEnd,length:e,text:o.value.substr(o.selectionStart,e)}}:window.getSelection()&&function(){var e=window.getSelection().getRangeAt(0);return{start:e.startOffset,end:e.endOffset,length:e.endOffset-e.startOffset,text:e.toString()}})||(document.selection?function(){o.focus();var e,t,n=document.selection.createRange();return null===n?{start:0,end:o.value.length,length:0}:(t=(e=o.createTextRange()).duplicate(),e.moveToBookmark(n.getBookmark()),t.setEndPoint("EndToStart",e),{start:t.text.length,end:t.text.length+n.text.length,length:n.text.length,text:n.text})}:function(){return null}))():null},setSelection:function(e,t){var n=this.get(0);n&&(n.setSelectionRange?(n.focus(),n.setSelectionRange(e,t)):n.createTextRange&&((n=n.createTextRange()).collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select()))},replaceSelection:function(){var e,t=this.get(0);return t?(e=arguments[0]||"",(("selectionStart"in t?function(){return t.value=t.value.substr(0,t.selectionStart)+e+t.value.substr(t.selectionEnd,t.value.length),this}:document.selection&&function(){return t.focus(),document.selection.createRange().text=e,this})||function(){return t.value+=e,jQuery(t)})()):null}}),jQuery.cookie=function(e,t,n){var o,r;return 1<arguments.length&&"[object Object]"!==String(t)?(n=jQuery.extend({},n),null==t&&(n.expires=-1),"number"==typeof n.expires&&(o=n.expires,(r=n.expires=new Date).setDate(r.getDate()+o)),t=String(t),document.cookie=[encodeURIComponent(e),"=",n.raw?t:encodeURIComponent(t),n.expires?"; expires="+n.expires.toUTCString():"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join("")):(r=(n=t||{}).raw?function(e){return e}:decodeURIComponent,(o=new RegExp("(?:^|; )"+encodeURIComponent(e)+"=([^;]*)").exec(document.cookie))?r(o[1]):null)},function(i){var m=i.scrollTo=function(e,t,n){i(window).scrollTo(e,t,n)};function e(e){return"object"==typeof e?e:{top:e,left:e}}m.defaults={axis:"xy",duration:1.3<=parseFloat(i.fn.jquery)?0:1,limit:!0},m.window=function(e){return i(window)._scrollable()},i.fn._scrollable=function(){return this.map(function(){var e,t=this;return t.nodeName&&-1==i.inArray(t.nodeName.toLowerCase(),["iframe","#document","html","body"])?t:(e=(t.contentWindow||t).document||t.ownerDocument||t,/webkit/i.test(navigator.userAgent)||"BackCompat"==e.compatMode?e.body:e.documentElement)})},i.fn.scrollTo=function(t,n,g){return"object"==typeof n&&(g=n,n=0),"function"==typeof g&&(g={onAfter:g}),"max"==t&&(t=9e9),g=i.extend({},m.defaults,g),n=n||g.duration,g.queue=g.queue&&1<g.axis.length,g.queue&&(n/=2),g.offset=e(g.offset),g.over=e(g.over),this._scrollable().each(function(){if(null!=t){var l,c=this,s=i(c),u=t,f={},d=s.is("html,body");switch(typeof u){case"number":case"string":if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(u)){u=e(u);break}if(!(u=i(u,this)).length)return;case"object":(u.is||u.style)&&(l=(u=i(u)).offset())}i.each(g.axis.split(""),function(e,t){var n="x"==t?"Left":"Top",o=n.toLowerCase(),r="scroll"+n,a=c[r],i=m.max(c,t);l?(f[r]=l[o]+(d?0:a-s.offset()[o]),g.margin&&(f[r]-=parseInt(u.css("margin"+n))||0,f[r]-=parseInt(u.css("border"+n+"Width"))||0),f[r]+=g.offset[o]||0,g.over[o]&&(f[r]+=u["x"==t?"width":"height"]()*g.over[o])):(n=u[o],f[r]=n.slice&&"%"==n.slice(-1)?parseFloat(n)/100*i:n),g.limit&&/^\d+$/.test(f[r])&&(f[r]=f[r]<=0?0:Math.min(f[r],i)),!e&&g.queue&&(a!=f[r]&&h(g.onAfterFirst),delete f[r])}),h(g.onAfter)}function h(e){s.animate(f,n,g.easing,e&&function(){e.call(this,t,g)})}}).end()},m.max=function(e,t){var n,o,r,t="x"==t?"Width":"Height",a="scroll"+t;return i(e).is("html,body")?(n="client"+t,o=e.ownerDocument.documentElement,r=e.ownerDocument.body,Math.max(o[a],r[a])-Math.min(o[n],r[n])):e[a]-i(e)[t.toLowerCase()]()}}(jQuery),jQuery.fn.css2=jQuery.fn.css,jQuery.fn.css=function(){if(arguments.length)return jQuery.fn.css2.apply(this,arguments);for(var e=["font-family","font-size","font-weight","font-style","color","box-sizing","text-transform","text-decoration","letter-spacing","box-shadow","line-height","text-align","vertical-align","direction","background-color","background-image","background-repeat","background-position","background-attachment","opacity","width","height","top","right","bottom","left","margin-top","margin-right","margin-bottom","margin-left","padding-top","padding-right","padding-bottom","padding-left","border-top-width","border-right-width","border-bottom-width","border-left-width","border-top-color","border-right-color","border-bottom-color","border-left-color","border-top-style","border-right-style","border-bottom-style","border-left-style","position","display","visibility","z-index","overflow-x","overflow-y","white-space","clip","float","clear","cursor","list-style-image","list-style-position","list-style-type","marker-offset","word-wrap","word-break","word-spacing"],t=e.length,n={},o=0;o<t;o++)n[e[o]]=jQuery.fn.css2.call(this,e[o]);return n};