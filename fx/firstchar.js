/*
 * DOC_BEGIN
 *
 * First Char
 * ==========
 *
 * 你想让首字符显示与众不同？使用此fx将会把首字符放到一个span中，并给此span添加你指定的class，
 * 已达到特殊显示的效果。
 *
 * 另外，你还可以通过symbol、letter、chinese参数对标点符号、字母、中文分别设置是否使用此功能。
 *
 * Options
 * --------------
 *
 * :FX name: 
 * :Description: 
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
 *       * - class
 *         - option
 *         - 给第一个字符指定的class
 *         - -
 *         - string
 *
 *       * - tag
 *         - optional
 *         - 用于包裹第一个字符的标签
 *         - span
 *         - string
 *
 *       * - symbol
 *         - optional
 *         - 是否对Ascii除字母和数字以外的字符生效
 *         - false
 *         - true | false
 *
 *       * - digit
 *         - optional
 *         - 是否对数字生效
 *         - true
 *         - true | false
 *
 *       * - letter
 *         - optional
 *         - 是否对英文字母生效
 *         - true
 *         - true | false
 *
 *       * - chinese
 *         - optional
 *         - 是否对中文字符生效
 *         - true
 *         - true | false
 *
 * 让第一个字符突出显示
 * -------------------------
 *
 * .. zarkfx:: :demo:
 *
 *      <style type="text/css">
 *          .big{
 *            font-size: 24px;
 *          }
 *      </style>
 *
 *      <div fx="firstchar[class=big;]">
 *          从前有一座山。。。这个故事你已经听过了
 *      </div>
 *
 * DOC_END
 * */

;(function(){
FX.register('firstchar', [], {
    class   : '',
    tag     : 'span',
    symbol  : false,
    digit   : true,
    letter  : true,
    chinese : true

}, function(attrs){

    var $this = $(this);
    if (attrs.class){
        var content = $.trim($this.html()),
            use = true;

        var first_char = content[0];

        if ( /[\u4E00-\u9FA5]/.test(first_char) && attrs.chinese === false ) use = false;

        if ( /[\000-\177]/.test(first_char) ){
            if ( /[a-zA-Z]/.test(first_char)){
                if ( attrs.letter === false ) use = false;

            }else if ( /[0-9]/.test(first_char) ){
                if ( attrs.digit === false ) use = false;

            }else{
                if (attrs.symbol === false) use = false;
            };
        };

        if (use){
            $this.html('<' + attrs.tag + ' class="' + attrs.class + '">' + first_char + '</' + attrs.tag + '>' + content.substr(1));
        };

    };

});
})();
