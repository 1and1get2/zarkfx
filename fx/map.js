/*
 * DOC_BEGIN
 *
 * Map
 * ===
 *
 * 此 fx 用于在网页中嵌入第三方的地图，并可以与网页内的其他元素完成简单的数据交换。
 *
 * Options
 * ---------
 *
 * :FX name: map
 * :Description: 用于嵌入第三方的地图控件
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
 *       * - sp
 *         - optional
 *         - 指定服务提供商。
 *         - google
 *         - google | baidu（暂不支持）
 *
 *       * - setDimen
 *         - optional
 *         - 若为 false，本 fx 不会主动设置地图大小，实际大小由外部 CSS 控制
 *         - true
 *         - boolean
 *
 *       * - width
 *         - optional
 *         - 地图区域的宽度，setDimen 为 true 时有效
 *         - 400
 *         - 正整数
 *
 *       * - height
 *         - optional
 *         - 地图区域的高度，setDimen 为 true 时有效
 *         - 300
 *         - 正整数
 *
 *       * - lng
 *         - optional
 *         - 初始位置的经度
 *         - 0.0
 *         - -180.0 至 +180.0
 *
 *       * - lat
 *         - optional
 *         - 初始位置的纬度
 *         - 0.0
 *         - -90.0 至 +90.0
 *
 *       * - zoom
 *         - optional
 *         - 初始缩放尺度
 *         - 0
 *         - 0 至 20 左右（不同的地图服务提供商最大缩放尺度不同）
 *
 *       * - bindLng
 *         - optional
 *         - 用于绑定存放经度信息的控件
 *         - ""
 *         - jquery selector
 *
 *       * - bindLat
 *         - optional
 *         - 用于绑定存放纬度信息的控件
 *         - ""
 *         - jquery selector
 *
 *       * - bindZoom
 *         - optional
 *         - 用于绑定存放缩放尺度的控件
 *         - ""
 *         - jquery selector
 *
 *       * - staticLink
 *         - optional
 *         - 向外部 HTML 元素输出静态地图链接地址，可以是 <a>、<img>、<input> 等。
 *         - ""
 *         - jquery selector
 *
 *       * - lngOff
 *         - optional
 *         - 经度校正值
 *         - 0.0
 *         - float
 *
 *       * - latOff
 *         - optional
 *         - 纬度校正值
 *         - 0.0
 *         - float
 *
 *       * - bind_var
 *         - optional
 *         - 开发用，可以把对应的 map 对象与 bind_var 指定的 javascript 变量绑定
 *         - ""
 *         - javascript 变量名
 *
 * 最基本的使用
 * ------------
 *
 * .. zarkfx:: :demo:
 *
 *    <div fx="map" />
 *
 * .. zarkfx:: :demo:
 *
 *    <div fx="map[width=200;height=200]" />
 *
 * .. zarkfx:: :demo:
 *
 *    <div style="width:75%;height:200px" fx="map[setDimen=false]" />
 *
 * .. zarkfx:: :demo:
 *
 *    <div fx="map[lat=39.919;lng=116.397;zoom=12]" />
 *
 * 与控件绑定，用于地图位置标定
 * ----------------------------
 *
 * 用鼠标右键点地图区域或者用左键拖动标记，输入框的数值会相应地变动；改变输入框的值地图上的内容也会相应地变动。
 *
 * .. zarkfx:: :demo:
 *
 *    <div fx="map[width=400;height=400;bindLng=#lng1;bindLat=#lat1;bindZoom=#zoom1]" />
 *    <input id="lat1" value="39.919" />
 *    <input id="lng1" value="116.397" />
 *    <input id="zoom1" value="12" />
 *
 * 输出静态链接 <a>
 * ----------------
 *
 * .. zarkfx:: :demo:
 *
 *    <div fx="map[width=300;height=200;staticLink=#slink1]" />
 *    <a id="slink1" target="_blank" style="font-size: 200%">static map link here</a>
 *
 * 输出静态链接 <img>
 * ------------------
 *
 * .. zarkfx:: :demo:
 *
 *    <div fx="map[width=300;height=200;staticLink=#slink2]" />
 *    <img id="slink2" />
 *
 * 输出静态链接 <input>
 * --------------------
 *
 * .. zarkfx:: :demo:
 *
 *    <div fx="map[width=300;height=300;staticLink=#slink3]" />
 *    <input id="slink3" style="width: 80%" />
 *
 * DOC_END
 */


