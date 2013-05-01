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
 * 停留在最上面
 * --------------
 *
 * 向下滚动页面, 红块将停留在页面最顶部.
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="staytop" style="background-color: red; width:300px; height: 50px;" ></div>
 *     <div style="height:500px; width:300px; background-color: blue;"></div>
 *     <div style="height:500px; width:300px; background-color: yellow;"></div>
 *     <div style="height:500px; width:300px; background-color: green;"></div>
 *     <div style="height:500px; width:300px; background-color: black;"></div>
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

FX.register('staytop', [], {}, function(attrs){

    var $this = $(this),
        old_position = getElementTop(this),
        old_width = $this.width(),
        old_left = getElementLeft(this);
    
    $(window).scroll(function(){
        if ($(document).scrollTop() > old_position){
            $this.css('top',0).css('position','fixed');
            if(attrs.fullWidth){
                $this.css('width', $(window).width()).css('left', 0);
            }else{
                $this.css('left', old_left);
            };
        }else{
            $this.css('position','static').css('top','').css('left','').css('width',old_width);
        };
    });

    $(window).scroll();

});
})();
