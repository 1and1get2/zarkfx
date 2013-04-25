/*
 *
 * DOC_BEGIN
 *
 * Autocomplete
 * ==============================
 *
 * 文本框的自动填充。此fx基于
 * `jQuery Autocomplete <http://jqueryui.com/autocomplete/>`_,
 * 由
 * `ajie <http://github.com/zhaoxingjie>`_
 * 维护。
 *
 *
 * Options
 * --------------
 *
 * :FX name: autocomplete
 * :Description: 文本框的自动填充
 *
 * .. topic:: Arguments
 *
 *    .. list-table::
 *       :widths: 1 1 3 1 5
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
 * ---------------------------------------------------------
 *
 * 服务器端返回数据或者文件中的每个备选项独占一行，
 * 测试文件地址：
 * `languages.txt </_static/static/txt/autocomplete/languages.txt>`_
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="autocomplete[src=/_static/static/txt/autocomplete/languages.txt; minLength=1]" />
 *
 * DOC_END
 *
 */

FX.getFrame('jquery-1.7.2', function($){

    var array_cache = {};

    FX.register('autocomplete', [ 'jqueryui-1.10.2' ], {
        style: 'smoothness',
        data:  undefined,
        src: undefined

    }, function(attrs){
    
        var $this = $(this),
            data_array=[];

        if (attrs.src !== undefined){
            $.ajax({
                async:      false,
                cache:      true,
                dataType:   'text',
                type:       'GET',
                url:        attrs.src,
                success:    function(data){
                    data_array = data.split('\n');
                }
            });
        }else if(attrs.data !== undefined){
            data_array = attrs.data.split(',');
        };

        $this.autocomplete({
            source:data_array,
            autoFocus: true,
            minLength: attrs.minLength
        });

    });

});
