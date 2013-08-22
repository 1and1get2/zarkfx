/*
 * DOC_BEGIN
 *
 * Share
 * =====
 *
 * 分享文字或图片到第三方网站, 支持: 新浪微博,腾讯微博,QQ空间,人人网,豆瓣
 *
 * Options
 * --------------
 *
 * :FX name: share
 * :Description: 简单实现分享网站的内容到第三方社交网站,可同时用于电脑版和手机版,用于手机时请给触发的a连接添加target="_blank"属性.
 *
 * .. topic:: Arguments
 *
 *    .. list-table::
 *       :widths: 1 1 3 1 3
 *       :header-rows: 1
 *
 *       * - Param
 *         - R/O
 *         - Description
 *         - Default
 *         - Values
 *
 *       * - site
 *         - required
 *         - 分享的目标网站
 *         - undefined
 *         - sinaweibo | tencentweibo | renren | qzone | douban
 *
 *       * - contentSelector
 *         - optional
 *         - 分享的内容选择器
 *         - 
 *         - css选择器
 *
 *       * - titleSelector
 *         - optional
 *         - 分享的标题选择器
 *         - 
 *         - css选择器
 *
 *       * - linkSelector
 *         - optional
 *         - 分享的网址选择器, 若不填写则使用当前网址
 *         - 
 *         - css选择器
 *
 *       * - picSelector
 *         - optional
 *         - 分享的图片选择器, 若不填写则第三方网站会抓取图片让用户选择
 *         - 
 *         - css选择器
 *
 *       * - contentLimit
 *         - optional
 *         - 最多分享到第三方网站的文字数量
 *         - 100
 *         - 正整数
 *
 *       * - eventType
 *         - optional
 *         - 触发分享行为的事件
 *         - click
 *         - click | mouseover | 等其它jquery有效事件
 *
 *       * - appKey
 *         - optional
 *         - 第三方网站的app key, 可选
 *         - 
 *         - 字符串
 *
 *       * - relateUid
 *         - optional
 *         - 
 *         - 仅用于新浪微博
 *         - 
 *
 *       * - assName
 *         - optional
 *         - 
 *         - 仅用于腾讯微博
 *         - 
 *
 *
 * 分享到新浪微博和腾讯微博
 * -------------------------
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="hidden" id="content" value="这个zarkfx网站不错, 一个非常特别的前端js库" />
 *     <a fx="share[site=sinaweibo; contentSelector=#content;]" >分享到新浪微博</a>
 *     <a fx="share[site=tencentweibo; contentSelector=#content;]" >分享到腾讯微博</a>
 *
 *
 * DOC_END
 *
 * */


;(function(){
function toHTTP(url){
    if (url.indexOf('/') === 0){
        url = window.location.protocol + '//' + window.location.hostname + url;
    }else if (url.indexOf('http://') !== 0){
        url = window.location.href.substr(0, window.location.href.lastIndexOf('/')+1) + url;
    }
    return url;
};

function joinQuerys(url, param){
    var temp = [];
    for( var p in param ){
        temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
    }
    return url = url + "?" + temp.join('&');
};

function shareToRenRen(link, title, content, pic, attrs){
    var param = {
        resourceUrl : link,
        pic : pic,
        title : title,
        description : content
    };
    var url = joinQuerys("http://widget.renren.com/dialog/share", param),
        wa = 'width=700,height=650,left=0,top=0,resizable=yes,scrollbars=1';
    window.open(url, 'fwd', wa);
};

function shareToTencentWeibo(link, title, content, pic, attrs){
    var _assname = encodeURI(attrs.assName),
        _appkey = encodeURI(attrs.appKey),
        _pic = encodeURI(pic);

    var url = 'http://share.v.t.qq.com/index.php?c=share&a=index&title='+encodeURIComponent(title+'\n'+content)+'&url='+link+'&appkey='+_appkey+'&pic='+_pic+'&assname='+_assname;

    window.open( url,'分享到腾讯微博', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );

};

function shareToSinaWeibo(link, title, content, pic, attrs){
    var param = {
        url:location.href,
        type:'3',
        count:'1', /**是否显示分享数，1显示(可选)*/
        appkey: attrs.appKey,
        title:  title + '\n' + content,
        pic: pic,
        ralateUid: attrs.relateUid, /**关联用户的UID，分享微博会@该用户(可选)*/
        rnd: new Date().valueOf()
    }

    var url = joinQuerys("http://v.t.sina.com.cn/share/share.php", param);
    window.open(url);
};

function shareToDouban(link, title, content, pic, attrs){
    var e = encodeURIComponent,
        s1 = window.getSelection,
        s2 = document.getSelection,
        s3 = document.selection,
        s = s1?s1():s2?s2():s3?s3.createRange().text:'',
        r = 'http://www.douban.com/recommend/?url='+e(link)+'&title='+e(title+'\n'+content)+'&sel='+e(s)+'&v=0';

    var x = function(){
        if(!window.open(r,'douban','toolbar = 0,resizable=1,scrollbars=yes,status=1,width=450,height=330')){
            location.href = r+'&r=1'
        }
    };

    if(/Firefox/.test(navigator.userAgent)){
        setTimeout(x,0)
    }else{
        x()
    }
};

function shareToQZone(link, title, content, pic, attrs){
    var param = {
        url: window.location.href,
        showcount: '1',
        desc: '',
        summary:content,
        title: title,
        site: attrs.siteName,
        pics:pic,
        style:'203',
        width:98,
        height:22
    };

    var url = joinQuerys("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",param);
    window.open(url);

}

FX.register('share', [], {
    site:      undefined,
    contentSelector:   undefined,
    titleSelector:   undefined,
    linkSelector:   undefined,
    picSelector:   undefined,
    contentLimit: 100,
    eventType: 'click',
    appKey:     undefined,
    relateUid:  undefined,
    assName:    undefined

}, function(attrs) {
    var $this = $(this);

    $this.bind(attrs.eventType, function(){
        // 把下面这段代码放到bind函数里面， 是为了避免share过多时ie6下假死
        var content = '', title = '', link = '', pic = '';

        if (attrs.contentSelector && $(attrs.contentSelector).length > 0){
            content = $(attrs.contentSelector).text() || $(attrs.contentSelector).val();
        }
        if (attrs.titleSelector && $(attrs.titleSelector).length > 0){
            title = $(attrs.titleSelector).text() || $(attrs.titleSelector).val();
        }
        if (attrs.linkSelector && $(attrs.linkSelector).length > 0){
            var link = $(attrs.linkSelector).attr('href') || $(attrs.titleSelector).text() || $(attrs.picSelector).val();
            link = toHTTP(link);
        }else{
            link = window.location.href;
        }
        if (attrs.picSelector && $(attrs.picSelector).length > 0){
            var pic = $(attrs.picSelector).attr('src') || $(attrs.titleSelector).text() || $(attrs.picSelector).val();
            pic = toHTTP(pic);
        }

        content = content.replace( /\s+/g, " " );
        if (content.length > attrs.contentLimit){
            content = content.substr(0, attrs.contentLimit) + '...';
        };

        if (attrs.site === 'renren'){
            shareToRenRen(link, title, content, pic, attrs);
        }else if (attrs.site === 'tencentweibo'){
            shareToTencentWeibo(link, title, content, pic, attrs);
        }else if (attrs.site === 'sinaweibo'){
            shareToSinaWeibo(link, title, content, pic, attrs);
        }else if (attrs.site === 'douban'){
            shareToDouban(link, title, content, pic, attrs);
        }else if (attrs.site === 'qzone'){
            shareToQZone(link, title, content, pic, attrs);
        };

    });

});
})();
