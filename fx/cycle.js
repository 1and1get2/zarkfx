/*
 * DOC_BEGIN
 *
 * Cycle
 * ======
 *
 * 此fx由Sparker5团队基于
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
 * 见: :ref:`cycle-example6`
 * 
 *
 * Options
 * --------------
 *
 * :FX name: cycle
 * :Description: 多张图片或多个div轮播
 * :slide: 以下说明中,slide表示被轮播的图片或者div。
 * :模版字符串: cycle中有许多参数的类型是"模版字符串"，表示在显示时字符串中用"{{}}"包裹的参数会被替换为具体的值。比如默认的captionTemplate='{{slideNum}} / {{slideCount}}'显示了当前第几个slide，以及一共有多少个slide。模版中可以使用的参数有：currSlide nextSlide slideNum slideCount busy paused 以及slide的其它属性，比如alt title等。
 * :其它: 以下所有参数都是可选的。
 *
 * .. topic:: Common Options
 *
 *    .. list-table::
 *       :widths: 1 3 2 2
 *       :header-rows: 1
 *
 *       * - Param
 *         - Description
 *         - Default
 *         - Values
 *
 *       * - allowWrap
 *         - 是否允许展示到最后一张图片时自动跳转到第一张。仅在timeout=0时起作用。
 *         - true
 *         - true | false
 *
 *       * - autoHeight
 *         - 
 *         - 0
 *         - 
 *
 *       * - caption
 *         - 显示图片描述的元素，与caption-template参数一起使用。
 *         - > .cycle-caption
 *         - jquery selector
 *
 *       * - captionTemplate
 *         - 图片的描述文案模版。见: :ref:`cycle-example4`
 *         - {{slideNum}} / {{slideCount}}
 *         - 字符串模版
 *
 *       * - delay
 *         - 网页打开后第一张图片开始轮播前的延迟时间，单位毫秒
 *         - 0
 *         - 正整数
 *
 *       * - easing
 *         - 动画时间函数。见 `easing <http://jqueryui.com/resources/demos/effect/easing.html>`_ 
 *         - null
 *         - easing函数名
 *
 *       * - easeOut
 *         - 配合easing使用
 *         - null
 *         - easing函数名
 *
 *       * - tr
 *         - 动画效果。常用的有fade和scrollHorz
 *         - fade
 *         - none | fade | fadeout | scrollHorz | scrollVert | carousel | shuffle | tileSlide | tileBlind
 *
 *       * - loader
 *         - false表示按照img元素的默认顺序轮播，为true则不遵守默认顺序优先展示已加载的图片，为wait表示等待所有图片加载完毕才开始轮播
 *         - false
 *         - true | false | wait
 *
 *       * - log
 *         - 是否在console中打印log
 *         - false
 *         - true | false
 *
 *       * - loop
 *         - 循环播放次数，0表示无限次
 *         - 0
 *         - 正整数
 *
 *       * - manualSpeed
 *         - 由人点击触发切换slide时的切换速度
 *         - undefined
 *         - 正整数
 *
 *       * - manualTrump
 *         - 由人点击按钮时是否可以中断默认的切换动画
 *         - true
 *         - true | false
 *
 *       * - next
 *         - 切换下一张图片的触发器
 *         - > .cycle-next
 *         - jquery selector
 *
 *       * - prev
 *         - 切换上一张图片的触发器
 *         - > .cycle-prev
 *         - jquery selector
 *
 *       * - nextEvent
 *         - 触发下一张图片的事件
 *         - click
 *         - click | hover | mouserover | dblclick
 *
 *       * - prevEvent
 *         - 触发上一张图片的事件
 *         - click
 *         - click | hover | mouserover | dblclick
 *
 *       * - overlay
 *         - 指定覆盖在图片上面的描述层
 *         - > .cycle-overlay
 *         - jquery selector
 *
 *       * - overlayTemplate
 *         - 描述层的显示模版。类似captionTemplate
 *         - <div>{{title}}</div><div>{{desc}}</div>
 *         - 字符串模版
 *
 *       * - pager
 *         - 包含图片缩略图的div。会自动使用pagerTemplate创建小按钮，见: :ref:`cycle-example6`
 *         - > .cycle-pager
 *         - jquery selector
 *
 *       * - pagerEvent
 *         - 触发pager按钮的事件
 *         - click
 *         - click | hover | mouserover | dblclick
 *
 *       * - pagerTemplate
 *         - pager按钮的模版
 *         - <span>&bull;</span>
 *         - 字符串模版
 *
 *       * - pagerActiveClass
 *         - 当前选中pager按钮添加的class。你想让当前slide的缩略图有突出的样式?
 *         - cycle-pager-active
 *         - class string
 *
 *       * - pauseOnHover
 *         - 鼠标hover时是否暂停轮播
 *         - false
 *         - true | false
 *
 *       * - paused
 *         - 为true表示页面加载后不自动开始轮播
 *         - false
 *         - true | false
 *
 *       * - progressive
 *         - 延迟加载的图片数据。见: :ref:`cycle-example15`
 *         - undefined
 *         - jquery selector
 *
 *       * - random
 *         - 是否随机播放
 *         - false
 *         - true | false
 *
 *       * - reverse
 *         - 是否反序播放
 *         - false
 *         - true | false
 *
 *       * - slideActiveClass
 *         - 当前显示的slide的class
 *         - cycle-slide-active
 *         - class string
 *
 *       * - slideClass
 *         - 添加给每个slide的固定class
 *         - cycle-slide
 *         - class string
 *
 *       * - slides
 *         - 指定轮播的对象。如果slide是div而不是img的话，可以改为"> div"
 *         - '> img'
 *         - jquery selector
 *
 *       * - speed
 *         - 图片切换的时间。到位毫秒，数值越少速度越快
 *         - 500
 *         - 正整数
 *
 *       * - startingSlide
 *         - 从第几个slide开始轮播
 *         - 0
 *         - 正整数
 *
 *       * - swipe
 *         - 是否在触摸设备上支持手指滑动
 *         - false
 *         - true | false
 *
 *       * - sync
 *         - 下一张图片的显示和上一张图片的消失是否同时进行
 *         - true
 *         - true | false
 *
 *       * - timeout
 *         - 轮播间隔时间，为0时默认不轮播
 *         - 4000
 *         - 正整数
 *
 *       * - hideNonActive
 *         - 隐藏非活动的slide
 *         - true
 *         - true | false
 *
 *       * - pause
 *         - 暂停轮播的按钮。见 :ref:`cycle-example3`
 *         - undefined
 *         - jquery selector
 *
 *       * - resume
 *         - 恢复暂停的按钮
 *         - undefined
 *         - jquery selector
 *
 *       * - stop
 *         - 停止轮播的按钮
 *         - undefined
 *         - jquery selector
 *
 * .. topic:: Carousel Options
 *
 *    .. list-table::
 *       :widths: 1 4 1 2
 *       :header-rows: 1
 *
 *       * - Param
 *         - Description
 *         - Default
 *         - Values
 *
 *       * - carouselFluid
 *         - 当为true且使用了carouselVisible时，将自动调整图片的尺寸适应div的宽度与高度
 *         - false
 *         - true | false
 *
 *       * - carouselOffset
 *         - 图片偏移，比如你想让左右图片仅显示一半？设置偏移量为图片宽度的一半即可，见 :ref:`cycle-example7`
 *         - 0
 *         - 正整数
 *
 *       * - carouselSlideDimension
 *         - 整个轮播容器的宽(水平轮播)或高(垂直轮播)，如果未设置这个选项，默认根据第一张图片的尺寸来设置
 *         - -
 *         - 
 *
 *       * - carouselVertical
 *         - 是否垂直滚动
 *         - false
 *         - true | false
 *
 *       * - carouselVisible
 *         - 显示的图片数量。默认根据图片尺寸自动计算
 *         - -
 *         - 正整数
 *
 *       * - throttleSpeed
 *         - 设置为true时，速度被调控以实现一致的滚动率。这仅在图片的宽度不同、但希望它们以完全相同的速率滚动时有用
 *         - -
 *         - true
 *
 *
 *  :tip: 以上参数仅在fx=carousel时有效
 *
 * .. topic:: Shuffle Options
 *
 *    .. list-table::
 *       :widths: 1 4 1 2
 *       :header-rows: 1
 *
 *       * - Param
 *         - Description
 *         - Default
 *         - Values
 *
 *       * - shuffleLeft
 *         - 图片挪动时偏离容器的左边缘的像素，默认为0像素，即被挪动图片的右边缘跟容器的左边缘重合。与shuffleRight互斥
 *         - 0
 *         - 整数
 *
 *       * - shuffleRight
 *         - 图片挪动时偏离容器的右边缘的像素，默认为0像素，即被挪动图片的左边缘跟容器的右边缘重合。与shuffleLeft互斥
 *         - 0
 *         - 整数
 *
 *       * - shuffleTop
 *         - 图片挪动时在垂直方向的位移像素，正数为垂直向下，负数向上
 *         - 15
 *         - 整数
 *
 *  :tip: 以上参数仅在fx=shuffle时有效
 *
 * .. topic:: Tile Options
 *
 *    .. list-table::
 *       :widths: 1 4 1 2
 *       :header-rows: 1
 *
 *       * - Param
 *         - Description
 *         - Default
 *         - Values
 *
 *       * - tileCount
 *         - 翻转图片时分割块数
 *         - 7
 *         - 正整数
 *
 *       * - tileDelay
 *         - 每个单独的瓷瓦效果在过渡时的持续时间，单位毫秒
 *         - 100
 *         - 正整数
 *
 *       * - tileVertical
 *         - 是否垂直翻转
 *         - true
 *         - true | false
 *
 *  :tip: 以上参数仅在fx=tileSlide或fx=tileBlind时有效
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
 * .. _cycle-example2:
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
 * .. _cycle-example3:
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
 * .. _cycle-example4:
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
 * .. _cycle-example5:
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
 * .. _cycle-example6:
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
 * .. _cycle-example7:
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
 * .. _cycle-example8:
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
 * .. _cycle-example9:
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
 * .. _cycle-example10:
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
 * .. _cycle-example11:
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
 * .. _cycle-example12:
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
 * .. _cycle-example13:
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
 * .. _cycle-example14:
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
 * .. _cycle-example15:
 *
 * 按需加载，节约带宽
 * -------------------------
 *
 * 使用progressive参数指定图片数据，cycle会按需加载图片，节约带宽。
 *
 * .. zarkfx:: :demo:
 *
 *   <script id="more_images" type="text/cycle">
 *   [
 *       "<img src='http://malsup.github.com/images/beach2.jpg'>",
 *       "<img src='http://malsup.github.com/images/beach3.jpg'>",
 *       "<img src='http://malsup.github.com/images/beach4.jpg'>",
 *       "<img src='http://malsup.github.com/images/beach5.jpg'>",
 *       "<img src='http://malsup.github.com/images/beach6.jpg'>",
 *       "<img src='http://malsup.github.com/images/beach7.jpg'>",
 *       "<img src='http://malsup.github.com/images/beach8.jpg'>",
 *       "<img src='http://malsup.github.com/images/beach9.jpg'>"
 *   ]
 *   </script>
 *
 *      <div fx="cycle[tr=scrollHorz; timeout=0; next=#n3; progressive=#more_images; ]">
 *          <img src="http://malsup.github.com/images/beach1.jpg">
 *      </div>
 *      <a href="javascript:void(0);" id="n3" >next</a>
 *
 * DOC_END
 */


;(function(){
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
    tileVertical: true,
    captionPlugin: undefined,
    youtube: false,
    centerHorz: false,
    centerVert: false

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

    if (attrs["swipe"]){
        deps.push('cycle2/swipe');
    };

    if (attrs.captionPlugin === 'caption2'){
        deps.push('cycle2/caption2');
    };

    if (attrs.youtube){
        deps.push('cycle2/video');
    };

    if (attrs.centerHorz || attrs.centerVert){
        deps.push('cycle2/center');
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
})();
