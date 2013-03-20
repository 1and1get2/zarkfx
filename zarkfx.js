/*
 * ZarkFX JavaScript Library v0.1
 * http://zarkfx.com/
 *
 * Copyright (c) 2013 http://sparker5.com
 * Licensed under the GPL license.
 *
 */
(function($) {
    $(function(){
        // 申明全局变量
        if (!window['FX']) window['FX'] = {};
        FX = window['FX'];
        FX.FX_NAME         = 'fx'; // html中指定fx的属性名
        FX.PATH            = ''; // zarkfx.js文件所在基础路径
        $("script").each(function() {
            var src = this.src;
            if (src.indexOf('?') !== -1){
                src = src.substr(0, src.indexOf('?'));
            }
            if( /zarkfx.js$/.test(src) ) {
                FX.PATH = src.replace(/zarkfx.js$/, "");
            }
        });
        // 各种文件的访问路径
        FX.FX_PATH         = FX.PATH + 'fx/';
        FX.JS_PATH         = FX.PATH + 'static/js/';
        FX.CSS_PATH        = FX.PATH + 'static/css/';
        FX.SWF_PATH        = FX.PATH + 'static/swf/';
        FX.IMG_PATH        = FX.PATH + 'static/img/';

        // 记录是否加载过某些文件
        FX.loaded_fx       = {};
        FX.loaded_scripts  = {};
        FX.loaded_css      = {};
        FX.loaded_frames   = {};
        FX.loaded_frames["jquery-" + $.fn.jquery] = jQuery;

        // 获得UUID函数
        FX.UUID = (new Date).getTime();
        FX.getUUID = function(){
            return 'zarkfx_'+FX.UUID++;
        };

        // ajax使用cache，以免重复加载js文件
        $.ajaxSetup({ cache: true });

        // 根据frame_name先加载某个框架(比如jquery-1.3.2)，完成后运行回调函数cb
        FX.getFrame = function(frame_name, cb){
            if (FX.loaded_frames[frame_name] === undefined){
                FX.loaded_frames[frame_name] = 'loading';

                $.ajax({
                    async:      false,
                    cache:      true,
                    dataType:   'script',
                    type:       'GET',
                    url:        FX.JS_PATH + frame_name + '.js'
                });

                FX.loaded_frames[frame_name] = jQuery.noConflict(true);

                cb && cb(FX.loaded_frames[frame_name]);

            }else if(FX.loaded_frames[frame_name] === 'loading'){
                setTimeout(function(){
                    FX.getFrame(frame_name, cb);
                }, 10);

            }else{
                cb && cb(FX.loaded_frames[frame_name]);
            };
        };

        // 依次加载js文件列表，完成后运行回调函数cb，
        // 且保证任何js文件在一个页面生命周期内只会被加载一次
        FX.getJS = function(scripts, cb){

            if (typeof scripts === 'string'){
                scripts = [scripts];
            };

            if (typeof scripts === 'undefined' || scripts.length === 0){
                cb && cb();

            }else{
                var first_script = $.trim(scripts[0]),
                    sub_scripts  = scripts.slice(1);

                if (FX.loaded_scripts[first_script] === undefined){
                    FX.loaded_scripts[first_script] = 'loading';
                    $.ajax({
                        async:      true,
                        cache:      true,
                        dataType:   'script',
                        type:       'GET',
                        url:        FX.JS_PATH + first_script + '.js',
                        success:    function(){
                            FX.loaded_scripts[first_script] = true;
                            FX.getJS(sub_scripts, cb);
                        }
                    });

                }else if(FX.loaded_scripts[first_script] === 'loading'){
                    setTimeout(function(){
                        FX.getJS(scripts, cb);
                    }, 10);

                }else{
                    FX.getJS(sub_scripts, cb);
                };
            };

        };

        // 运行某个fx，在一个页面生命周期内，同一名称的fx只会run一次
        FX.run = function(fx_name, cb, defaults, deps){

            // 根据fx中default指定的值改变attrs的值类型
            // 且不要使用$.extend函数，因为它会改变attrs的数据类型
            var setDefaultValue = function(attrs){
                for(var k in defaults){
                    if (attrs[k] === undefined){
                        attrs[k] = defaults[k];
                    }else{
                        if(typeof(defaults[k]) === 'number') {
                            if (attrs[k].indexOf('.') === -1){
                                attrs[k] = parseInt(attrs[k]);
                            }else{
                                attrs[k] = parseFloat(attrs[k]);
                            };
                        }else if(typeof(defaults[k]) === 'boolean'){
                            attrs[k] = attrs[k] === true;
                        };
                    };
                };
                return attrs;
            };

            FX.getJS(deps, function(){
                // 获得所有相关的dom，然后依次对其运行fx函数
                $('['+FX.FX_NAME+'*='+fx_name+']').each(function(){
                    var attrs_array = FX.getOneFXAttrs(this, fx_name);
                    // 排掉dom选择错误的情况
                    if (attrs_array !== undefined){
                        var i = 0;
                        for ( ; i < attrs_array.length; i++){
                            var attrs = attrs_array[i];
                            setDefaultValue(attrs);
                            cb && cb.call(this, attrs);
                            // 处理通用全局属性
                            if (attrs.finishShow){
                                $(this).show();
                            };
                            if (typeof attrs.onload !== 'undefined'){
                                eval(attrs.onload+'(this)');
                            };
                        };
                    };
                });
            });
        }; // End of run

        // 动态加载css，保证在一个页面的生命周期内，同一个css最多仅加载一次
        FX.getCSS = function(css_url){
            if (typeof FX.loaded_css[css_url] === 'undefined'){
                FX.loaded_css[css_url] = 'loading';

                if (document.createStyleSheet) {
                    document.createStyleSheet(css_url);
                }else{
                    var linkobj=$('<link type="text/css" rel="stylesheet" />');
                    linkobj.attr('href', css_url);
                    $('head').append(linkobj); 
                };

                FX.loaded_css[css_url] = true;
            };
        };

        // 解析html中的fx属性值，返回一个字典，其中key对应fx名，value是一个数组
        // 同一个dom可以配置多个同名的fx，每个配置对应value中的一个值(字典)
        // 比如fx_string等于"abc[i=1] abc[i=2] def[j=1]"时将返回:
        // {'abc':[{'fx': 'abc', 'i':'1'},
        //         {'fx': 'abc', 'i':'2'}],
        //  'def':[{'fx': 'def', 'j':'1'}] }
        FX.parseFX = function(fx_string){

            // 解析配置字符串中的一个fx及其参数
            var parseOne = function(s_fx){
                var re_strip = /^\s+|\s+$/g,
                    re_var_name = /^[A-z_][A-z_0-9]*$/;

                var res = {name: "", attrs: {}, remain: ""},
                    err = {idx: 0, msg: "", fx_name: "Unknown FX"};

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
                if( (idx === -1) || (s_fx.slice(idx2, idx).search(/\S/) !== -1) ) {
                    res.remain = s_fx.slice(idx2);
                    return res;
                };

                var state = 0, escaped, t,
                    key, value;
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
                                if(key !== "") {
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

                if(state !== "finished") {
                    err.idx = idx;
                    err.msg = "Unexpected ending.";
                    throw err;
                };

                res.remain = s_fx.slice(idx + 1);

                return res;
            }; // End of parseOne

            var t = fx_string,
                out, ret_fxs = {};
            while(t !== "") {
                try {
                    out = parseOne(t);
                    if(out.name !== "") {
                        if (typeof ret_fxs[out.name] === 'undefined'){
                            ret_fxs[out.name] = [];
                        }
                        ret_fxs[out.name].push(out.attrs);
                    };
                    t = out.remain;
                } catch(err) {
                    if (typeof err.idx !== 'undefined') {
                        alert( err.fx_name + ": " + (err.idx + fx_string.length - t.length) + ": " + err.msg );
                    } else {
                        throw err;
                    };
                    break;
                };
            };
            return ret_fxs;
        }; // End of parseFX

        // 根据fx_name获得指定的fx属性值数组列表
        FX.getOneFXAttrs = function(obj, fx_name){
            return FX.parseFX($(obj).attr(FX.FX_NAME))[fx_name];
        };

        FX.splitValue = function(value){ 
            var values = value.split(','),
                i = 0;
            for ( ; i < values.length; i++){
                values[i]  = $.trim(values[i]);
            };
            return values;
        };

        // 加载并运行所有fx
        $('['+FX.FX_NAME+']').each(function(){
            var fx_string = $(this).attr(FX.FX_NAME);
            for(var k in FX.parseFX(fx_string)){
                if(FX.loaded_fx[k] === undefined){
                    FX.loaded_fx[k] = 'loading';
                    $.getScript(FX.FX_PATH + k + '.js');
                    FX.loaded_fx[k] = true;
                };
            };
        });

    });

})(jQuery);
