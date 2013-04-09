/*
 *
 * DOC_BEGIN
 *
 * Autocomplete
 * ===========
 *
 * 文本框的自动填充。此fx基于
 * `jQuery Autocomplete <http://jqueryui.com/autocomplete/>`_,
 * 由
 * `ajie <http://github.com/zhaoxingjie>`_
 * 维护。
 *
 *
 * Usage
 * --------------
 *
 * :FX name: autocomplete
 * :Description: 文本框的自动填充
 *
 * .. topic:: Arguments
 *
 *    .. list-table::
 *       :widths: 1 1 5 1 1
 *       :header-rows: 1
 *
 *       * - Param
 *         - R/O
 *         - Description
 *         - Default
 *         - Values
 *
 *       * - minLength
 *         - optional
 *         - 自动填充之前填入文本框的最小字符数
 *         - 1
 *         - 整数
 *
 *
 * 直接输入备选项
 * -------------------------
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="autocomplete[data=php,java,javascript,ruby,pyton]" />
 *
 *
 * 填写URL通过Ajax方式调用服务器端数据 或者 直接使用文件
 * -------------------------
 *
 * 服务器端返回数据或者文件中的每个备选项以逗号','隔开
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="autocomplete[src=/_static/static/txt/autocomplete/languages; minLength=1]" />
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
