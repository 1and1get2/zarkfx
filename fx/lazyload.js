/*
 * DOC_BEGIN
 *
 * Lazy Load Image
 * ===============
 *
 * 你想让网页滚动到图片所在位置时再加载图片，从而节约带宽？
 * 给img标签使用lazyload fx即可。
 *
 * 本fx基于 `Lazy Load Plugin for jQuery <http://www.appelsiini.net/projects/lazyload>`_ 编写。
 * 
 *
 * Options
 * --------------
 *
 * :FX name: lazyload
 * :Description: 让图片延迟加载节约带宽
 * :文档: 待完成
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
 *       * - tr
 *         - optional
 *         - 图片显示效果
 *         - show
 *         - show | fade
 *
 *       * - speed
 *         - optional
 *         - 图片显示的速度，仅在tr不等于show时有效
 *         - 200
 *         - 正整数
 *
 *       * - greyImage
 *         - optional
 *         - 是否使用灰色占位图，若为true当img标签没有指定src属性时，自动使用灰色占位图改善体验效果
 *         - true
 *         - true | false
 *
 *       * - on
 *         - optional
 *         - 加载图片的事件，默认为scroll。当图片较多浏览器变卡时，可以设置为scrollstop指定滚动停止时再加载图片
 *         - scroll
 *         - scroll | scrollstop | sporty | foobar | click | mouseover | dblclick
 *
 *       * - threshold
 *         - optional
 *         - 提前加载敏感度，若设置为200表示滚动到距离图片还有200px时就开始加载
 *         - 0
 *         - 整数
 *
 *       * - failureLimit
 *         - optional
 *         - 搜索未显示图片的深度。默认情况下fx认为在html文档前面的图片也是在页面中优先显示的，因此fx从性能的角度考虑仅考虑显示html文档中最前面的还没有load的图片，但是在某些布局中此假设不成立。你可以把此值改大一些，让fx宽容一点
 *         - 0
 *         - 正整数
 *
 *       * - container
 *         - optional
 *         - 也可以实现滚动div时让图片延迟加载，只需指定container为被滚动的div即可
 *         - window
 *         - jquery selector
 *
 *       * - dataAttribute
 *         - optional
 *         - 真正的图片属性名，注意前面还有"data-"前缀
 *         - original
 *         - 字符串
 *
 *       * - skipInvisible
 *         - optional
 *         - 为true表示不显示被css隐藏掉(display:none)的图片
 *         - true
 *         - true | false
 *
 *       * - appear
 *         - optional
 *         - 开始加载图片时执行的事件
 *         - -
 *         - 字符串
 *
 *       * - load
 *         - optional
 *         - 图片加载完成后执行的事件
 *         - -
 *         - 字符串
 *
 * 延迟加载
 * -------------------------
 *
 *  往下滚，图片将被加载显示
 *
 * .. zarkfx:: :demo:
 *
 *     <div style="width: 100px; height: 500px;">我是占位的</div>
 *     <img fx="lazyload[tr=fade]" data-original="/_static/demo/lazyload/octopus.jpg" style="width: 1000px; height: 100px;" />
 *
 * DOC_END
 * */


;(function(){
FX.register('lazyload', [ 'lazyload' ], {
    threshold       : 0,
    failureLimit    : 0,
    on              : "scroll",
    container       : window,
    dataAttribute   : "original",
    skipInvisible   : true,
    appear          : null,
    load            : null,
    speed           : 200,
    tr              : 'show',
    greyImage       : true

}, function(attrs){

    var $this = $(this),
        deps = [];

    if (attrs.tr !== 'show'){
        //在lazyload中, effect=show和effectspeed不能同时使用
        attrs.effectspeed = attrs.speed;
    };

    if (attrs.tr === 'fade'){
        attrs.effect = 'fadeIn';
    }else{
        attrs.effect = attrs.tr; 
    };

    if (attrs.container !== window) {
        attrs.container = $(attrs.container);
    };

    if (attrs.on === 'scrollstop') {
        deps.push('scrollstop');
    };

    attrs.failure_limit = attrs.failureLimit;
    attrs.data_attribute = attrs.dataAttribute;
    attrs.skip_invisible = attrs.skipInvisible;
    attrs.event = attrs.on;

    delete attrs.tr;
    delete attrs.speed;
    delete attrs.failureLimit;
    delete attrs.dataAttribute;
    delete attrs.skipInvisible;

    if (attrs.greyImage && this.tagName === 'IMG' && !$this.attr('src')){
        $this.attr('src', FX.IMG_PATH + 'lazyload/grey.gif');
    };

    if (attrs.load) {
        var run = attrs.load + '.call($this[0])';
        attrs.load = function(){
            eval(run);
        };
    };

    if (attrs.appear) {
        var run = attrs.appear + '.call($this[0])';
        attrs.appear = function(){
            eval(run);
        };
    };

    FX.readyJs(deps, function(){
        $this.lazyload(attrs);
    });

});
})();
