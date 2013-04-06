/*
 *
 * DOC_BEGIN
 *
 * Scroll
 * ======
 *
 * 页面滚动
 *
 * 使用默认样式滚动到顶部
 * ------------------------
 *
 * 尝试点击右下角的滚动箭头回到顶部。
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="scroll[speed=500;style=default;]"></div>
 *
 *
 * 给某个指定的元素添加滚动功能
 * ---------------------------------
 *
 * 可以尝试使用不同的speed，数值越大滚动越慢，speed等于0时瞬间到达位置。
 *
 * .. zarkfx:: :demo:
 *
 *     <a fx="scroll[speed=100;]">快速滚吧</a>
 *
 *
 * 滚动到某个指定的元素
 * ---------------------------------
 *
 * 使用target属性指定滚动到第一个样例标题的位置。
 *
 * .. zarkfx:: :demo:
 *
 *     <a fx="scroll[speed=500;target=#id1;]">滚动到4.2.1</a>
 *
 *
 * 使用right和bottom属性设置滚动按钮的位置
 * ---------------------------------------
 *
 * 可以使用left或right指定水平位置，用top或bottom指定垂直位置，见右下角的文字按钮。
 * 并使用autoHide让文字自动隐藏。
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="scroll[speed=500;right=200;bottom=100;autoHide;]">我是最后一个例子的按钮</div>
 *
 *
 * DOC_END
 *
 */

FX.getFrame('jquery-1.7.2', function($){

    var is_ie6 = $.browser.msie && $.browser.version == 6;

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

    var scroll_objs = []
    var last_top = null;
    $(window).scroll(function(){
        var this_top = $(document).scrollTop();
        if (last_top === null || Math.abs(last_top-this_top) >= 10 || this_top === 0){
            last_top = this_top;
            for(var i in scroll_objs){
                if (scroll_objs[i].hideHeight < this_top){
                    scroll_objs[i].$hide_obj.fadeIn();
                }else{
                    if (scroll_objs[i].autoHide){
                        scroll_objs[i].$hide_obj.fadeOut();
                    };
                };
            };
        };
    });

    FX.register('scroll', [], function(attrs){
        var $this = $(this),
            $scroll_obj;

        if (attrs.style === 'default' ){
            $this.hide();
            $scroll_obj = $('<div class="zarkfx_scroll_style" ><div>').appendTo('body');
        }else{
            $scroll_obj = $this;
        };

        var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); // opera hack

        $scroll_obj.click(function(){
            if (attrs.target === undefined){
                target_top = 0;
            }else{
                target_top = $(attrs.target).offset().top + jQuery(document).scrollTop();
            };
            $body.animate({scrollTop: target_top}, parseInt(attrs.speed));
            return false;
        });

        // add to scroll_objs
        scroll_objs.push({hideHeight: attrs.hideHeight,
            $hide_obj: $scroll_obj,
            autoHide: attrs.autoHide
        });

        // show or hide this obj
        var this_top = $(document).scrollTop();
        if (attrs.hideHeight > this_top){
            if (attrs.autoHide){
                $scroll_obj.hide();
            };
        }else{
            $scroll_obj.show();
        };

        // set position
        if (attrs.top !== undefined || attrs.bottom !== undefined || attrs.left !== undefined || attrs.right !== undefined ){
            // 此处加入IE6判断，IE6使用绝对定位
            if(is_ie6){
                $scroll_obj.css('position','absolute').appendTo('body');
            }else{
                $scroll_obj.css('position','fixed').appendTo('body');
            };
        };
        if (attrs.bottom !== undefined) {
            if(is_ie6){
              $(window).scroll(function(){
                  var scroll_bottom = $(document).height() + parseInt(attrs.bottom) - $(window).height();
                  $this.css('bottom', scroll_bottom - getScrollTop());
              });
            }else{
                $scroll_obj.css('bottom', attrs.bottom + 'px');
            };
        };
        if (attrs.top !== undefined) {
            if(is_ie6){
              $(window).scroll(function(){
                  var scroll_top = parseInt(attrs.top);
                  $scroll_obj.css('top', scroll_top + getScrollTop());
              });
            }else{
                $scroll_obj.css('top', attrs.top + 'px');
            };
        };
        if (attrs.right !== undefined) $scroll_obj.css('right', attrs.right + 'px');
        if (attrs.left !== undefined) $scroll_obj.css('left', attrs.left + 'px');
    
    }, {
        style:          'none',
        speed:          0,
        hideHeight:     100,
        autoHide:       false,
        top:            undefined,
        bottom:         undefined,
        left:           undefined,
        right:          undefined,
        target:         undefined
    });
});
