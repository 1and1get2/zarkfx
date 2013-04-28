/*
 * DOC_BEGIN
 *
 * Center
 * ======
 *
 * 你想让某个元素在屏幕中央居中显示？或者是让某个div内的元素居中显示？使用center即可轻松实现，本fx基于 `jQuery Center Plugin<https://github.com/dreamerslab/jquery.center>`_ 开发
 *
 * Options
 * --------------
 *
 * :FX name: center
 * :Description: 让元素居中显示，停留在浏览器的正中间，或在某个div里居中
 *
 * .. topic:: Arguments
 *
 *    .. list-table::
 *       :widths: 1 1 4 1 2
 *       :header-rows: 1
 *
 *       * - Param
 *         - R/O
 *         - Description
 *         - Default
 *         - Values
 *
 *       * - target
 *         - optional
 *         - 居中的目标对象，默认显示在浏览器正中央，也可指定为某个div
 *         - window
 *         - window | parent | jquery selector
 *
 *       * - top
 *         - optional
 *         - 距离target的高度，单位像素。当使用此值时仅水平居中
 *         - false
 *         - 正整数
 *
 *       * - topPercentage
 *         - optional
 *         - 距离target的高度，单位百分比，等于1表示居底，等于0表示居顶。此值与top步能同时使用
 *         - fasle
 *         - 0-1 之间的小数
 *
 *       * - resize
 *         - optional
 *         - 是否在浏览器resize时自动重新计算
 *         - true
 *         - true | false
 *
 *       * - scroll
 *         - optional
 *         - 是浏览器滚动时是否保持居中在屏幕中间。仅在target=window时有效
 *         - true
 *         - true | false
 *
 *
 * 让div居中在浏览器正中间
 * -------------------------
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="center" style="width:100px; height:100px; background-color:gray; opacity: 0.8;"></div>
 *
 *
 * 在一个div里居中
 * -----------------------------
 *
 * .. zarkfx:: :demo:
 *
 *   <div style="width:300px; height:200px; background-color:gray;">
 *      <div fx="center[target=parent]"  style="width:100px; height:100px; background-color:red;"></div>
 *   </div>
 *
 *
 * DOC_END
 *
 * */


;(function(){
FX.register('center', ['center'], {
    target          : 'window',
    top             : false,
    topPercentage   : 0.5,
    resize          : true,
    scroll          : true

}, function(attrs){
    var $this = $(this);
    attrs.against = attrs.target;
    $this.css('position', 'absolute');
    if (attrs.target === 'parent') {
        $this.closest('div').css('position', 'relative');
    } else if (attrs.target !== 'window') {
        $(attrs.target).css('position', 'relative');
    };
    if (attrs.top !== false) {
        attrs.top = parseInt(attrs.top);
    }
    $this.center(attrs);
    if (attrs.target === 'window' && attrs.scroll) {
        $(window).scroll(function(){
            $this.center(attrs);
        });
    };
});
})();
