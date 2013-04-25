/*
 * DOC_BEGIN
 *
 * Cycle
 * ======
 *
 * 此fx基于
 * `jQuery Cycle2 Plugin <http://jquery.malsup.com/cycle2/>`_.
 * 开发。
 * 感谢原作者蛋疼的精神。
 *
 * cycle用于多张图片(或多个div等)的轮播，比如淡入淡出切换，或者是其它花哨的效果。
 *
 * cycle支持options参数，这是zarkfx中比较特殊的一种调用方式。
 * 因为原cycle2.js程序支持非常丰富的参数，且有一些参数值是function变量，
 * 有时无法以“fx=***”这种html属性的方式调用cycle的高级功能。
 * 对于这种情况你可以自己在js文件中定义好options，然后传给fx。
 * 
 *
 * Options
 * --------------
 *
 * :FX name: cycle
 * :Description: 多张图片或多个div轮播
 * :slide: 以下说明中,slide表示被轮播的图片或者div。
 * :模版字符串: cycle中有许多参数的类型是"模版字符串"，表示在显示时字符串中用"{{}}"包裹的参数会被替换为具体的值。比如默认的captionTemplate='{{slideNum}} / {{slideCount}}'显示了当前显示了第几个slide，以及一共有多少个slide。
 * 可以使用的参数有：currSlide nextSlide slideNum slideCount busy paused 以及slide的其它属性，比如alt title等。
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
 *       * - allowWrap
 *         - optional
 *         - 是否允许展示到最后一张图片时自动跳转到第一张。仅在timeout=0时起作用。
 *         - true
 *         - true | false
 *
 *       * - autoHeight
 *         - optional
 *         - 
 *         - 0
 *         - 
 *
 *       * - caption
 *         - optional
 *         - 显示图片描述的元素，与caption-template参数一起使用
 *         - '> .cycle-caption'
 *         - jquery selector
 *
 *       * - captionTemplate
 *         - optional
 *         - 图片的描述文案模版。
 *         - '{{slideNum}} / {{slideCount}}'
 *         - 字符串模版
 *
 *       * - delay
 *         - optional
 *         -  网页打开后第一张图片开始轮播前的延迟时间，单位毫秒
 *         - 0
 *         - 
 *
 *       * - easing
 *         - optional
 *         -  动画时间函数。见 http://jqueryui.com/resources/demos/effect/easing.html
 *         - null
 *         - 
 *
 *       * - easeOut
 *         - optional
 *         -  配合easing使用
 *         - null
 *         - 
 *
 *       * - tr
 *         - optional
 *         -  动画效果。 见
 *         - fade
 *         - none | fade | fadeout | scrollHorz | scrollVert | carousel | shuffle | tileSlide | tileBlind
 *
 *       * - loader
 *         - optional
 *         -  为false表示按照img元素的默认顺序轮播，为true则不遵守默认顺序优先展示加载好的图片，为wait表示等待所有图片加载完毕才开始展示
 *         - false
 *         - true | false
 *
 *       * - log
 *         - optional
 *         -  是否在console中打印log
 *         - false
 *         - true | false
 *
 *       * - loop
 *         - optional
 *         -  循环播放次数，0表示无限次
 *         - 0
 *         - 
 *
 *       * - manualSpeed
 *         - optional
 *         -  由人点击触发切换图片时的切换速度
 *         - undefined
 *         - 
 *
 *       * - manualTrump
 *         - optional
 *         -   由人点击切换按钮时是否可以中断默认的播放
 *         - true
 *         - true | false
 *
 *       * - next
 *         - optional
 *         -  下一张图片的触发器
 *         - '> .cycle-next'
 *         - 
 *
 *       * - prev
 *         - optional
 *         - / 上一张图片的触发器
 *         - '> .cycle-prev'
 *         - 
 *
 *       * - nextEvent
 *         - optional
 *         -  触发下一张图片的事件
 *         - 'click.cycle'
 *         - 
 *
 *       * - prevEvent
 *         - optional
 *         -  触发上一张图片的事件
 *         - 'click.cycle'
 *         - 
 *
 *       * - overlay
 *         - optional
 *         -  指定覆盖在图片上面的描述层
 *         - '> .cycle-overlay'
 *         - 
 *
 *       * - overlayTemplate
 *         - optional
 *         -  描述层的显示模版
 *         - '<div>{{title}}</div><div>{{desc}}</div>'
 *         - 
 *
 *       * - pager
 *         - optional
 *         -  指定图片选择的小按钮或缩略图
 *         - '> .cycle-pager'
 *         - 
 *
 *       * - pagerEvent
 *         - optional
 *         -  触发pager的事件
 *         - 'click.cycle'
 *         - 
 *
 *       * - pagerTemplate
 *         - optional
 *         -  pager按钮的模版
 *         - '<span>&bull;</span>'
 *         - 
 *
 *       * - pagerActiveClass
 *         - optional
 *         -   当前选中的pager的class
 *         - 'cycle-pager-active'
 *         - 
 *
 *       * - pauseOnHover
 *         - optional
 *         -  鼠标hover时是否暂停轮播
 *         - false
 *         - true | false
 *
 *       * - paused
 *         - optional
 *         -   为true表示页面加载后不自动开始轮播
 *         - false
 *         - true | false
 *
 *       * - progressive
 *         - optional
 *         -  延迟加载的图片数据
 *         - undefined
 *         - 
 *
 *       * - random
 *         - optional
 *         -  随机播放
 *         - false
 *         - true | false
 *
 *       * - reverse
 *         - optional
 *         -  反序播放
 *         - false
 *         - true | false
 *
 *       * - slideActiveClass
 *         - optional
 *         -  当前显示的轮播图片(或div)的class
 *         - 'cycle-slide-active'
 *         - 
 *
 *       * - slideClass
 *         - optional
 *         -   添加给每个slide的固定class
 *         - 'cycle-slide'
 *         - 
 *
 *       * - slides
 *         - optional
 *         -  指定轮播的对象
 *         - '> img'
 *         - 
 *
 *       * - speed
 *         - optional
 *         -  图片切换的时间
 *         - 500
 *         - 
 *
 *       * - startingSlide
 *         - optional
 *         -   从第几个slide开始轮播
 *         - 0
 *         - 
 *
 *       * - swipe
 *         - optional
 *         -  ?
 *         - false
 *         - true | false
 *
 *       * - sync
 *         - optional
 *         -   下一张图片的显示和上一张图片的消失是否同时进行
 *         - true
 *         - true | false
 *
 *       * - timeout
 *         - optional
 *         -  轮播间隔时间。为0时默认不轮播
 *         - 4000
 *         - 
 *
 *       * - hideNonActive
 *         - optional
 *         -  hide掉非活动的slide
 *         - true
 *         - true | false
 *
 *       * - pause
 *         - optional
 *         -
 *         - undefined
 *         - 
 *
 *       * - resume
 *         - optional
 *         -
 *         - undefined
 *         - 
 *
 *       * - stop
 *         - optional
 *         -
 *         - undefined
 *         - 
 *
 *       * - carouselFluid
 *         - optional
 *         -  当为true且使用了carouselVisible时，将自动调整图片的尺寸适应div的宽度与高度
 *         - false
 *         - true | false
 *
 *       * - carouselOffset
 *         - optional
 *         -  图片偏移，比如你想让左右图片仅显示一半？设置偏移量为图片宽度的一半即可
 *         - 0
 *         - 
 *
 *       * - carouselSlideDimension
 *         - optional
 *         - 
 *         - undefined
 *         - 
 *
 *       * - carouselVertical
 *         - optional
 *         -
 *         - false
 *         - true | false
 *
 *       * - carouselVisible
 *         - optional
 *         -
 *         - undefined
 *         - 
 *
 *       * - throttleSpeed
 *         - optional
 *         -
 *         - undefined
 *         - 
 *
 *       * - tileCount
 *         - optional
 *         -
 *         - 7
 *         - 
 *
 *       * - tileDelay
 *         - optional
 *         -
 *         - 100
 *         - 
 *
 *       * - tileVertical
 *         - optional
 *         - 
 *         - true
 *         - true | false
 *
 * .. _cycle-example1:
 *
 * 默认淡入淡出
 * -------------
 *
 * .. zarkfx:: :demo:
 *
 *      <style type="text/css">
 *          div[fx], div[fx] img {
 *              width: 400px;
 *              height: 300px;
 *          }
 *          div[id^=pager] span{
 *              font-size: 40px;
 *          }
 *      </style>
 *
 *      <div fx="cycle">
 *          <img src="http://malsup.github.com/images/p1.jpg">
 *          <img src="http://malsup.github.com/images/p2.jpg">
 *          <img src="http://malsup.github.com/images/p3.jpg">
 *          <img src="http://malsup.github.com/images/p4.jpg">
 *      </div>
 *
 * 水平滚动
 * -------------
 *
 *  使用了pauseOnHover让鼠标放上去时暂停轮播
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="cycle[tr=scrollHorz; pauseOnHover; speed=200; ]" >
 *          <img src="http://malsup.github.com/images/p1.jpg">
 *          <img src="http://malsup.github.com/images/p2.jpg">
 *          <img src="http://malsup.github.com/images/p3.jpg">
 *          <img src="http://malsup.github.com/images/p4.jpg">
 *      </div>
 *
 * 使用控制按钮
 * -------------
 *
 *  用prev和next指定触发上一张和下一张图片的开关。并使用了timeout=0取消自动轮播。
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="cycle[tr=scrollHorz; timeout=500; prev=#p1; next=#n1; pause=#pause1; resume=#resume1;]" >
 *          <img src="http://malsup.github.com/images/p1.jpg">
 *          <img src="http://malsup.github.com/images/p2.jpg">
 *          <img src="http://malsup.github.com/images/p3.jpg">
 *          <img src="http://malsup.github.com/images/p4.jpg">
 *      </div>
 *      <div>
 *          <a href="javascript:;" id="p1">上一张</a> 
 *          <a href="javascript:;" id="n1">下一张</a>
 *          <a href="javascript:;" id="pause1">暂停</a>
 *          <a href="javascript:;" id="resume1">恢复</a>
 *      </div>
 *
 *
 * 显示图片信息
 * --------------------
 *
 * 使用caption指定在哪里显示，并使用captionTemplate设置显示文案。
 * 注意模版中引用了alt属性。
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="cycle[tr=scrollHorz; timeout=2000; caption=#cap1; captionTemplate=Slide {{slideNum}} of {{slideCount}}: {{alt}}]" >
 *          <img src="http://malsup.github.com/images/p1.jpg" alt="Spring">
 *          <img src="http://malsup.github.com/images/p2.jpg" alt="Redwoods">
 *          <img src="http://malsup.github.com/images/p3.jpg" alt="Angle Island">
 *          <img src="http://malsup.github.com/images/p4.jpg" alt="Raquette Lake">
 *      </div>
 *      <div id="cap1"></div>
 *
 * 一直滚
 * --------------------
 *
 * .. zarkfx:: :demo:
 *
 *
 *      <div fx="cycle[tr=scrollHorz; timeout=1; speed=3000; easing=linear; ]" >
 *          <img src="http://malsup.github.com/images/p1.jpg">
 *          <img src="http://malsup.github.com/images/p2.jpg">
 *          <img src="http://malsup.github.com/images/p3.jpg">
 *          <img src="http://malsup.github.com/images/p4.jpg">
 *      </div>
 *
 *
 * 给每张图片创建缩略图
 * -------------------------
 *
 *  因为pagerTemplate参数比较复杂，不容易写在fx属性中。
 *  所以此样例使用了options参数代替其它参数。
 *
 *
 * .. zarkfx:: :demo:
 *
 *      <script>
 *          var o1 = {
 *              tr: 'scrollHorz',
 *              pager: '#pager3',
 *              pagerTemplate: '<a href="javascript:;" style="padding-right: 20px;" ><img src="{{src}}" width="40px" height="40px"></a>'
 *          }
 *      </script>
 *
 *      <div fx="cycle[options=o1]">
 *          <img src="http://malsup.github.com/images/p1.jpg">
 *          <img src="http://malsup.github.com/images/p2.jpg">
 *          <img src="http://malsup.github.com/images/p3.jpg">
 *          <img src="http://malsup.github.com/images/p4.jpg">
 *      </div>
 *      <div id="pager3"></div>
 *
 * 同时显示多张图片
 * -------------------------
 * 
 *  用tr=carousel参数显示多张图片。
 *  用carouselVisible=5指定显示5张图片。
 *  用carouselOffset参数指定左右两张图片仅显示100px宽。
 *
 * .. zarkfx:: :demo:
 *
 *      <style type="text/css">
 *          #horizontal-carousel img{
 *              width: 200px;
 *              height: 150px;
 *          }
 *      </style>
 *
 *      <div id="horizontal-carousel" fx="cycle[tr=carousel; timeout=1000; easing=easeOutBounce; carouselVisible=5; carouselOffset=100; ]">
 *          <img src="http://malsup.github.com/images/p1.jpg">
 *          <img src="http://malsup.github.com/images/p2.jpg">
 *          <img src="http://malsup.github.com/images/p3.jpg">
 *          <img src="http://malsup.github.com/images/p4.jpg">
 *          <img src="http://malsup.github.com/images/beach1.jpg">
 *          <img src="http://malsup.github.com/images/beach2.jpg">
 *      </div>
 *
 * 垂直显示多张图片
 * -------------------------
 *
 *  用carouselVertical=true垂直显示
 *  
 * .. zarkfx:: :demo:
 *
 *      <style type="text/css">
 *          #vertical-carousel img{
 *              width: 100px;
 *              height: 75px;
 *          }
 *      </style>
 *
 *      <div id="vertical-carousel" fx="cycle[tr=carousel; timeout=1; speed=2000; carouselVisible=3; carouselVertical=true; easing=linear; ]">
 *          <img src="http://malsup.github.com/images/p1.jpg">
 *          <img src="http://malsup.github.com/images/p2.jpg">
 *          <img src="http://malsup.github.com/images/p3.jpg">
 *          <img src="http://malsup.github.com/images/p4.jpg">
 *          <img src="http://malsup.github.com/images/beach1.jpg">
 *          <img src="http://malsup.github.com/images/beach2.jpg">
 *      </div>
 *
 *
 * Shuffle 效果
 * -------------------------
 *
 *  使用fx=shuffle效果。注意这里使用了easeOut参数。
 *
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="cycle[tr=shuffle; timeout=2000; speed=1500; easing=easeOutBounce; easeOut=easeOutBack; ]">
 *          <img src="http://malsup.github.com/images/p1.jpg">
 *          <img src="http://malsup.github.com/images/p2.jpg">
 *          <img src="http://malsup.github.com/images/p3.jpg">
 *          <img src="http://malsup.github.com/images/p4.jpg">
 *      </div>
 * 
 * Shuffle 向右抽取
 * -------------------------
 *
 *  使用shuffleRight=0和shuffleTop=-75设置向右抽取
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="cycle[tr=shuffle; timeout=2000; speed=1000; shuffleRight=0; shuffleTop=-75; ]">
 *          <img src="http://malsup.github.com/images/p1.jpg">
 *          <img src="http://malsup.github.com/images/p2.jpg">
 *          <img src="http://malsup.github.com/images/p3.jpg">
 *          <img src="http://malsup.github.com/images/p4.jpg">
 *      </div>
 * 
 * Shuffle + Reverse
 * -------------------------
 *
 *  使用reverse=true，实现"把图片从后面拿到前面来"的效果
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="cycle[tr=shuffle; timeout=2000; speed=1000; reverse;  ]">
 *          <img src="http://malsup.github.com/images/p1.jpg">
 *          <img src="http://malsup.github.com/images/p2.jpg">
 *          <img src="http://malsup.github.com/images/p3.jpg">
 *          <img src="http://malsup.github.com/images/p4.jpg">
 *      </div>
 * 
 * Tile Slide 效果
 * -------------------------
 *
 *  使用fx=tileSlide
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="cycle[tr=tileSlide; timeout=2000; ]">
 *          <img src="http://malsup.github.com/images/p1.jpg">
 *          <img src="http://malsup.github.com/images/p2.jpg">
 *          <img src="http://malsup.github.com/images/p3.jpg">
 *          <img src="http://malsup.github.com/images/p4.jpg">
 *      </div>
 * 
 * Tile Blind 效果
 * -------------------------
 *
 *  使用fx=tileBlind
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="cycle[tr=tileBlind; timeout=2000; ]">
 *          <img src="http://malsup.github.com/images/p1.jpg">
 *          <img src="http://malsup.github.com/images/p2.jpg">
 *          <img src="http://malsup.github.com/images/p3.jpg">
 *          <img src="http://malsup.github.com/images/p4.jpg">
 *      </div>
 * 
 *
 * Tile Blind 水平翻转
 * -------------------------
 *
 * 使用tileVertical=false设置水平翻转。
 * 用tileCount指定翻转板数。
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="cycle[tr=tileBlind; timeout=2000; tileVertical=false; tileCount=15;]">
 *          <img src="http://malsup.github.com/images/p1.jpg">
 *          <img src="http://malsup.github.com/images/p2.jpg">
 *          <img src="http://malsup.github.com/images/p3.jpg">
 *          <img src="http://malsup.github.com/images/p4.jpg">
 *      </div>
 *
 * DOC_END
 */

