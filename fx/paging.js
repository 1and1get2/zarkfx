/*
 * DOC_BEGIN
 *
 * Paging
 * =============
 *
 * 分页是一种常见需求，但是显示分页器却是一项无聊又繁琐的事情。
 * 使用paging fx可以让编写前端分页代码变得简单。
 *
 * paging fx能根据url中的page_num参数来计算应该显示的页码，默认只有“第一页”、“最后一页”以及10来个数字页码。
 *
 * 如果你需要“上一页”与“下一页”按钮，那么需要自己创建a标签，然后使用prev和next参数指定a标签。
 * fx会自动修改a标签的href属性。
 *
 *
 * Options
 * --------------
 *
 * :FX name: paging
 * :Description: 分页器，所有参数均为可选的
 *
 * .. topic:: Arguments
 *
 *    .. list-table::
 *       :widths: 1 5 1 2
 *       :header-rows: 1
 *
 *       * - Param
 *         - Description
 *         - Default
 *         - Values
 *
 *       * - style
 *         - 分页器的样式，默认不使用任何样式
 *         - none
 *         - 
 *
 *       * - pageCount
 *         - 每页显示的项数(比如商品数)
 *         - 10
 *         - 正整数
 *
 *       * - totalCount
 *         - 一共有多少项，fx使用totalCount和pageCount计算最后一页的页码数
 *         - 100
 *         - 正整数
 *
 *       * - displayPages
 *         - 最多显示多少个页码
 *         - 10
 *         - 正整数
 *
 *       * - currPage
 *         - 当前为第几页，若不指定则等于url中pageNumPara参数值，或等于firstPage
 *         - -
 *         - 正整数
 *
 *       * - pageNumPara
 *         - url中表示页码的参数名，此值主要用于你的后台程序
 *         - page_num
 *         - 字符串
 *
 *       * - firstText
 *         - 第一页按钮的文字
 *         - first
 *         - 字符串
 *
 *       * - lastText
 *         - 最后一页按钮的文字
 *         - 'last'
 *         - 字符串
 *
 *       * - currPageClass
 *         - 当前页码的class
 *         - zarkfx_paging_selected
 *         - 字符串
 *
 *       * - firstPage
 *         - 从1还是0开始计算第一页?
 *         - 1
 *         - 0 | 1
 *
 *       * - plusToSpace
 *         - 是否把href中的“+”符号改为空格
 *         - true
 *         - true | false
 *
 *       * - showFirst
 *         - 是否显示第一页按钮
 *         - true
 *         - true | false
 *
 *       * - showLast
 *         - 是否显示最后一页按钮
 *         - true
 *         - true | false
 *
 *       * - prev
 *         - 上一页按钮，prev应该是一个a标签
 *         - undefined
 *         - jquery selector
 *
 *       * - next
 *         - 下一页按钮，next应该是一个a标签
 *         - undefined
 *         - jquery selector
 *
 *       * - autoHidePrev
 *         - 当没有上一页时，是否隐藏prev指定的元素
 *         - true
 *         - true | false
 *
 *       * - autoHideNext
 *         - 当没有下一页时，是否隐藏next指定的元素
 *         - true
 *         - true | false
 *
 *
 * 不使用样式
 * -------------------------
 *
 * 注意，页码被作为page_num参数添加在url query参数中。
 *
 * .. zarkfx:: :demo:
 *
 *      <style type="text/css">
 *          .zarkfx_paging_selected{
 *              font-size: large;
 *          }
 *      </style>
 *
 *      <div fx="paging[totalCount=300; pageCount=20; displayPages=8; currPage=9; ]" ></div>
 *
 * 自定义下一页按钮
 * -------------------------
 *
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="paging[next=#next1]" ></div>
 *      <a id="next1" >下一页</a>
 *
 * DOC_END
 * */


;(function(){
FX.register('paging', [ 'url' ], {
    style           :  'none',
    pageCount       :  10,
    totalCount      :  100,
    displayPages    :  10,
    currPage        :  undefined,
    pageNumPara     :  'page_num',
    firstText       :  'first',
    lastText        :  'last',
    currPageClass   :  'zarkfx_paging_selected',
    firstPage       :  1,
    plusToSpace     :  true,
    showFirst       :  true,
    showLast        :  true,
    prev            :  undefined,
    next            :  undefined,
    autoHidePrev    :  true,
    autoHideNext    :  true

}, function(attrs){
    var $this = $(this);
    var curr_url = $.url(window.location.href);
    var curr_page;

    if (!attrs.currPage){
        curr_page = curr_url.param(attrs.pageNumPara);
        if (!curr_page) curr_page = attrs.firstPage;
    }else{
        curr_page = attrs.currPage;
    };
    curr_page = parseInt(curr_page);

    var max_page_num = Math.ceil(attrs.totalCount / attrs.pageCount);
    var paging_html = '<ul>';
    var start = Math.max(0, curr_page - Math.ceil(attrs.displayPages / 2));
    var end   = start + attrs.displayPages;

    if(end > max_page_num){
        end = max_page_num;
        start = Math.max(0, max_page_num - attrs.displayPages);
    };

    if (attrs.showFirst){
        if (curr_page !== attrs.firstPage){
            paging_html += '<li data-page-num="' + attrs.firstPage + '">' + attrs.firstText + '</li>';
        }else{
            paging_html += '<li >' + attrs.firstText + '</li>';
        };
    };

    for(var i = start; i < end; i++){
        var num = i + attrs.firstPage;
        if ( num === curr_page ){
            paging_html += '<li class="' + attrs.currPageClass + '">' + (i+1) + '</li>';
        }else{
            paging_html += '<li data-page-num="' + num + '" >' + (i+1) + '</li>';
        };
    };

    if ( attrs.showLast ){
        if ( curr_page !== max_page_num ){
            paging_html += '<li data-page-num="' + max_page_num + '">' + attrs.lastText + '</li>';
        }else{
            paging_html += '<li>' + attrs.lastText + '</li>';
        };
    };

    paging_html += '</ul>'
    $this.append(paging_html);

    var getNewUrl = function(curr_url, page_num){
        var new_href = curr_url.setparam(attrs.pageNumPara, page_num);
        if ( attrs.plusToSpace ){
            new_href = new_href.replace(/\+/g, ' ').replace(/\%2B/g, ' ');
        };
        return new_href;
    };

    $('li', $this).each(function(){
        var li_page_num = $(this).attr('data-page-num');
        if (li_page_num && (curr_page.toString() !== li_page_num)){
            var new_href = getNewUrl(curr_url, li_page_num);
            $(this).html('<a href="' + new_href + '">' + $(this).html() + '</a>');
        }else{
            $(this).html('<a href="#">' + $(this).html() + '</a>');
        };
    });

    if (attrs.prev){
        if (curr_page - 1 >= attrs.firstPage){
            $(attrs.prev).attr('href', getNewUrl(curr_url, curr_page - 1));
        }else if (attrs.autoHidePrev){
            $(attrs.prev).hide();
        };
    };

    if (attrs.next){
        if (curr_page + 1 <= max_page_num){
            $(attrs.next).attr('href', getNewUrl(curr_url, curr_page + 1));
        }else if (attrs.autoHideNext){
            $(attrs.next).hide();
        };
    };

});
})();
