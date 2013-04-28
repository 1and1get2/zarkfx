/*
 * DOC_BEGIN
 *
 * Type Limit
 * =============
 *
 * 使用typelimit可以在浏览器端限制用户输入文本的长度。
 * 
 *
 * Options
 * --------------
 *
 * :FX name: typelimit
 * :Description: 限制用户输入的字符数
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
 *       * - limit
 *         - required
 *         - 最多可以输入多少个字符
 *         - -
 *         - -
 *
 *       * - tip
 *         - optional
 *         - 提示还能输入多少字符的标签
 *         - -
 *         - jquery selector
 *
 *       * - cnLength
 *         - optional
 *         - 一个中文字符的长度，若cnLength为2，limit为140则只能输入70个汉字
 *         - 1
 *         - jquery selector
 *
 *
 * 最多输入140个字
 * ---------------
 *
 * .. zarkfx:: :demo:
 *
 *      <div>你还可以输入<span id="tip">140</span>个字</div>
 *      <textarea fx="typelimit[limit=140;tip=#tip;]" ></textarea>
 *  
 *
 * DOC_END
 * */

;(function(){
var calcLength = function(string, cn_length){
    if (cn_length === 1){
        return string.length;
    }else{
        var length = 0;
        for (var i in string){
            if (/[\u4E00-\u9FA5]/.test(string[i])){
                length += cn_length;
            }else{
                length += 1;
            };
        };
        return length;
    };
};

FX.register('typelimit', [], {
    limit       : undefined,
    tip         : undefined,
    cnLength    : 1

}, function(attrs){

    var $this = $(this);

    var showLimit = function(){
    
        var val = $this.val(),
            val_length = calcLength(val, attrs.cnLength);

        if (attrs.limit && val_length > attrs.limit){
            $this.val($this.val().substr(0, parseInt(attrs.limit)));
        };

        if (attrs.limit && attrs.tip){
            var only = parseInt(attrs.limit) - val_length;
            if ($(attrs.tip)[0].tagName === 'INPUT' || $(attrs.tip)[0].tagName === 'TEXTAREA'){
                if ($(attrs.tip).val() != only){
                    $(attrs.tip).val(only);
                    $this.focus();
                };
            }else{
                if ($(attrs.tip).html() != only){
                    $(attrs.tip).html(only);
                    $this.focus();
                };
            };
        };

    };

    window.setInterval(showLimit, 100);

});
})();
