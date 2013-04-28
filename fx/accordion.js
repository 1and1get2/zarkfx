/*
 *
 * DOC_BEGIN
 *
 * Accordion
 * =========
 *
 * 你想使用手风琴导航，但是jqueryui或其它accordion都不能满足你的需求？
 * 你弃他们绑定了样式？你想自己设计与你网页风格更搭的样式？
 * 你希望accordion能根据当前页面位置自动展开？
 *
 * 如果你与我们一样对上面的问题感到困惑，那么accordion就是专门为解决这些问题而设计的。
 * 此fx很好的阐释了zarkfx的“不强制绑定样式，但提供样式选择”的设计哲学。
 *
 * 你还可用autoExpande参数让accordion根据当前页面的地址与连接地址比较并自动展开当前选中的accordion选项。
 * accordion会自动考虑绝对路径、相对路径、完整路径多种情况。
 *
 * 此fx由Sparker5团队原创开发。注意，不完美兼容低级浏览器。
 *
 *
 * Options
 * --------------
 *
 * :FX name: accordion
 * :Description: 手风琴导航
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
 *       * - style
 *         - optional
 *         - 样式，目前提供了三种样式
 *         - default
 *         - none | default | tui | zarkpy
 *
 *       * - autoExpande
 *         - optional
 *         - 自动展开选中项的模式
 *         - prefix
 *         - off | prefix | equal | contain
 *
 *       * - title
 *         - optional
 *         - 导航元素，默认为h1-h6，你也可以改为其它元素，包括a元素
 *         - h1, h2, h3, h4, h5, h6
 *         - css 选择器
 *
 *       * - speed
 *         - optional
 *         - 展开与收起的速度，数值越小速度越快
 *         - 150
 *         - 正整数
 *
 *       * - on
 *         - optional
 *         - 触发展开与收起的事件
 *         - click
 *         - click | hover | dblclick
 *
 *       * - appendSpan
 *         - optional
 *         - 是否自动创建span标签以适应样式需要。使用某些style值时是必须要的
 *         - true
 *         - true | false
 *
 *
 *
 * 点击查看样例
 * ------------
 *
 * 因为当前页面的css会影响到accordion的样式，所以需要点击下面的按钮打开演示页面查看
 *
 * 新页面中的三个样例分别使用了 default tui zarkpy 样式
 *
 * .. zarkfx:: :demo:
 *
 *     <a href="/_static/demo/accordion/demo.html" target="_blank" >查看样例</a>
 *
 * DOC_END
 *
 */

;(function(){
var curr_href = window.location.href,
    curr_path = window.location.pathname,
    curr_host = window.location.host,
    curr_search = window.location.search,
    protocol  = window.location.protocol;

curr_href = encodeURI(curr_href);
curr_path = encodeURI(curr_path);
curr_search = encodeURI(curr_search);

var curr_relative = curr_path.substr(curr_path.lastIndexOf('/') + 1) +  curr_search;

var isSelected = function(autoExpande, this_url){
    var ret = false;
    this_url = encodeURI(this_url);

    if (autoExpande === 'equal'){
        ret = (curr_href === this_url) || (protocol + '//' + curr_host + this_url === curr_href) || (curr_relative === this_url)

    }else if (autoExpande === 'prefix'){
        ret = (curr_href.indexOf(this_url) === 0) || ((curr_path + curr_search).indexOf(this_url) === 0) || (curr_relative.indexOf(this_url) === 0)

    }else if (autoExpande === 'contain'){
        ret = curr_href.indexOf(this_url) !== -1

    }else if (autoExpande === 'off'){
        // pass
    };
    return ret;
};

FX.register('accordion', [], {
    style       : 'default',
    autoExpande : 'prefix', // off prefix contain equal
    title       : 'h1, h2, h3, h4, h5, h6',
    speed       : 150,
    on          : 'click',
    appendSpan  : true

}, function(attrs){
    var $this = $(this);
    $('div', $this).height(0);

    // 给每个title绑定click事件
    $('> ' + attrs.title, $this).each(function(){
        var $this = $(this);
        var next_div = $(this).next('div');
        var expande = function(){
            if (next_div.height() !== next_div.stop().height('100%').height()){
                height = next_div.height('100%').height();
                next_div.height(0).animate({
                    height: height
                }, attrs.speed, 'linear', function(){
                    $this.addClass('zarkfx_accordion_expanded').removeClass('zarkfx_accordion_folded');
                });
            };
        };
        var fold = function(){
            if (attrs.on !== 'hover' || next_div.find('.zarkfx_accordion_selected').length === 0){
                next_div.stop().animate({
                    height: 0
                }, attrs.speed, 'linear', function(){
                    $this.addClass('zarkfx_accordion_folded').removeClass('zarkfx_accordion_expanded');
                });
            };
        };
        if (attrs.on === 'hover'){
            $this.hover(expande, fold);
        }else{
            $this.bind(attrs.on, function(){
                if (next_div.height() === 0){
                    expande();
                }else{
                    fold();
                };
            });
        };
    });

    // 给各个元素添加默认class
    $('> ' + attrs.title, $this).hover(
        function(){
            if ($(this).next('div').height() === 0){
                $(this).addClass('zarkfx_accordion_folded_hover');
            }else{
                $(this).addClass('zarkfx_accordion_expanded_hover');
            };
        },
        function(){
            $(this).removeClass('zarkfx_accordion_folded_hover');
            $(this).removeClass('zarkfx_accordion_expanded_hover');
        }
    );
    $('> div > *', $this).hover(
        function(){
            $(this).addClass('zarkfx_accordion_hover');
        }, 
        function(){
            $(this).removeClass('zarkfx_accordion_hover');
        }
    );
    $('> div > *', $this).each(function(){
        $(this).addClass('zarkfx_accordion_a');
        //如果此项默认被选中（即为当前页面）
        var title = $(this).closest('div').prev();
        if ( isSelected(attrs.autoExpande, $(this).attr('href')) ){
            $(this).addClass('zarkfx_accordion_selected');
            $(this).closest(attrs.title).addClass('zarkfx_accordion_selected');
            $(this).closest('div').height('100%');
            if ( !title.hasClass('zarkfx_accordion_expanded') ){
                title.addClass('zarkfx_accordion_expanded');
            };
        }else{
            if ( !title.hasClass('zarkfx_accordion_folded') ){
                title.addClass('zarkfx_accordion_folded');
            };
        };
    });
    // 添加span元素
    $('> ' + attrs.title, $this).each(function(){
        if (attrs.appendSpan){
            $('<span class="zarkfx_accordion_tri"></span>').appendTo($(this));
        }
        $(this).addClass('zarkfx_accordion_bar');
    });
    $('> div > *', $this).each(function(){
        if (attrs.appendSpan){
            $('<span class="zarkfx_accordion_tri"></span>').appendTo($(this));
        }
    });

    $('> div', $this).each(function(){
        $(this).addClass('zarkfx_accordion_box');
    });

});
})();
