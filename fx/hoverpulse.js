/*
 * DOC_BEGIN
 *
 * Hover Pulse
 * =============
 *
 * 实现hover某个div或图片时，让div或图片变大，突出显示。
 * 此fx基于 `jQuery HoverPulse Plugin <http://jquery.malsup.com/hoverpulse/>`_ 开发。
 *
 * Options
 * --------------
 *
 * :FX name: 
 * :Description: 
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
 *       * - size
 *         - option
 *         - hover时上下左右各增加的像素值
 *         - 20
 *         - 正整数
 *
 *       * - speed
 *         - option
 *         - 变大的速度，数值越小速度越快
 *         - 200
 *         - 正整数
 *
 *       * - zIndexActive
 *         - option
 *         - hover时上层元素的zIndex
 *         - 100
 *         - 正整数
 *
 *       * - zIndexNormal
 *         - option
 *         - 非hover时上层元素的zIndex
 *         - 1
 *         - 正整数
 *
 * hover时突出显示图片
 * -------------------------
 *
 * 以下样例中先给9个小div使用fload布局，然后对每个img元素使用hoverpulse
 *
 * .. zarkfx:: :demo:
 *
 *      <style  type="text/css">
 *          #thumbs {
 *              height: 198px;
 *              position: relative;
 *              width: 198px;
 *          }
 *          #thumbs div {
 *              float: left;
 *              height: 64px;
 *              padding: 1px;
 *              width: 64px;
 *          }
 *          #thumbs div img {
 *              border: 2px solid #FFFFFF;
 *              cursor: pointer;
 *              height: 64px;
 *              width: 64px;
 *          }
 *      </style>
 *      <div id="thumbs">
 *          <div><img fx="hoverpulse" src="http://malsup.github.com/images/beach1.jpg" /></div>
 *          <div><img fx="hoverpulse" src="http://malsup.github.com/images/beach2.jpg" /></div>
 *          <div><img fx="hoverpulse" src="http://malsup.github.com/images/beach3.jpg" /></div>
 *          <div><img fx="hoverpulse" src="http://malsup.github.com/images/beach4.jpg" /></div>
 *          <div><img fx="hoverpulse" src="http://malsup.github.com/images/beach5.jpg" /></div>
 *          <div><img fx="hoverpulse" src="http://malsup.github.com/images/beach6.jpg" /></div>
 *          <div><img fx="hoverpulse" src="http://malsup.github.com/images/beach7.jpg" /></div>
 *          <div><img fx="hoverpulse" src="http://malsup.github.com/images/beach8.jpg" /></div>
 *          <div><img fx="hoverpulse" src="http://malsup.github.com/images/beach9.jpg" /></div>
 *      </div>
 *
 * hover时div变大
 * -------------------------
 *
 *  使用size参数指定hover时左右两边各增加50px
 *
 * .. zarkfx:: :demo:
 *
 *      <div style="width: 100px; height:100px;">
 *          <div fx="hoverpulse[size=50;speed=1000;]" style="width: 100px; height:100px; background-color:gray;"/>
 *      </div>
 *
 * DOC_END
 * */


;(function(){
    /*
     * jQuery HoverPulse Plugin by M. Alsup
     * Examples and docs at: http://malsup.com/jquery/hoverpulse/
     * Dual licensed under the MIT and GPL
     * Requires: jQuery v1.2.6 or later
     * @version: 1.01  26-FEB-2009
     */
    (function($) {

        $.fn.hoverpulse = function(options) {
            // in 1.3+ we can fix mistakes with the ready state
            if (this.length == 0) {
                if (!$.isReady && this.selector) {
                    var s = this.selector, c = this.context;
                    $(function() {
                        $(s,c).hoverpulse(options);
                    });
                }
                return this;
            }    
            
            var opts = $.extend({}, $.fn.hoverpulse.defaults, options);

            // parent must be relatively positioned
            this.parent().css({ position: 'relative' });
            // pulsing element must be absolutely positioned
            this.css({ position: 'absolute', top: 0, left: 0 });

            this.each(function() {
                var $this = $(this);
                var w = $this.width(), h = $this.height();
                $this.data('hoverpulse.size', { w: parseInt(w), h: parseInt(h) });
            });

            // bind hover event for behavior
            return this.hover(
                // hover over
                function() {
                    var $this = $(this);
                    $this.parent().css('z-index', opts.zIndexActive);
                    
                    var size = $this.data('hoverpulse.size');
                    var w = size.w, h = size.h;
                    $this.stop().animate({ 
                        top:  ('-'+opts.size+'px'), 
                        left: ('-'+opts.size+'px'), 
                        height: (h+2*opts.size)+'px', 
                        width:	(w+2*opts.size)+'px' 
                    }, opts.speed);
                },
                // hover out
                function() {
                    var $this = $(this);
                    var size = $this.data('hoverpulse.size');
                    var w = size.w, h = size.h;
                    
                    $this.stop().animate({ 
                        top:  0, 
                        left: 0, 
                        height: (h+'px'), 
                        width:	(w+'px') 
                    }, opts.speed, function() {
                        $this.parent().css('z-index', opts.zIndexNormal);
                    });
                }
            );
        };

        $.fn.hoverpulse.defaults = {
            size:  20,
            speed: 200,
            zIndexActive: 100,
            zIndexNormal: 1
        };

    })(jQuery); // jQuery HoverPulse Plugin End

FX.register('hoverpulse', [], {
    size            : 20,
    speed           : 200,
    zIndexActive    : 100,
    zIndexNormal    : 1

}, function(attrs){
    $(this).hoverpulse(attrs);
});
})();
