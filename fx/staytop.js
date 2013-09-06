/*
 * DOC_BEGIN
 *
 * Stay Top
 * ========
 *
 * 当页面向下滚动时, 保持某个元素出现在页面的最顶部，而不被卷出去.
 *
 * Options
 * --------------
 *
 * :FX name: staytop
 * :Description: 把元素浏览窗口顶部
 *
 * .. topic:: Arguments
 *
 *    .. list-table::
 *       :widths: 1 1 3 1 3
 *       :header-rows: 1
 *
 *       * - Param
 *         - R/O
 *         - Description
 *         - Default
 *         - Values
 *
 *       * - fullWidth
 *         - optional
 *         - 停留在顶部时是否让width等于浏览器窗口的width
 *         - false
 *         - true | false
 *
 *       * - marginTop
 *         - optional
 *         - 停留时, 距离顶部的像素距离
 *         - 0
 *         - 整数
 *
 *       * - stayAbove
 *         - optional
 *         - 指定一个页面元素，当
 *         - ""
 *         - jquery selector
 *
 *       * - marginBottom
 *         - optional
 *         - 停留时, 与 stayAbove 指定的元素保持的像素距离
 *         - 0
 *         - 整数
 *
 * 停留在最上面
 * ------------
 *
 * 向下滚动页面, 红块将停留在页面最顶部.
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="staytop" style="background-color:red; width:300px; height:50px;"></div>
 *     <div style="height:500px; width:300px; background-color: blue;"></div>
 *     <div style="height:500px; width:300px; background-color: yellow;"></div>
 *
 *
 * 停留在最上面，但可以被下侧的元素往上推
 * --------------------------------------
 *
 * 向下滚动页面, 红块将停留在页面最顶部.
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="staytop[stayAbove=#stop]" style="width:290px; border:5px solid black; margin-left:300px;">
 *         <p>菜单项 1</p>
 *         <p>菜单项 2</p>
 *         <p>菜单项 3</p>
 *     </div>
 *     <div style="height:500px; width:300px; background-color: green; margin-left:300px;"></div>
 *     <div id="stop" style="width:290px; border:5px solid black; margin-left:300px;">
 *         <p style="font-size: large; text-align: center;">到此为止</p>
 *     </div>
 *     <div style="height:500px; width:300px; background-color: black; margin-left:300px;"></div>
 *     <div style="height:2000px; width:300px; margin-left:300px;"></div>
 *
 *
 * DOC_END
 */

;(function(){
var getElementLeft = function(element){
    var actual_left = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null){
        actual_left += current.offsetLeft;
        current = current.offsetParent;
    }
    return actual_left;
};

var getElementTop = function(element){
    var actual_top = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null){
        actual_top += current.offsetTop;
        current = current.offsetParent;
    }
    return actual_top;
};

FX.register('staytop', [], {
    fullWidth       : false,
    marginTop       : 0,
    stayAbove       : '',
    marginBottom    : 0

}, function(attrs){

    var that = $(this),
        old_top = getElementTop(this),
        old_width = that.width();

    var clearFixed = function() {
        that.css('position', 'static').css('top', '').css('left', '').css('width', old_width);
    };

    $(window).scroll(function(){
        var scroll_top = $(document).scrollTop();
        if (scroll_top > (old_top - attrs.marginTop)) {
            var min_top;
            if (attrs.stayAbove !== '') {
                min_top = getElementTop($(attrs.stayAbove)[0]) - attrs.marginBottom - that.height() - scroll_top;
                if (min_top > attrs.marginTop) {
                    min_top = attrs.marginTop;
                };
            } else {
                min_top = attrs.marginTop;
            };
            if (min_top > old_top - scroll_top) {
                that.css('position', 'fixed').css('top', min_top);
                if (attrs.fullWidth) {
                    that.css('width', $(window).width()).css('left', 0);
                };
            } else {
                clearFixed();
            };
        } else {
            clearFixed();
        };
    });

    $(window).scroll();

});
})();
