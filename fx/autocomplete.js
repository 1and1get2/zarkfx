/*
 *
 * DOC_BEGIN
 *
 * Autocomplete
 * ===========
 *
 * 文本框的自动填充。此fx基于
 * `jQuery Autocomplete <http://jqueryui.com/autocomplete/>`_.
 *
 *
 * Usage
 * --------------
 *
 * :FX name: autocomplete
 * :Description: 文本框的自动填充
 * :Arguments:minLength（自动填充之前填入的最小字符数,增加字符数避免显示的返回数据过多）
 *
 * 直接输入备选项
 * -------------------------
 * fx="autocomplete[data=php,java,javascript,ruby,pyton]" 
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="autocomplete[data=php,java,javascript,ruby,pyton]" />
 *
 *
 * 填写URL通过Ajax方式调用服务器端数据；使用文件
 * -------------------------
 * fx="autocomplete[src=../../autocomplete/getdatas; minLength=2]" 
 *
 * 服务器端返回数据或者文件中每个备选项以逗号','隔开
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="autocomplete[src=../../autocomplete/getdatas; minLength=2]" />
 *
 * DOC_END
 *
 */

FX.getFrame('jquery-1.7.2', function($){

    var array_cache = {};

    FX.register('autocomplete', [ 'jqueryui-1.10.2' ], function(attrs){
    
        var $this = $(this);
        var array;

        if (attrs.src !== undefined){
            if (array_cache[attrs.src] === undefined){
                $.ajax({
                    async:      false,
                    cache:      true,
                    dataType:   'text',
                    type:       'GET',
                    url:        attrs.src,
                    success:    function(data){
                        array = data.split(',');
                    }
                });
                array_cache[attrs.src] = array;
            }else{
                array = array_cache[attrs.src];
            };
        }else if(attrs.data !== undefined){
            array = attrs.data.split(',');
        };

        $this.autocomplete({
            source:array,
            autoFocus: true,
            minLength: attrs.minLength
        });

    }, {
        style: 'smoothness',
        data:  undefined,
        src: undefined
    });

});