FX.getFrame('jquery-1.7.2', function($) {

    FX.register('cycle', ['cycle2/cycle2'], {
        options: undefined,
        allowWrap: true,
        autoHeight: 0,
        caption: '> .cycle-caption',
        captionTemplate: '{{slideNum}} / {{slideCount}}',
        delay: 0,
        easing: null,
        easeOut: null,
        tr: 'fade',
        loader: false,
        log: false,
        loop: 0,
        manualSpeed: undefined,
        manualTrump: true,
        next: '> .cycle-next',
        prev: '> .cycle-prev',
        nextEvent: 'click.cycle',
        prevEvent: 'click.cycle',
        overlay: '> .cycle-overlay',
        overlayTemplate: '<div>{{title}}</div><div>{{desc}}</div>',
        pager: '> .cycle-pager',
        pagerEvent: 'click.cycle',
        pagerTemplate: '<span>&bull;</span>',
        pagerActiveClass: 'cycle-pager-active',
        pauseOnHover: false,
        paused: false,
        progressive: undefined,
        random: false,
        reverse: false,
        slideActiveClass: 'cycle-slide-active',
        slideClass: 'cycle-slide',
        slides: '> img',
        speed: 500,
        startingSlide: 0,
        swipe: false,
        sync: true,
        timeout: 4000,
        hideNonActive: true,
        pause: undefined,
        resume: undefined,
        stop: undefined,
        carouselFluid: false,
        carouselOffset: 0,
        carouselSlideDimension: undefined,
        carouselVertical: false,
        carouselVisible: undefined,
        throttleSpeed: undefined,
        tileCount: 7,
        tileDelay: 100,
        tileVertical: true

    }, function(attrs) {
        var $this = $(this);

        // 检查依赖js库
        var deps = [];
        if (attrs["easing"]){
            deps.push('easing');
        };
        if (attrs["tr"] === 'carousel'){
            deps.push('cycle2/carousel');

        }else if (attrs["tr"] === 'shuffle'){
            deps.push('cycle2/shuffle');

        }else if (attrs["tr"] === 'scrollVert'){
            deps.push('cycle2/scrollVert');

        }else if (attrs["tr"] === 'tileSlide' || attrs["tr"] === 'tileBlind'){
            deps.push('cycle2/tile');

        }else if (attrs["tr"] === 'fade' && $.browser.msie && $.browser.version < 8 ){
            deps.push('cycle2/iefade');
        };
        // 原cycle2.js使用的对应变量名为fx
        attrs["fx"] = attrs["tr"];


        FX.readyJs(deps, function(){
            if(!attrs["options"]) {
                $this.cycle(attrs);
            } else {
                eval("$this.cycle(" + attrs["options"] + ")");
            };
            // 绑定事件
            if (attrs.pause){
                $(attrs.pause).click(function(){
                    $this.cycle('pause');
                });
            }
            if (attrs.resume){
                $(attrs.resume).click(function(){
                    $this.cycle('resume');
                });
            }
            if (attrs.stop){
                $(attrs.stop).click(function(){
                    $this.cycle('stop');
                });
            }
        });

    });

});
