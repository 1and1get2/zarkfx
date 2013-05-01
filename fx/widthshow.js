/*
 * DOC_BEGIN
 *
 * Width Show
 * =============
 *
 * 你想兼容不同屏幕尺寸的设备，你想根据浏览器的宽度来显示或隐藏某些元素？
 *
 * 使用widthshow可以根据当前浏览器的宽度显示或隐藏元素，以及给元素添加不同的class。
 *
 * 此fx由Sparker5团队原创开发。
 *
 *
 * Options
 * --------------
 *
 * :FX name: widthshow
 * :Description: 根据浏览器宽度隐藏或显示元素，并赋予不同的class
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
 *       * - rule
 *         - required
 *         - 显示或隐藏规则，多个规则用逗号分割。每个规则至少有两个值，并用空格分隔，第一个值表示宽度区间，第二个值为show或hide，其余值为class名。
 *         - -
 *         - 
 *
 *       * - switchClass
 *         - optional
 *         - 是否使用rule中的class，若为true，则原有class会被删除
 *         - false
 *         - true | false
 *
 * 800以下隐藏，800以上显示
 * -------------------------
 *
 * 拖动浏览器窗口改变宽度看看
 *
 * .. zarkfx:: :demo:
 *
 *   <p fx="widthshow[rule=-800 hide, 801- show]" class="red">当浏览器宽度小于800时我就消失</p>
 *
 * 小于800或大于1000时显示，800到1000之间隐藏
 * -----------------------------------------
 *
 * 小于800时同时赋予red big两个class，大于1000时赋予blue class
 *
 * .. zarkfx:: :demo:
 *
 *      <style type="text/css">
 *          .red {
 *              color: red;
 *          }
 *          .blue {
 *              color: blue;
 *          }
 *          .big {
 *              font-size: 24px;
 *          }
 *      </style>
 *
 *   <p fx="widthshow[switchClass;rule=-800 show red big, 801-1000 hide, 1001- show blue]">大于1000或小于800时我才显示</p>
 *
 * DOC_END
 * */


;(function(){

var changeStyle = function(obj, width, rules, attrs){
    var i, rule, region,
        curr_rule_index = $.data(obj, 'zarkfx_widthshow_currruleindex');

    for (i in rules){
        // 如果当前正在使用此规则，则跳过此规则，以免不停地刷新obj样式
        if (typeof curr_rule_index === 'undefined' || curr_rule_index !== i){
            rule = $.trim(rules[i]);
            region = rule.substr(0, rule.indexOf(' '));
            rule = $.trim(rule.substr(rule.indexOf(' ')));
            // 变化规则，rule为"{show|hide} class1 class2 ..."的形式
            var change = function(){
                if (rule.indexOf(' ') !== -1){
                    var display = rule.substr(0, rule.indexOf(' ')),
                        new_class = $.trim(rule.substr(rule.indexOf(' ')));
                }else{
                    var display = rule,
                        new_class = '';
                };
                if (display === 'show'){
                    $(obj).show();
                }else if (display === 'hide'){
                    $(obj).hide();
                };
                if (attrs.switchClass){
                    $(obj).attr('class', new_class);
                };
                $.data(obj, 'zarkfx_widthshow_currruleindex', i);
            };
            // 如果宽度区间为 -yy 形式，且当前width小于等于yy
            if (region.charAt(0) === '-' && width <= parseInt(region.substr(1))){
                change();
                break;
            // 如果宽度区间为 xx- 形式，且当前width大于等于xx
            }else if (region.charAt(region.length-1) === '-' && width >= parseInt(region.substr(0, region.length-1))){
                change();
                break;
            // 如果宽度区间为 xx-yy 形式，且当前width大于等于xx, 小于等于yy
            }else if (region.indexOf('-') !== -1){
                var xx = parseInt(region.substr(0, region.indexOf('-'))),
                    yy = parseInt(region.substr(region.indexOf('-')+1));
                if (width >= xx && width <=yy){
                    change();
                    break;
                };
            };
        };
    }; // end for
}; // end changeStyle

FX.register('widthshow', [], {
    rule        : undefined,
    switchClass : false

}, function(attrs){
    var $this = $(this);
    if (attrs.rule){
        var f = function(){
            changeStyle($this[0], document.body.clientWidth , attrs.rule.split(','), attrs);
        };
        f();
        $(window).resize(f);
    };

});
})();