;(function(){
    var mapReady = {google: false, baidu: false};
    var cb_name = "FX." + FX.getUUID();

FX.register( "map", [], {
    style       : "default",
    sp          : "google",
    setDimen    : true,
    width       : 400,
    height      : 300,
    lng         : 0.0,
    lat         : 0.0,
    zoom        : 0,
    bindLng     : "",
    bindLat     : "",
    bindZoom    : "",
    staticLink  : "",
    lngOff      : 0.0,
    latOff      : 0.0,
    bind_var    : ""

}, function(attrs) {
    var that = this;
    if(attrs["sp"] === "google") {
        if( (!mapReady.google) &&
            (eval("typeof(" + cb_name + "_google)") === "undefined") )
        {
            var cb = function() {
                mapReady.google = true;
                eval("delete " + cb_name + "_google");
            };
            eval(cb_name + "_google = cb");
            $('<script type="text/javascript" />').
                attr("src", "http://maps.googleapis.com/maps/api/js?" +
                        "callback=" + cb_name + "_google&" +
                        "sensor=false&language=zh").
                appendTo("head");
        };

        var cb = function() {
            if(!mapReady.google) {
                setTimeout(cb, 100);
                return;
            };

            if(attrs["setDimen"]) {
                $(that).css({
                    width: attrs["width"],
                    height: attrs["height"]
                });
            };

            var lng = attrs["lng"] + attrs["lngOff"];
            var lat = attrs["lat"] + attrs["latOff"];
            var zoom = attrs["zoom"];

            var map = new google.maps.Map(that, {
                zoom: zoom,
                center: new google.maps.LatLng(lat, lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            });

            if( (typeof(attrs["bind_var"]) === "string") && (attrs["bind_var"] !== "") ) {
                try {
                    eval(attrs["bind_var"] + " = map");
                } catch(err) {};
            };

            /**************************************/

            var getObj = function(name) {
                var ret = false;
                if( (typeof(attrs[name]) === "string") && (attrs[name] !== "") ) {
                    try {
                        ret = $(attrs[name]);
                    } catch(err) {};
                };
                return ret;
            };

            var bindLng = getObj("bindLng");
            var bindLat = getObj("bindLat");
            var bindZoom = getObj("bindZoom");
            var staticLink = getObj("staticLink");

            if( (bindLng !== false) || (bindLat !== false) ||
                    (bindZoom !== false) || (staticLink !== false) )
            {
                var mark = new google.maps.Marker({
                    position: map.getCenter(),
                    draggable: true,
                    map: map
                });

                var loadBinds = function() {
                    if(bindLng !== false) {
                        lng = parseFloat( bindLng.val() );
                        if( isNaN(lng) ) {lng = 0.0};
                        lng += attrs["lngOff"];
                    };
                    if(bindLat !== false) {
                        lat = parseFloat( bindLat.val() );
                        if( isNaN(lat) ) {lat = 0.0};
                        lat += attrs["latOff"];
                    };
                    if(bindZoom !== false) {
                        zoom = parseInt( bindZoom.val() );
                        if( isNaN(zoom) ) {zoom = 0};
                    };
                    mark.setPosition( new google.maps.LatLng(lat, lng) );
                    map.setZoom(zoom);
                };

                var saveBinds = function() {
                    var latlng = mark.getPosition();
                    lng = latlng.lng();
                    lat = latlng.lat();
                    zoom = map.getZoom();
                    if(bindLng !== false) {
                        bindLng.val(lng - attrs["lngOff"]);
                    };
                    if(bindLat !== false) {
                        bindLat.val(lat - attrs["latOff"]);
                    };
                    if(bindZoom !== false) {
                        bindZoom.val(zoom);
                    };
                };

                var saveLink = function() {
                    if(staticLink !== false) {
                        var latlng = mark.getPosition();
                        latlng = latlng.lat() + "," + latlng.lng();
                        var w = $(that).width();
                        var h = $(that).height();
                        if(w > 640) {w = 640};
                        if(h > 640) {h = 640};
                        var url = "http://maps.googleapis.com/maps/api/staticmap?" +
                            "center=" + latlng +
                            "&zoom=" + map.getZoom() +
                            "&size=" + w + "x" + h +
                            "&markers=" + latlng +
                            "&language=zh&scale=2&sensor=false";
                        staticLink.each(function(){
                            if(this.tagName === "A") {
                                $(this).attr("href", url);
                            } else if(this.tagName === "IMG") {
                                $(this).attr("src", url);
                            } else if(this.tagName === "INPUT") {
                                $(this).val(url);
                            } else {
                                $(this).html(url);
                            };
                        });
                    };
                };

                loadBinds();
                if( (attrs["lng"] == 0.0) && (attrs["lat"] == 0.0) ) {
                    map.setCenter( mark.getPosition() );
                };
                saveBinds();
                saveLink();

                var onMarkChange = function(e) {
                    mark.setPosition(e.latLng);
                    map.panTo(e.latLng);
                    saveBinds();
                    saveLink();
                };

                var onBindChange = function() {
                    loadBinds();
                    map.panTo( new google.maps.LatLng(lat, lng) );
                    saveLink();
                };

                google.maps.event.addListener(map, "rightclick", onMarkChange);
                google.maps.event.addListener(mark, "dragend", onMarkChange);
                google.maps.event.addListener(map, "zoom_changed", function() {
                    saveBinds();
                    saveLink();
                });
                if(bindLng !== false) {
                    bindLng.change(onBindChange);
                };
                if(bindLat !== false) {
                    bindLat.change(onBindChange);
                };
                if(bindZoom !== false) {
                    bindZoom.change(onBindChange);
                };
            };
        };
        cb();
    } else if(attrs["sp"] === "baidu") {
        alert("baidu is not available now.");
    };
});
})();
