/*
 * DOC_BEGIN
 *
 * Map
 * ===
 *
 * 此 fx 基于 `markdown-js <https://github.com/evilstreak/markdown-js>`_ 插件开发，用于 Markdown 格式文本的解析与预览。
 *
 * Options
 * ---------
 *
 * :FX name: map
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
 *         - 用于指定目标容器，如果为空则对原容器内容进行替换。
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
 *    <div fx="map[lat=26.24533;lng=105.93309;zoom=12;bind_lng=#lng1;bind_lat=#lat1;bind_zoom=#zoom1]">
 *    </div>
 *    <input id="lat1" />
 *    <input id="lng1" />
 *    <input id="zoom1" />
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
    FX.cb_mapInit = function() {
        delete FX.cb_mapInit;
    };
    $('<script type="text/javascript" />').
    attr("src", "http://maps.googleapis.com/maps/api/js?" +
        "callback=FX.cb_mapInit&sensor=false&language=zh").
    appendTo("head");

FX.register( "map", [], {
    style       : "default",
    width       : "400px",
    height      : "400px",
    lng         : 0.0,
    lat         : 0.0,
    zoom        : 1,
    bind_lng    : "",
    bind_lat    : "",
    bind_zoom   : "",
    bind_var    : ""

}, function(attrs) {

    var that = this;

    var cb = function() {
        if(typeof(FX.cb_mapInit) === "function") {
            setTimeout(cb, 100);
            return;
        };

        $(that).css({
            width: attrs["width"],
            height: attrs["height"]
        });

        var options = {
            zoom: attrs["zoom"],
            center: new google.maps.LatLng(attrs["lat"], attrs["lng"]),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        var map = new google.maps.Map(that, options);

        if( (typeof(attrs["bind_var"]) === "string") && (attrs["bind_var"] !== "") ) {
            eval(attrs["bind_var"] + " = map");
        };

        var mark = new google.maps.Marker({
            position: options.center,
            map: map
        });

        google.maps.event.addListener(map, "rightclick", function(e) {
            mark.setPosition(e.latLng);
            mark.setAnimation(google.maps.Animation.DROP);
            map.panTo(e.latLng);
            $(attrs["bind_lng"]).val( e.latLng.lng() );
            $(attrs["bind_lat"]).val( e.latLng.lat() );
            $(attrs["bind_zoom"]).val( map.getZoom() );
        });

    };

    cb();

});
})();
