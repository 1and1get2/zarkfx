/*
 * ZarkFX JavaScript Library v0.1
 * http://zarkfx.com/
 *
 * Copyright (c) 2013 http://sparker5.com
 * Licensed under the GPL license.
 *
 */
(function($) {

    $(function() {
        // 申明全局变量
        if(!window["FX"]) window["FX"] = {};
        FX = window["FX"];
        FX.FX_NAME          = "fx"; // html中指定fx的属性名
        FX.PATH             = ""; // zarkfx.js文件所在基础路径
        // 计算FX.PATH
        $("script").each(function() {
            var src = this.src;
            if(src.indexOf("?") !== -1) {
                src = src.substr(0, src.indexOf("?"));
            }
            if( /zarkfx.js$/.test(src) ) {
                FX.PATH = src.replace(/zarkfx.js$/, "");
            }
        });
        // 各种文件的访问路径
        FX.FX_PATH          = FX.PATH + "fx/";
        FX.JS_PATH          = FX.PATH + "static/js/";
        FX.CSS_PATH         = FX.PATH + "static/css/";
        FX.SWF_PATH         = FX.PATH + "static/swf/";
        FX.IMG_PATH         = FX.PATH + "static/img/";

        // 记录是否加载过某些文件
        FX.loaded_frame     = {};
        FX.loaded_fx        = {};
        FX.loaded_js        = {};
        FX.loaded_css       = {};
        FX.loaded_frame["jquery-" + $.fn.jquery] = jQuery;

        FX.queue            = [];

        // 获得UUID函数
        FX.UUID = (new Date).getTime();
        FX.getUUID = function() {
            return "zarkfx_" + FX.UUID++;
        };

        FX.loadDep = function(type, name) {
            // 加载jquery，如果要支持加载其它库，jQuery.noConflict(true)这句应该怎么写?
            if(type === "frame") {
                if(typeof(FX.loaded_frame[name]) === 'undefined') {
                    FX.loaded_frame[name] = "loading";
                    $.ajax({
                        async:      true,
                        cache:      true,
                        dataType:   "script",
                        type:       "GET",
                        url:        FX.JS_PATH + name + ".js",
                        complete:   function(xhr, textStatus) {
                            if( (textStatus === "success") || (textStatus === "notmodified") ) {
                                FX.loaded_frame[name] = jQuery.noConflict(true);
                            } else {
                                FX.loaded_frame[name] = "failed";
                                alert("Load frame " + name + " failed.");
                            };
                        }
                    });
                };
                return FX.loaded_frame[name];
            } else if(type === "fx") {
                if(typeof(FX.loaded_fx[name]) === 'undefined') {
                    FX.loaded_fx[name] = "loading";
                    $.ajax({
                        async:      true,
                        cache:      true,
                        dataType:   "script",
                        type:       "GET",
                        url:        FX.FX_PATH + name + ".js",
                        complete:   function(xhr, textStatus) {
                            if( (textStatus === "success") || (textStatus === "notmodified") ) {
                                // do nothing here,
                                // the loaded fx should do the settings.
                                // fx文件中的register函数将会对FX.loaded_fx[name]赋值
                            } else {
                                FX.loaded_fx[name] = "failed";
                                alert("Load fx " + name + " failed.");
                            };
                        }
                    });
                };
                return FX.loaded_fx[name];
            } else if(type === "js") {
                if(typeof(FX.loaded_js[name]) === 'undefined') {
                    FX.loaded_js[name] = "loading";
                    $.ajax({
                        async:      true,
                        cache:      true,
                        dataType:   "script",
                        type:       "GET",
                        url:        FX.JS_PATH + name + ".js",
                        complete:   function(xhr, textStatus) {
                            if( (textStatus === "success") || (textStatus === "notmodified") ) {
                                FX.loaded_js[name] = "success";
                            } else {
                                FX.loaded_js[name] = "failed";
                                alert("Load js " + name + " failed.");
                            };
                        }
                    });
                };
                return FX.loaded_js[name];
            } else if(type === "css") {
                if(typeof(FX.loaded_css[name]) === 'undefined') {
                    FX.loaded_css[name] = "loading";
                    if (document.createStyleSheet) {
                        document.createStyleSheet(name);
                    } else {
                        var linkobj=$('<link type="text/css" rel="stylesheet" />');
                        linkobj.attr("href", name);
                        $("head").append(linkobj);
                    };
                    FX.loaded_css[name] = "success";
                };
                return FX.loaded_css[name];
            };
        }; // End loadDep

        FX.getFrame = function(name, cb) {
            var res = FX.loadDep("frame", name);
            if(res === "loading") {
                setTimeout(function() {
                    FX.getFrame(name, cb)
                }, 10);
            } else if(res === "failed") {
                return "failed";
            } else {
                cb && cb(res);
            };
        };

        FX.loadCSS = function(name) {
            FX.loadDep("css", name);
        };

        FX.register = function(name, deps, func, defaults) {
            FX.loaded_fx[name] = {
                deps:       deps,
                func:       func,
                defaults:   defaults,
            };
        };

        // 运行某个fx一次(仅对一个html元素)
        FX.runFX = function(name, attrs, that) {
            var setDefaults = function(attrs, defaults) {
                for(var k in defaults) {
                    if(typeof(attrs[k]) === 'undefined'){
                        attrs[k] = defaults[k];
                    } else {
                        if(typeof(defaults[k]) === "number") {
                            if (attrs[k].indexOf(".") === -1){
                                attrs[k] = parseInt(attrs[k]);
                            } else {
                                attrs[k] = parseFloat(attrs[k]);
                            };
                        } else if(typeof(defaults[k]) === "boolean") {
                            attrs[k] = (attrs[k] === "true" || attrs[k] === true);
                        };
                    };
                };
                return attrs;
            };

            var res = FX.loadDep("fx", name);
            if(res === "loading") {
                return "waiting";
            } else if(res === "failed") {
                return "failed";
            } else {
                for(var i = 0; i < FX.loaded_fx[name].deps.length; i++) {
                    dep = FX.loaded_fx[name].deps[i]
                    res = FX.loadDep("js", dep);
                    if(res === "loading") {
                        return "waiting";
                    } else if(res === "failed") {
                        return "failed";
                    };
                };

                // all the deps are loaded
                var attrs = setDefaults(attrs, FX.loaded_fx[name].defaults);
                var func = FX.loaded_fx[name].func;
                func && func.call(that, attrs);

                // 处理通用全局属性
                if(attrs.finishShow === true) {
                    $(that).show();
                };
                if(typeof(attrs.onload) !== 'undefined') {
                    eval(attrs.onload + '(that)');
                };

                return "done";
            };
        };

        FX.enqueue = function(params) {
            FX.queue.push(params);
        };

        FX.runQueue = function() {
            // 尝试runFX，删除已完成任务
            for(var i = 0; i < FX.queue.length; i++) {
                var params = FX.queue[i];
                if(FX.runFX(params.name, params.attrs, params.that) === "done") {
                    delete FX.queue[i];
                };
            };
            // 找到没有运行的(依赖还在加载中)，10ms后再运行
            var remain = [];
            for(var i = 0; i < FX.queue.length; i++) {
                if(typeof(FX.queue[i]) !== 'undefined') {
                    remain.push(FX.queue[i]);
                }
            };
            FX.queue = remain;

            if(FX.queue.length > 0) {
                setTimeout(FX.runQueue, 10);
            };

        };

        // 解析html中的fx属性值，返回一个字典，其中key对应fx名，value是一个数组
        // 同一个dom可以配置多个同名的fx，每个配置对应value中的一个值(value为字典)
        // 比如fx_string等于"abc[i=1] abc[i=2] def[j=1]"时将返回:
        // {'abc':[{'fx': 'abc', 'i':'1'},
        //         {'fx': 'abc', 'i':'2'}],
        //  'def':[{'fx': 'def', 'j':'1'}]}
        FX.parseFX = function(fx_string) {

            var parseOne = function(s_fx) {
                var re_strip = /^\s+|\s+$/g;
                var re_var_name = /^[A-z_][A-z_0-9]*$/;

                var res = {name: "", attrs: {}, remain: ""};
                var err = {idx: 0, msg: "", fx_name: "Unknown FX"};

                var idx = s_fx.search(/\S/);
                if(idx === -1) {
                    return res;
                };
                err.idx = idx;

                var idx2 = idx + s_fx.slice(idx).search(/[\s\[]/);
                if(idx2 < idx) {
                    idx2 = s_fx.length;
                };
                res.name = s_fx.slice(idx, idx2);

                if( !re_var_name.test(res.name) ) {
                    err.msg = "Illegal FX name.";
                    throw err;
                };
                err.fx_name = res.name;

                idx = s_fx.indexOf("[", idx2);
                if( (idx === -1) || (s_fx.slice(idx2, idx).search(/\S/) != -1) ) {
                    res.remain = s_fx.slice(idx2);
                    return res;
                };

                var state = 0, escaped, t;
                var key, value;
                for(idx+=1; idx<s_fx.length; idx+=1) {
                    switch(state) {
                        case 0: // init
                            key = "";
                            value = "";
                            err.idx = idx;
                            state = 1;
                            idx -= 1;
                            break;
                        case 1: // parse key
                            if( /[;\]]/.test(s_fx.charAt(idx)) ) {
                                key = key.replace(re_strip, "");
                                if(key != "") {
                                    if( !re_var_name.test(key) ) {
                                        err.msg = "Illegal FX attr name.";
                                        throw err;
                                    };
                                    res.attrs[key] = true;
                                };
                                if(s_fx.charAt(idx) === ";") {
                                    state = 0;
                                } else {
                                    state = "finished";
                                };
                            } else if(s_fx.charAt(idx) === "=") {
                                key = key.replace(re_strip, "");
                                if( !re_var_name.test(key) ) {
                                    err.msg = "Illegal FX attr name.";
                                    throw err;
                                };
                                err.idx = idx + 1;
                                state = 2;
                                escaped = 0;
                            } else {
                                key += s_fx.charAt(idx);
                            };
                            break;
                        case 2: // parse value
                            if(escaped === 0) {
                                if(s_fx.charAt(idx) === "&") {
                                    escaped = 1;
                                } else if(s_fx.charAt(idx) === ";") {
                                    res.attrs[key] = value;
                                    state = 0;
                                } else if(s_fx.charAt(idx) === "]") {
                                    res.attrs[key] = value;
                                    state = "finished";
                                } else {
                                    value += s_fx.charAt(idx);
                                }
                            } else if(escaped === 1) {
                                if(s_fx.charAt(idx) === "u") {
                                    t = "0000";
                                    escaped = 2;
                                } else {
                                    if(s_fx.charAt(idx) === "'") {
                                        value += '"';
                                    } else if(s_fx.charAt(idx) === '"') {
                                        value += "'";
                                    } else {
                                        value += s_fx.charAt(idx);
                                    };
                                    escaped = 0;
                                };
                            } else if(escaped === 2) { // "&uxxxx;"
                                if(s_fx.charAt(idx) === ";") {
                                    eval('t = "\\u' + t + '"');
                                    value += t;
                                    escaped = 0;
                                } else if( /[A-Fa-f0-9]/.test(s_fx.charAt(idx)) ) {
                                    t = t.slice(1) + s_fx.charAt(idx);
                                } else {
                                    err.idx = idx;
                                    err.msg = "Illegal character in hex environment.";
                                    throw err;
                                };
                            };
                            break;
                    };
                    if(state === "finished") {
                        break;
                    };
                };

                if(state != "finished") {
                    err.idx = idx;
                    err.msg = "Unexpected ending.";
                    throw err;
                };

                res.remain = s_fx.slice(idx + 1);

                return res;
            }; // End of parseOne

            var t, out, ret_fxs = {};
            t = fx_string;
            while(t != "") {
                try {
                    out = parseOne(t);
                    if(out.name != "") {
                        if (typeof(ret_fxs[out.name]) === 'undefined'){
                            ret_fxs[out.name] = [];
                        };
                        ret_fxs[out.name].push(out.attrs);
                    };
                    t = out.remain;
                } catch(err) {
                    if (typeof(err.idx) !== 'undefined') {
                        alert( err.fx_name + ": " + (err.idx + fx_string.length - t.length) + ": " + err.msg );
                    } else {
                        throw err;
                    };
                    break;
                };
            };
            return ret_fxs;
        }; // End parseFX

        FX.enqueueFXElem = function() {
            var parsed_fx = FX.parseFX( $(this).attr(FX.FX_NAME) );
            for(var name in parsed_fx) {
                var attrs_arr = parsed_fx[name];
                for(var i = 0; i < attrs_arr.length; i++) {
                    var attrs = attrs_arr[i];
                    FX.enqueue({
                        name:   name,
                        attrs:  attrs,
                        that:   this,
                    });
                };
            };
        };

        // 把html中的所有fx元素加入运行队列中，此时并不加载任何依赖项
        $('[' + FX.FX_NAME + ']').each(FX.enqueueFXElem);
        // 加载依赖项，并运行fx
        FX.runQueue();

    });

})(jQuery);
