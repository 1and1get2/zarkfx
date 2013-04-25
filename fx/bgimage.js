/*
 *
 * DOC_BEGIN
 *
 * Background Image
 * ====================
 *
 * 有时我们需要给整个网页添加一张背景图，并希望无论浏览器的尺寸如何变动都能盖满整个浏览器窗口，并且图片不会变形。
 *
 * 使用bgimage可以轻松给整个网页或某个div指定一张如上所述的背景图，甚至让多张背景图片轮流切换。并可指定图片的"正中"或是"左上角"等某个位置保证一定显示。
 *
 * 比如当你希望显示某种尺寸的图片，但你的图片可能不符合预想尺寸时，就可以使用bgimage避免图片变形。
 *
 * 注意，如果你用wrapper=body指定图片作为整个页面的背景，那么需要你自己用css让body的高度与视觉一致(可用firebug查看是否一致)。
 *
 * 本fx由Sparker5团队原创开发。
 *
 * Options
 * --------------
 *
 * :FX name: bgimage
 * :Description: 自适应屏幕的背景图显示
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
 *       * - wrapper
 *         - optional
 *         - 图片的上一层元素，默认为上一层元素，为body表示作为整站背景图。
 *         - -
 *         - css 选择器
 *
 *
 *       * - resize
 *         - optional
 *         - 浏览器窗口尺寸变动时自动调整图片
 *         - true
 *         - true | false
 *
 *       * - h
 *         - optional
 *         - 保持图片水平位置的那一部分一直可见
 *         - center
 *         - left center right
 *
 *       * - v
 *         - optional
 *         - 保持图片垂直位置的那一部分一直可见
 *         - center
 *         - top center bottom
 *
 *       * - next
 *         - optional
 *         - 显示当前组(相同wrapper表示为同一组)图片的下一张。仅对同一组的第一个元素使用。
 *         - -
 *         - css 选择器
 *
 *       * - prev
 *         - optional
 *         - 显示当前组(相同wrapper表示为同一组)图片的上一张。仅对同一组的第一个元素使用。
 *         - -
 *         - css 选择器
 *
 *       * - tr
 *         - optional
 *         - 图片切换效果。仅对同一组的第一个元素使用。
 *         - fade
 *         - fade
 *
 *       * - speed
 *         - optional
 *         - 两张图片切换的速度，值越小速度越快。仅对同一组的第一个元素使用。
 *         - 750
 *         - 正整数
 *
 *       * - interval
 *         - optional
 *         - 两张图片切换的时间间隔。仅对同一组的第一个元素使用。
 *         - 3000
 *         - 正整数
 *
 *       * - autoplay
 *         - optional
 *         - 默认是否自动切换。仅对同一组的第一个元素使用。
 *         - false
 *         - false | true
 *
 *
 *
 * div为200x150，图片正好显示
 * -----------------------------------
 *
 * 下面的div与图片的尺寸均为200x150
 *
 * .. zarkfx:: :demo:
 *
 *     <div style="width:200px; height:150px;" >
 *         <img src="http://sparker5.com/img/page/w_aoaola.jpg" fx="bgimage" />
 *     </div>
 *
 * div为200x200，图片居中显示，且不会被压缩
 * -------------------------------------------------
 *
 * 把div改为200x200，图片居中显示，注意图片的显示比例保存不变。
 *
 * .. zarkfx:: :demo:
 *
 *     <div style="width:200px; height:200px;" >
 *         <img src="http://sparker5.com/img/page/w_aoaola.jpg" fx="bgimage" />
 *     </div>
 *
 * div为100x200，左边一直显示
 * -------------------------------------------------
 *
 * .. zarkfx:: :demo:
 *
 *     <div style="width:100px; height:200px;" >
 *         <img src="http://sparker5.com/img/page/w_aoaola.jpg" fx="bgimage[h=left]" />
 *     </div>
 *
 * div为200x150, 两张图片自动切换
 * -------------------------------------------------
 *
 * .. zarkfx:: :demo:
 *
 *     <div style="width:200px; height:150px;" >
 *         <img src="http://sparker5.com/img/page/w_aoaola.jpg" fx="bgimage[autoplay]" />
 *         <img src="http://sparker5.com/img/page/w_lxh.jpg" fx="bgimage" />
 *     </div>
 *
 *
 * 正中间一直显示并铺满整个网页背景
 * -------------------------------------------------
 *
 * 点击下面的"查看"按钮打开新页面，并拖动浏览器窗口改变尺寸看看，还可查看一下新页面的源代码。
 * 
 *
 * .. zarkfx:: :demo:
 *
 *     <a href="/_static/demo/bgimage/full.html" target="_blank" >查看</a>
 *
 *
 * DOC_END
 *
 */

