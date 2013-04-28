/*
 * DOC_BEGIN
 *
 * Switch
 * ====================
 *
 * 你有一些Tab并想通过一组开关来控制它们，
 * 通过点击或鼠标移动到开关上面让其中一个Tab显示，并让其它Tab都隐藏起来？
 *
 * switch就是专门用来做这件事情的。使用switch你还可以给元素们分组，
 * 并在同一个页面中使用多个组。
 *
 * 本fx由Sparker5团队原创开发。
 * 提示: 如果IE6下出现页面跳动, 给同组被switch的元素们再包一个div,
 * 然后给这个div一个固定的高、宽即可
 *
 *
 * Options
 * --------------
 *
 * :FX name: switch
 * :Description: 在多个Div之间显示且仅显示一个
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
 *       * - target
 *         - require
 *         - 此switch对应显示的元素
 *         - -
 *         - css选择器
 *
 *       * - on
 *         - optional
 *         - 触发事件
 *         - click
 *         - click | mouseover | dblclick
 *
 *       * - group
 *         - optional
 *         - 分组，同一组中的元素仅显示一个
 *         - default_group
 *         - 字符串
 *
 *       * - tr
 *         - optional
 *         - 切换效果，默认无效果
 *         - -
 *         - fade
 *
 *       * - speed
 *         - optional
 *         - 仅在tr等于fade时有效，表示fade切换速度
 *         - normal
 *         - slow | normal | fast | 任意单位毫秒的正整数
 *
 *       * - selectedClass
 *         - optional
 *         - 被选中的开关元素的class，默认不使用
 *         - -
 *         - 字符串
 *
 *       * - autoHidden
 *         - optional
 *         - 是否在页面加载完成后自动隐藏每组第一个元素之外的其它元素
 *         - true
 *         - true | false
 *
 *       * - anchor
 *         - optional
 *         - 是否根据url最后的“!#id”中的id自动显示某个元素，这需要被显示元素的switch的target等于"#id"
 *         - true
 *         - true | false
 *
 * 通过点击开关在多个div中切换
 * -----------------------------------
 *
 * .. zarkfx:: :demo:
 *
 *     <a fx="switch[target=#div1]" >显示1</a>
 *     <a fx="switch[target=#div2]" >显示2</a>
 *     <a fx="switch[target=#div3]" >显示3</a>
 *
 *     <div id="div1">division one</div>
 *     <div id="div2">division two</div>
 *     <div id="div3">division three</div>
 *
 *
 * hover切换并使用fade效果
 * -----------------------------------
 *
 *  注意这里必须使用group参数，否则会与上面的switch混淆
 *
 * .. zarkfx:: :demo:
 *
 *     <a fx="switch[target=#div4;tr=fade;on=mouseover;group=2;]" >显示4</a>
 *     <a fx="switch[target=#div5;tr=fade;on=mouseover;group=2;]" >显示5</a>
 *     <a fx="switch[target=#div6;tr=fade;on=mouseover;group=2;]" >显示6</a>
 *
 *     <div id="div4">division four</div>
 *     <div id="div5">division five</div>
 *     <div id="div6">division six</div>
 *
 * DOC_END
 *
 * */

;(function(){
var switch_groups = {};

FX.register('switch', [], {
    target:         undefined,
    on:             'click',
    group:          'default_group',
    tr:             '',
    speed:          'normal',
    selectedClass:  '',
    autoHidden:     true,
    anchor:         true

}, function(attrs){
    var $this = $(this);
    var group = attrs.group;

    // 显示某组中的一个switch指定的元素
    var showSwitch = function(){
        // 先隐藏此组的所有元素
        for(var i in switch_groups[group]){
            var $a = switch_groups[group][i];
            var target = FX.parseFX($a.attr(FX.FX_NAME))['switch'][0].target;
            if (typeof(target) !== 'undefined'){
                $(target).hide();
            };
            if (attrs.selectedClass){
                $a.removeClass(attrs.selectedClass);
            };
        };
        // 显示当前switch指定的元素
        if (typeof(attrs.target) !== 'undefined'){
            if (attrs.tr === 'fade'){
                $(attrs.target).fadeIn(attrs.speed);
            }else{
                $(attrs.target).show();
            };
        };
        if (attrs.selectedClass){
            $this.addClass(attrs.selectedClass);
        };
        // 去掉a标签点击后的虚线
        if (attrs.blurA && $this.attr('nodeName') === 'A') {
            $this.blur();
        };
    };

    $this.bind(attrs.on, showSwitch);
    
    // 把当前switch加入组
    if(typeof(switch_groups[group]) === 'undefined'){
        switch_groups[group] = [];
    };
    switch_groups[group].push($this);

    // 判断当前switch是否默认显示
    var show_this = false;
    if (attrs.autoHidden && switch_groups[group].length == 1){
        show_this = true;
    };

    var href = window.location.href;
    if (attrs.anchor && href.indexOf('#!') !== -1){
        var show_id = href.substr(href.indexOf('#!') + 2);
        if ( show_id.length > 0 && attrs.target === '#' + show_id){
            show_this = true;
        };
    };

    if (show_this){
        showSwitch();
    }else if(attrs.autoHidden){
        if (typeof(attrs.target) !== 'undefined'){
            $(attrs.target).hide();
        };
    };

});
})();
