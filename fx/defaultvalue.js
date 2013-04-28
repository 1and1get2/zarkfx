/*
 * DOC_BEGIN
 *
 * Default Value
 * =============
 *
 * 你想给radio input或select标签在前端设置一个默认值？使用传统办法你需要根据radio或select option的值去判断是否给他们一个checked属性。
 *
 * 使用defaultvalue fx可以让这件事情变得更简单。
 *
 * Options
 * --------------
 *
 * :FX name: defaultvalue
 * :Description: 让radio input或select标签默认选中某个值
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
 *       * - value
 *         - option
 *         - 选中的默认值，若忽略表示选中当前值，同组的radio标签只需给其中任意一个设置即可。
 *         - -
 *         - string
 *
 * 让radio默认选中某个值
 * -------------------------
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="radio" name="sex" value="他" fx="defaultvalue" />男
 *     <input type="radio" name="sex" value="她" />女
 *     <input type="radio" name="sex" value="保密" />保密
 *
 *
 * 让select默认选中某个值
 * -------------------------
 * 
 * defaultvalue需要使用在select标签上
 *
 * .. zarkfx:: :demo:
 *
 *     <select  fx="defaultvalue[value=她]" >
 *         <option value="他">男</option>
 *         <option value="她" >女</option>
 *         <option value="保密" >保密</option>
 *     </select>
 *
 * DOC_END
 *
 * */

;(function(){
FX.register('defaultvalue', [], {
    value: undefined

}, function(attrs){
    var $this = $(this),
        $form;

    if (this.form){
        $form = $(this.form);
    }else{
        $form = $('body');
    }

    if($(this)[0].tagName === 'INPUT' && $(this).attr('type')==='radio'){

        var default_value;

        if(attrs.value){
            default_value = attrs.value;
        }else{
            default_value = $this.val();
        };

        $('input[name=' + $this.attr('name') + '][type=radio]', $form).each(function(){
            if ($(this).val() === default_value){
                $(this).attr('checked', true);
            };
        });

    }else{
        if(attrs.value){
            $this.val(attrs.value)
        };
    };

});
})();
