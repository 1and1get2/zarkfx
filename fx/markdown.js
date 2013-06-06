/*
 * DOC_BEGIN
 *
 * Markdown
 * ========
 *
 * 此 fx 基于 `markdown-js <https://github.com/evilstreak/markdown-js>`_ 插件开发，用于 Markdown 格式文本的解析与预览。
 *
 * Options
 * ---------
 *
 * :FX name: markdown
 * :Description: 用于 Markdown 格式文本的解析与预览
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
 *       * - tip
 *         - optional
 *         - 用于指定目标容易，如果为空则对原容器内容进行替换。
 *         - ""
 *         - jquery selector
 *
 *       * - realtime
 *         - optional
 *         - 是否实时更新，用法见 :ref:`example-realtime`。
 *         - false
 *         - true | false
 *
 *       * - minInterval
 *         - optional
 *         - 用于指定最小更新时间间隔，单位为毫秒，防止更新过于频繁拖慢电脑速度。
 *         - 2000
 *         - 正整数
 *
 *       * - trigger
 *         - optional
 *         - 用于指定进行手动更新的 HTML 元素（通常为 Button）。可以与实时更新并存。
 *         - ""
 *         - jquery selector
 *
 * 直接解析并替换 Markdown 文本
 * ----------------------------
 *
 * .. zarkfx:: :demo:
 *
 *    <div fx="markdown">
 *    some **Markdown text** here.
 *    </div>
 *
 * 解析 Markdown 文本并将结果放入其他容器
 * --------------------------------------
 *
 * .. zarkfx:: :demo:
 *
 *    <table border="1">
 *        <tr><th>Source</th><th>Result</th></tr>
 *        <tr>
 *            <td><div style="width:400px" fx="markdown[tip=#target1]">some **Markdown text** here.</div></td>
 *            <td><div style="width:400px" id="target1"></div></td>
 *        </tr>
 *    </table>
 *
 * .. _example-realtime:
 *
 * 实时解析，适合用来做预览功能
 * ----------------------------
 *
 * .. zarkfx:: :demo:
 *
 *    <table border="1">
 *        <tr><th>Source</th><th>Result</th></tr>
 *        <tr>
 *            <td><textarea style="width:400px;height:400px" fx="markdown[tip=#target2;realtime]">some **Markdown text** here.</textarea></td>
 *            <td><div style="width:400px;height:400px" id="target2"></div></td>
 *        </tr>
 *    </table>
 *
 * 手动解析，适合用来做手动预览功能
 * --------------------------------
 *
 * .. zarkfx:: :demo:
 *
 *    <table border="1">
 *        <tr><th>Source</th><th>Result</th></tr>
 *        <tr>
 *            <td><textarea style="width:400px;height:400px" fx="markdown[tip=#target3;trigger=#preview]">some **Markdown text** here.</textarea></td>
 *            <td><div style="width:400px;height:400px" id="target3"></div></td>
 *        </tr>
 *    </table>
 *    <input type="button" id="preview" value="Preview" />
 *
 * DOC_END
 */


;(function(){
FX.register( "markdown", ["markdown"], {
    tip         : "",
    realtime    : false,
    minInterval : 2000,
    trigger     : ""

}, function(attrs) {
    var src = this;
    var field_src = "innerHTML";
    if( (src.tagName === "INPUT") || (src.tagName === "TEXTAREA") ) {
        field_src = "value";
    };

    var tgt = src;
    var field_tgt = field_src;

    if( (typeof(attrs["tip"]) === "string") && (attrs["tip"] !== "") ) {
        tgt = $(attrs["tip"])[0];
        field_tgt = "innerHTML";
        if( (tgt.tagName === "INPUT") || (tgt.tagName === "TEXTAREA") ) {
            field_tgt = "value";
        };
    };

    var process = function() {
        tgt[field_tgt] = markdown.toHTML(src[field_src]);
    };

    process();

    if(attrs["realtime"]) {
        var changed = false;
        var delayed = false;

        var cb_timeout = function() {
            if(changed) {
                process();
                changed = false;
                delayed = true;
                setTimeout(cb_timeout, attrs["minInterval"]);
            } else {
                delayed = false;
            }
        };

        var cb_change = function() {
            if(!delayed) {
                process();
                changed = false;
                delayed = true;
                setTimeout(cb_timeout, attrs["minInterval"]);
            } else {
                changed = true;
            };
        };

        $(src).change(cb_change);
        $(src).keypress(cb_change);
    };

    if( (typeof(attrs["trigger"]) === "string") && (attrs["trigger"] !== "") ) {
        $(attrs["trigger"]).click(process);
    };
});
})();
