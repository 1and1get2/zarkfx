/*
 * DOC_BEGIN
 *
 * Overlayer
 * =============
 *
 * overlayer fx用于给整个浏览器窗口添加一个遮罩层或背景层。
 *
 * 默认样式为一个透明不可见的遮罩层，你也可以用style=default参数指定使用默认的半透明样式。
 *
 * 或者用css给你的div设置自定义样式，甚至是一张图片遮罩。
 *
 *
 * Options
 * --------------
 *
 * :FX name: overlayer
 * :Description: 背景遮罩层
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
 *       * - style
 *         - optional
 *         - 遮罩层样式，默认无样式，目前仅提供default样式
 *         - none
 *         - default
 *
 *       * - zIndex
 *         - optional
 *         - 遮罩层的zIndex css
 *         - -
 *         - 正整数
 *
 * 点击按钮出现遮罩层
 * -------------------------
 *
 * .. zarkfx:: :demo:
 *
 *      <div id="overlayer1" style="display: none" fx="overlayer[style=default;zIndex=100;]" >
 *          <div fx="center[target=parent]" style="width: 100px; height: 100px;">
 *              <a fx="toggle[hide=#overlayer1]" style="color: white;" >点我消失</a>
 *          </div>
 *      </div>
 *      <a fx="toggle[show=#overlayer1]" >点我出现遮罩层</a>
 *
 * DOC_END
 * */


;(function(){
var is_ie6 = $.browser.msie && $.browser.version === 6;

if(is_ie6){ // ie6 hack
    
    var getScrollTop = function(){
        var scrollPos;
        if (typeof window.pageYOffset != 'undefined') {
            scrollPos = window.pageYOffset;
        }
        else if (typeof document.compatMode != 'undefined' &&
            document.compatMode != 'BackCompat') {
                scrollPos = document.documentElement.scrollTop;
            }
        else if (typeof document.body != 'undefined') {
            scrollPos = document.body.scrollTop;
        };
        return scrollPos;
    };
};

FX.register('overlayer', [], {
    style   :   'none',
    zIndex  :   undefined

}, function(attrs){

    var $this = $(this);
    
    if(is_ie6){
        $this.css('position', 'absolute');
        $this.width(document.documentElement.clientWidth);
        $this.height(document.documentElement.clientHeight)
        $(window).scroll(function(){
            $this.css('top', getScrollTop());
        });
    }else {
        $this.css('position', 'fixed');
        $this.width(window.screen.availWidth);
        $this.height(window.screen.availHeight);
    }

    $this.css('top', 0);
    $this.css('left', 0);

    if (attrs.zIndex) {
        $this.css('z-Index', attrs.zIndex);
    };

});
})();
