/*
 *
 * DOC_BEGIN
 *
 * Date picker
 * ===========
 *
 * 日期选择器，精确到天。此fx基于
 * `jQuery Datepicker <http://jqueryui.com/datepicker/>`_.
 *
 *
 * Usage
 * --------------
 *
 * :FX name: datepicker
 * :Description: 时间选择器
 *
 * .. topic:: Arguments
 *
 *    .. list-table::
 *       :widths: 1 1 1 1 5
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
 *         - 样式
 *         - smoothness
 *         - black-tie | blitzer | cupertino | dark-hive | dot-luv | eggplant | excite-bike | flick | hot-sneaks | humanity | le-frog | mint-choc | overcast | pepper-grinder | redmond | smoothness | south-street | start | sunny | swanky-purse | trontastic | ui-darkness | ui-lightness | vader
 *
 *       * - dateFormat
 *         - optional
 *         - 日期格式
 *         - yy-mm-dd
 *         - mm/dd/yy | yy-mm-dd | d M, y | d MM, y | DD, d MM, yy | 'day' d 'of' MM 'in the year' yy
 *
 *       * - showAnim
 *         - optional
 *         - 动画效果
 *         - -
 *         - show | slideDown | fadeIn | blind | bounce | clip | drop | fold | slide
 *
 *       * - numberOfMonths
 *         - optional
 *         - 弹窗显示月份数
 *         - -
 *         - 整数
 *
 *       * - changeYear
 *         - optional
 *         - 是否可选择年份
 *         - false
 *         - false | true
 *
 *       * - changeMonth
 *         - optional
 *         - 是否可选择月份
 *         - false
 *         - false | true
 *
 *       * - showButtonPanel
 *         - optional
 *         - 是否显示Today与确定按钮
 *         - false
 *         - false | true
 *
 *       * - yearRange
 *         - optional
 *         - 选择年限限制
 *         - -100:+1
 *         - 
 *
 *
 *       * - minDate
 *         - optional
 *         - 最早日期限制
 *         - -
 *         - 
 *
 *       * - maxDate
 *         - optional
 *         - 最晚日期限制
 *         - -
 *         - 
 *
 * 默认样式
 * --------
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="datepicker" />
 *
 * DOC_END
 *
 */

 /*
 *
 * 使用其它格式与动画效果
 * -------------------------
 * fx="datepicker" 
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="datepicker[dateFormat='day' d 'of' MM 'in the year' yy; showAnim=clip;]" />
 *
 *
 * 仅在两个星期内选择
 * -------------------------
 * fx="datepicker" 
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="datepicker[minDate=-1w; maxDate=+1w;]" />
 *
  * */

FX.getFrame('jquery-1.7.2', function($){

    FX.register('datepicker', [ 'jqueryui-1.10.2' ], {
        style: 'smoothness',
        dateFormat: 'yy-mm-dd',
        showAnim: '',
        showButtonPanel: false,
        changeMonth: false,
        changeYear: false,
        numberOfMonths: 1,
        yearRange: '-100:+1',
        minDate: '',
        maxDate: '',
        regional: ''

    }, function(attrs){
    
        var $this = $(this);
        attrs.defaultDate = $this.val();
        $this.datepicker(attrs);

        if (typeof(attrs.regional) !== 'undefined'){
            $this.datepicker( "option",
                $.datepicker.regional[ attrs.regional ] );
        };
    
    });

});
