/*
 * DOC_BEGIN
 *
 * Zero Clipboard
 * ==============
 *
 * 使用flash插件实现点击某个按钮后复制文本到粘贴板中。
 *
 * 此fx由Sparker5团队基于 `ZeroClipboard <http://jonrohan.github.io/ZeroClipboard/>`_.  开发。
 *
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
 *       * - target
 *         - optional
 *         - 点击当前元素后复制谁的值？比如target可以为一个input或p标签
 *         - undefined
 *         - jquery selector
 *
 *       * - text
 *         - optional
 *         - 复制的文本，与target必须使用其中一个
 *         - -
 *         - 字符串
 *
 *       * - toggleHtml
 *         - optional
 *         - 点击后当前按钮切换的文本
 *         - -
 *         - 字符串
 *
 * 点击按钮复制input中的文本
 * -------------------------
 *
 *  点击复制按钮后输入框中的文本被复制到粘贴板中
 *
 * .. zarkfx:: :demo:
 *
 *      <input type="text" id="t1" value="我是被复制的内容" />
 *      <br/>
 *      <a fx="zeroclipboard[target=#t1; toggleHtml=成功]" >复制</a>
 *
 * DOC_END
 * */

;(function(){
var getOverlayHtml = function(uuid){
    return '<div id="' + uuid + '"  style="float:left;position:relative" ><div id="' + uuid + '_button" style="width:100%;height:100%;"></div></div>'
}

FX.register('zeroclipboard', [ 'zeroclipboard' ], {
    target      : undefined,
    text        : '',
    toggleHtml  : undefined

}, function(attrs){
    var $this = $(this),
        uuid = FX.getUUID();

    var $overlay = $(getOverlayHtml(uuid));
    $overlay.width($this.width()).height($this.height());
    $this.wrap($overlay);

    ZeroClipboard.setMoviePath( FX.SWF_PATH + 'ZeroClipboard.swf' ); 
    CLIPBOARD = new ZeroClipboard.Client(); 
    CLIPBOARD.setHandCursor(true); 
    CLIPBOARD.glue(uuid + '_button', uuid); 

    var copy_text = ''
    if (typeof attrs.target !== 'undefined'){
        copy_text = $(attrs.target).val();
        $(attrs.target).bind('change', function(){
            CLIPBOARD.setText($(attrs.target).val());
        });
    }else{
        copy_text = attrs.text;
    };

    CLIPBOARD.setText(copy_text);

    CLIPBOARD.addEventListener( 'onMouseDown', function(){
        if (typeof attrs.toggleHtml !== 'undefined'){
            $this.html(attrs.toggleHtml);
        }
    });

});
})();