FX.getFrame('jquery-1.7.2', function($){

    // 创建一个absolute的div，用于包裹img，超出的部分overflow
    var $body_wrapper = $("<div></div>").appendTo('body').css({
        margin: 0,
        padding: 0,
        position: "absolute",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: -999999999999
    });

    FX.register('bgimage', [], {
        wrapper: '',
        resize: true,
        zIndex: null,
        h: 'center',
        v: 'center',
        next: '',
        prev: '',
        tr: 'fade',
        speed: 750,
        autoplay: false,
        interval: 3000

    }, function(attrs){
        var $this = $(this),
            $wrapper, rate;

        if (attrs.wrapper === '' && $this.closest('div').length){
            $wrapper = $this.closest('div');
        }else if (attrs.wrapper === 'body' || attrs.wrapper === ''){
            $wrapper = $body_wrapper;
            $('body').css('position', 'relative').css('float', 'left');
        }else{
            $wrapper = $(attrs.wrapper);
        };

        if ($wrapper !== $body_wrapper){
            $wrapper.css("position", "relative").css("overflow", "hidden");
        }

        var fix = function(){
            if ($this.width()>0 && $this.height()>0){
                // =======计算图片的width与height==========
                var width = $this.width(),
                    height = $this.height(),
                    rate = width / height, // 图片的宽高比
                    wrapper_width = $wrapper.width(),
                    wrapper_height = $wrapper.height(),
                    wrapper_rate = wrapper_width / wrapper_height;

                // 如果wrapper_rate>rate，表示浏览器的宽度相对(高度)要大
                // 则让图片宽度与浏览器宽度相同
                if (wrapper_rate >= rate){
                    width = wrapper_width;
                    height = width / rate;
                    if (height < wrapper_height){
                        height = wrapper_height;
                        width = height * rate;
                    };
                // 否者浏览器的高度相对要大
                // 让图片的高度与浏览器的相同
                }else{
                    height = wrapper_height;
                    width = height * rate;
                    if (width < wrapper_width){
                        width = wrapper_width;
                        height = width / rate;
                    };
                };

                $this.width(width);
                $this.height(height);

                // =======根据h和v计算图片的top与left==========
                $this.css("position", "absolute");

                if (attrs.h === "left"){
                    $this.css("left", 0);
                }else if (attrs.h === "right"){
                    $this.css("right", 0);
                }else if (attrs.h === "center"){
                    $this.css("left", -(width-wrapper_width)/2);
                };

                if (attrs.v === "top"){
                    $this.css("top", 0);
                }else if (attrs.v === "bottom"){
                    $this.css("bottom", 0);
                }else if (attrs.v === "center"){
                    $this.css("top", -(height-wrapper_height)/2);
                };

            };
        };
    
        fix(); // 有可能已经load完了
        $this.load(fix);

        // 把当前图片放到$wrapper中
        $this.appendTo($wrapper);
    
        window.setInterval(fix, 100);

        if (attrs.zIndex){
            $this.css('z-index', attrs.zIndex);
        };

        // 隐藏本组内第一张以外的图片
        $wrapper.find('img:not(:first-child)').hide();

        // 处理next和prev按钮的事件
        if (typeof($.data($wrapper[0], 'zarkfx_bgimage_curr_index')) === 'undefined'){
            $.data($wrapper[0], 'zarkfx_bgimage_curr_index', 0);
        };
        var showNext = function(n){
            var curr_index = $.data($wrapper[0], 'zarkfx_bgimage_curr_index'),
                next_index = (curr_index + n + $wrapper.children().length) % $wrapper.children().length;
            $wrapper.children(':eq(' + curr_index + ')').fadeOut(attrs.speed);
            $wrapper.children(':eq(' + next_index + ')').fadeIn(attrs.spped);
            $.data($wrapper[0], 'zarkfx_bgimage_curr_index', next_index);
        };
        if (attrs.next){
            $(attrs.next).click(function(){ showNext(1); return false;});
        }
        if (attrs.prev){
            $(attrs.prev).click(function(){ showNext(-1); return false;});
        }

        // 绑定自动切换事件
        if (attrs.autoplay){
            window.setInterval(function(){ showNext(1);}, attrs.interval);
        };

    });

});
