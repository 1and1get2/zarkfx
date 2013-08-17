/*
 *
 * Date Time Picker
 * =================
 *
 * 此fx基于`jQuery TimePicker Addon<http://trentrichardson.com/examples/timepicker/>`_编写，文档待完善。
 *
 * Options
 * --------------
 *
 * :FX name: datetimepicker
 * :Description: 时间选择器，精确到毫秒
 *
 * 默认样式
 * --------
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="datetimepicker" />
 *
 * */


;(function(){
FX.register('datetimepicker', [ 'jqueryui-1.10.2', 'datetimepicker/timepicker' ], {
    style: 'smoothness',
    dateFormat: 'yy-mm-dd',
    timeFormat: "hh:mm tt",
    showAnim: '',
    showButtonPanel: false,
    changeMonth: false,
    changeYear: false,
    numberOfMonths: 1,
    yearRange: '-100:+1',
    minDate: undefined,
    maxDate: undefined,
    regional: undefined

}, function(attrs){

    FX.loadCSS(FX.CSS_PATH + 'jqueryui-addon/jquery-ui-timepicker-addon.css');

    var $this = $(this);
    attrs.defaultDate = $this.val();
    $this.datetimepicker(attrs)

    if (typeof(attrs.regional) !== 'undefined'){
        $this.datetimepicker( "option",
            $.datetimepicker.regional[ attrs.regional ] );
    };

});
})();
