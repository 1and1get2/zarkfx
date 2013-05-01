/*
 * DOC_BEGIN
 *
 * URL Parameter
 * =============
 *
 * 你的某个页面中有许多a连接，它们会改变url中不同的参数。
 * 而你想改变某个a标签地址中的某个参数，但是希望其它参数与当前url中的一致？
 * 
 * 使用urlparameter可以轻松实现。
 * 此fx由Sparker5团队原创开发。
 *
 *
 * Options
 * --------------
 *
 * :FX name: urlparameter
 * :Description: 改变当前url中的某个参数值而保持其它不变
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
 *       * - key
 *         - required
 *         - 需要修改的参数名
 *         - undefined
 *         - 字符串
 *
 *       * - value
 *         - optional
 *         - 需要设置的参数值，需与key同时使用
 *         - undefined
 *         - 字符串
 *
 *       * - keepValue
 *         - optional
 *         - 当不使用value时，若为true表示保持key指定的参数等于当前url中的值，否则移除key指定的参数
 *         - false
 *         - true | false
 *
 *       * - selectedClass
 *         - optional
 *         - 当a标签的href与当前url相等时给a标签添加的class
 *         - zarkfx_urlparameter_selected
 *         - 字符串
 *
 *       * - quote
 *         - optional
 *         - 是否对url进行编码以符合url规范
 *         - true
 *         - true | false
 *
 *
 * 修改page_num参数，并保持其它参数不变
 * ---------------------------------------
 *
 * 点击前两个a连接，然后观察第三个a连接的url参数(同时也显示在input中)
 *
 * .. zarkfx:: :demo:
 *
 *  <a href="?page_num=1&other=some" >?page_num=1&other=some</a>
 *  <br/>
 *  <a href="?page_num=2&one=1&two=2" >?page_num=2&one=1&two=2</a>
 *  <br/>
 *  <p>以下连接使用了fx="urlparameter[key=page_num; value=10;]" </p>
 *  <a fx="urlparameter[key=page_num; value=10;]" >本连接的地址:</a>
 *  <input fx="urlparameter[key=page_num; value=10;]" style="width: 500px;" />
 *
 *
 * DOC_END
 * */



;(function(){
FX.register('urlparameter', [ 'url' ], {
    key             : undefined,
    value           : undefined,
    selectedClass   : 'zarkfx_urlparameter_selected',
    keepValue       : false,
    quote           : true

}, function(attrs){
    var $this = $(this),
        href;

    if ($this[0].tagName === 'A' && (typeof($this.attr('href')) !== 'undefined')){
        href = $this.attr('href');
    }else{
        href = window.location.href;
    };

    var url = $.url(href),
        new_href = undefined,
        current_url = $.url(window.location.href),
        current_href = window.location.pathname + window.location.search; // current_href不包含http://

    if (attrs.key && attrs.value){
        new_href = url.setparam(attrs.key, attrs.value);
    }else{
        if(attrs.keepValue){
            var current_value = current_url.param(attrs.key);
            if (current_value) {
                new_href = url.setparam(attrs.key, current_value);
            };
        }else if(attrs.key){
            new_href = url.removeparam(attrs.key);
        };
    }; 

    if (new_href && attrs.quote){
        new_href = encodeURI(new_href);
    };

    if (new_href){
        if (attrs.selectedClass && new_href === window.location.href){
            $this.addClass(attrs.selectedClass);
        };

        if ($this[0].tagName === 'A'){
            $this.attr('href', new_href);
        }else{
            $this.val(new_href);
        };
    };

});
})();

