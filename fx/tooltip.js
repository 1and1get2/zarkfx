/*
 * DOC_BEGIN
 *
 * Tooltip
 * ==============================
 *
 * 鼠标经过某个元素的时候想要有悬浮提示效果？试试tooltip吧。
 *
 * 此fx基于
 * `jQueryui tooltip <http://jqueryui.com/tooltip/>`_,
 * 由
 * `duoduo <http://my.oschina.net/duoduo3369/blog>`_
 * 开发。
 *
 *
 * Options
 * --------------
 *
 * :FX name: tooltip
 * :Description: 悬浮提示,使用此fx的元素必须指明title属性,否则没有效果。
 * :动画效果: 可选的效果有fade,explode,blind,bounce,clip,drop,fold,highlight,puff,pulsate,scale,shake,slide
 *
 * .. topic:: Arguments
 *
 *    .. list-table::
 *       :widths: 1 1 3 1 2
 *       :header-rows: 1
 *
 *       * - Param
 *         - R/O
 *         - Description
 *         - Default
 *         - Values
 *
 *       * - style
 *         - optional
 *         - 样式
 *         - smoothness
 *         - none | smoothness
 *
 *       * - content
 *         - optional
 *         - 提示框内的内容
 *         - -
 *         - 字符串
 *
 *       * - tr
 *         - optional
 *         - 动画效果
 *         - fade
 *         - none | fade
 *
 *       * - duration
 *         - optional
 *         - 提示消失效果持续的时间
 *         - 300
 *         - 毫秒
 *
 *       * - myH
 *         - optional
 *         - 用弹出提示框水平的哪个位置去依靠使用此fx元素
 *         - left
 *         - left | center | right
 *
 *       * - atH
 *         - optional
 *         - 弹出提示框在水平位置上依靠在使用此fx元素的哪个位置
 *         - left
 *         - left | center | right
 *
 *       * - myV
 *         - optional
 *         - 用弹出提示框垂直的哪个位置去依靠使用此fx元素
 *         - center + 30
 *         - top | center | bottom
 *
 *       * - atV
 *         - optional
 *         - 弹出提示框在垂直位置上依靠在使用此fx元素的哪个位置
 *         - center
 *         - top | center | bottom
 *
 *       * - collisionH
 *         - optional
 *         - 
 *         - flip
 *         - 
 *
 *       * - collisionV
 *         - optional
 *         - 
 *         - flip
 *         - 
 *
 * :提示: 你还可以给myH、myV、atH、atV加上偏移量，比如 myH=left+10
 *
 *
 * 点击查看样例
 * ------------
 *
 * 因为当前页面的css会影响到tooltip的样式，所以需要点击下面的按钮打开演示页面查看
 *
 * .. zarkfx:: :script:
 *
 *     <a href="/_static/demo/tooltip/demo.html" target="_blank" >查看样例</a>
 *
 * DOC_END
 * */

;(function(){
FX.register('tooltip', [ 'jqueryui-1.10.2','jqueryui-1.10.2/position','jqueryui-1.10.2/tooltip' ], {  
    style        : 'smoothness',
    content      : '',
    tr           : 'fade',
    duration     : 300,
    myH          : 'left',
    atH          : 'left',
    myV          : 'center+30',
    atV          : 'center',
    collisionH   : 'flip',
    collisionV   : 'flip'

}, function(attrs){
    var $this = $(this);
    if(attrs.tr){
        attrs.hide = {"effect":attrs.tr,"duration":attrs.duration};
    }
    if(attrs.myH || attrs.atH || attrs.myV || attrs.atV || attrs.collisionH|| attrs.collisionV){
        attrs.position = {
            "of":$this,
            "my":attrs.myH + ' ' + attrs.myV,
            "at":attrs.atH + ' ' + attrs.atV,
            "collision":attrs.collisionH + ' ' + attrs.collisionV
        }
    }
    $($this).tooltip(attrs);
});
})();
