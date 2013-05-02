/*
 * DOC_BEGIN
 *
 * Check
 * =====
 *
 * 你想验证用户输入的数据，当用户输入数据不符合格式要求时提示用户？
 * 
 * 使用check可以通过简单的配置实现输入验证，可以通过给type参数设置不同的值来使用常见验证。
 * 比如邮箱、电话号码、仅数字、与另一个input相等，等。
 *
 * 你还可以使用自定义的验证正则表达式或验证函数。
 *
 * 如果你嫌fx配置代码过长，你还可以把常用验证写成变量，然后使用options参数重复利用。
 *
 * 此fx由Sparker5团队原创编写。
 *
 * Options
 * --------------
 *
 * :FX name: check
 * :Description: 表单输入验证
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
 *       * - type
 *         - required
 *         - 验证类型，详见 "type 参数详情"
 *         - -
 *         - regex | numbers | nonnegative | email | chinamobile | notempty | notequal | minlen | maxlen | filesize | equal | endswith | startswith | custom | 
 *
 *       * - tip
 *         - optional
 *         - 错误提示对象, 用于显示msg错误消息
 *         - -
 *         - jquery selector
 *
 *       * - msg
 *         - optional
 *         - 错误提示文字
 *         - validate failed!
 *         - 字符串
 *
 *       * - validFn
 *         - optional
 *         - 验证成功时执行的函数
 *         - -
 *         - 函数名字符串或函数
 *
 *       * - invalidFn
 *         - optional
 *         - 验证失败时执行的函数
 *         - -
 *         - 函数名字符串或函数
 *
 *       * - blurCheck
 *         - optional
 *         - 元素失去焦点时是否验证
 *         - true
 *         - true | false
 *
 *       * - submitCheck
 *         - optional
 *         - 表单提交之前是否验证
 *         - true
 *         - true | false
 *
 *       * - ignoreCase
 *         - optional
 *         - 比较字符串时是否忽略大小写
 *         - false
 *         - true | false
 *
 *       * - checkBreak
 *         - optional
 *         - 若为true，当某个check验证失败时就不继续后续check的验证
 *         - true
 *         - true | false
 *
 *       * - trigger
 *         - optional
 *         - 点击此元素时触发验证
 *         - -
 *         - jquery selector
 *
 *       * - options
 *         - optional
 *         - fx参数变量，当fx的参数比较复杂时可以用options指定一个js变量代替，见: :ref:`example-options`
 *         - -
 *         - js变量名
 *
 *
 * .. topic:: type 参数详情
 *
 *    .. list-table::
 *       :widths: 1 8
 *       :header-rows: 1
 *
 *       * - value
 *         - Description
 *
 *       * - regex 
 *         - 使用正则表达式验证，需另外给出regex变量
 *
 *       * - numbers 
 *         - 验证必须为数字。可选的empty表示允许不输入内容
 *
 *       * - nonnegative 
 *         - 验证必须为0或正数字。可选的empty表示允许不输入内容
 *
 *       * - email 
 *         - 验证必须为email格式
 *
 *       * - chinamobile 
 *         - 验证必须为11位的手机号码。可选的empty表示允许不输入内容
 *
 *       * - notempty 
 *         - 验证不能为空
 *
 *       * - notequal 
 *         - 验证不能等于另一个input的值。另一个input由another参数指定。或者使用defaultValue表示不能等于初始默认值
 *
 *       * - minlen 
 *         - 验证输入的字符不能低于某个数，需使用len参数指明最低字符数
 *
 *       * - maxlen 
 *         - 验证输入的字符不能多于某个数，需使用len参数指明最多字符数
 *
 *       * - filesize 
 *         - 验证文件的尺寸，仅对type=file的input有效。需另外使用minSize和maxSize指定文件大小限制，minSize和maxSize可以使用k、m、g后缀。见: :ref:`example-options`
 *
 *       * - equal 
 *         - 验证必须等于另一个input的值。另一个input又another参数指定
 *
 *       * - endswith 
 *         - 验证输入必须以某些值结尾，需另外指定values参数，可用逗号配置多个许可值，见: :ref:`example-options`
 *
 *       * - startswith 
 *         - 验证输入必须以某些值开头，类似endswith
 *
 *       * - custom 
 *         - 使用自定义验证函数， 见: :ref:`example-options`
 *
 *
 *
 * 注册验证
 * ------------
 *
 * .. zarkfx:: :demo:
 *
 *      <p>注册新账号</p>
 *      <form action="?" method="GET" >
 *          <p>邮箱</p>
 *          <input type="text" fx="check[type=email; tip=#error1; msg=请输入正确的邮箱地址]" />

 *          <p>用户名</p>
 *          <input type="text" fx="check[type=notempty; tip=#error1; msg=请输入用户名]" />

 *          <p>密码</p>
 *          <input id="pd" type="password" fx="check[type=minlen; tip=#error1; msg=密码不能低于6个字符; len=6; ]" />

 *          <p>密码确认</p>
 *          <input type="password" fx="check[type=equal; another=#pd; tip=#error1; msg=您两次输入的密码不一致;]" />

 *          <br/>
 *          <input type="submit" value="注册" />
 *          <p id="error1" style="color: red;"></p>
 *      </form>
 * 
 *
 * 使用trigger
 * ------------
 *
 * 点击搜索按钮时触发验证，只有验证通过时才会执行按钮的onclick事件
 *
 * .. zarkfx:: :demo:
 *
 *      <input type="text" fx="focusclean check[type=notequal; defaultValue; tip=#error2; msg=请输入搜索关键字; trigger=#s1; ]" value="搜索商品" autocomplete="off" />
 *
 *      <input type="button" id="s1" value="搜索" onclick="alert('搜索了商品')" />
 *
 *      <p id="error2" style="color: red;"></p>
 *
 * .. _example-options:
 *
 * 使用options
 * ------------
 *
 * 以下四个样例使用了options参数，在html代码中的配置值优先于options中的值。
 *
 * 第一个样例使用了两个check验证，要求用户必须选择300k以下的图片文件。
 *
 * 第二个样例使用了自定义正则表达式，当regex参数写在html代码的fx配置中时"["和"]"需要在使用"&"转义符号。若写在options变量中则不需要。
 *
 * 第三个和第四个样例都要求用户必须输入数字，但第四个样例使用了自定义验证函数customFn。
 *
 * .. zarkfx:: :demo:
 *
 *      <script>
 *          var invalid = function(attrs){
 *                  alert('验证失败: ' + attrs.msg );
 *          };
 *          var o1 = {
 *              validFn     : function(attrs){
 *                  alert('验证成功: ' + this.tagName);
 *              },
 *              invalidFn   : 'invalid',
 *              customFn    : function(attrs){
 *                  return /^-?[0-9]+$/.test($(this).val());
 *              }
 *          }
 *      </script>
 *
 *      <p>上传图片</p>
 *      <input type="file" fx="check[options=o1; type=filesize; maxSize=300k; msg=图片不能大于300k] check[options=o1; type=endswith; values=.jpeg, .png, .jpg, .gif; msg=只能上传图片文件;]" autocomplete="off" />

 *      <p>输入手机号码</p>
 *      <input type="text" fx="check[options=o1; type=regex; regex=1&[0-9&]{10}; msg=请输入11位手机号码]" autocomplete="off" />

 *      <p>输入数字</p>
 *      <input type="text" fx="check[options=o1; type=numbers; msg=请输入数字; ]" autocomplete="off" />

 *      <p>输入数字2</p>
 *      <input type="text" fx="check[options=o1; type=custom; msg=请输入数字; ]" autocomplete="off" />
 * DOC_END
 * */


;(function(){
FX.register('check', [], {
    type            : undefined,
    tip             : undefined,
    msg             : 'validate failed!',
    validFn         : undefined,
    invalidFn       : undefined,
    blurCheck       : true,
    submitCheck     : true,
    ignoreCase      : false,
    checkBreak      : true,
    trigger         : undefined,
    options         : undefined

}, function(attrs) {
    var $this = $(this);
    if (typeof attrs.options !== 'undefined'){
        var options = {};
        $.extend(options, eval(attrs.options));
        $.extend(options, attrs);
        attrs = options;
    };
    // 获得错误提示的对象
    var error_obj = $(attrs["tip"])[0];
    if( !error_obj && !attrs.invalidFn ) { return; };

    var regex,
        this_val = {
            node: this,
            validate: undefined,
            attrs: attrs,
            msg: attrs.msg,
            error_obj: error_obj
        };

    switch(attrs.type) {
        case "regex":
            if (typeof attrs.regex === 'undefined'){ return; };
            eval("regex = /" + attrs["regex"] +"/");
            if( !(regex instanceof RegExp) ) { return; };

            break;
        case "numbers":
            if(attrs.empty){
                regex = /(^-?[0-9]+$)|(^$)/;
            }else{
                regex = /^-?[0-9]+$/;
            };

            break;
        case "nonnegative":
            if(attrs.empty){
                regex = /(^[0-9]+$)|(^$)/;
            }else{
                regex = /^[0-9]+$/;
            };

            break;
        case "email":
            regex = /^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;

            break;
        case "chinamobile":
            if(attrs.empty){
                regex= /(^1[0-9]{10}$)|(^$)/;
            }else{
                regex= /^1[0-9]{10}$/;
            };

            break;
        case "notempty":
            this_val.validate = function(){
                return $.trim($(this_val.node).val()).length > 0;
            };

            break;
        case "notequal":
            if(typeof(attrs.value) !== 'undefined' || (typeof attrs.defaultValue !== 'undefined')){
                var old_value;
                if (typeof attrs.defaultValue !== 'undefined'){
                    old_value = $this.val();
                    this_val.validate = function(){
                        var match;
                        match = $.trim($(this_val.node).val());
                        if (attrs.ignoreCase){
                            old_value = old_value.toLowerCase();
                            match = match.toLowerCase();
                        };
                        return old_value !== match;
                    };
                }else{
                    old_value = attrs.value.split(',');
                    for (var i in old_value){
                        old_value[i] = $.trim(old_value[i]);
                    };
                    this_val.validate = function(){
                        var match;
                        match = $.trim($(this_val.node).val());
                        if (attrs.ignoreCase){
                            old_value = old_value.toLowerCase();
                            match = match.toLowerCase();
                        };
                        return old_value.indexOf(match) === -1;
                    };
                };

            };

            break;
        case "minlen":
            this_val.validate = function(){
                return $.trim($(this_val.node).val()).length >= parseInt(attrs.len);
            };

            break;
        case "maxlen":
            this_val.validate = function(){
                return $.trim($(this_val.node).val()).length <= parseInt(attrs.len);
            };

            break;
        case "filesize":
            var expandeSize = function(size){
                size = size.toLowerCase();
                var last_char = size.charAt(size.length-1);
                if (last_char === 'k'){
                    return parseInt(size.substr(0, size.length-1)) * 1024;
                }else if (last_char === 'm'){
                    return parseInt(size.substr(0, size.length-1)) * 1024 * 1024;
                }else if (last_char === 'g'){
                    return parseInt(size.substr(0, size.length-1)) * 1024 * 1024 * 1024;
                };
                return parseInt(size);
            };
            this_val.validate = function(){
                var $node = $(this_val.node);
                if ($node[0].tagName === 'INPUT' && $node.attr('type') === 'file'){
                    if (typeof(attrs.maxSize) !== 'undefined'){
                        if ($node[0].files[0].size > expandeSize(attrs.maxSize)) return false;
                    };
                    if (typeof(attrs.minSize) !== 'undefined'){
                        if ($node[0].files[0].size < expandeSize(attrs.minSize)) return false;
                    };
                    
                };
                return true;
            };

            break;
        case "equal":
            var another = $(attrs["another"])[0];
            if(another){
                this_val.validate = function(){
                    var value = this.node.value,
                        match = another.value;
                    if (attrs.ignoreCase){
                        value = value.toLowerCase();
                        match = match.toLowerCase();
                    };
                    return value === match;
                };
            };

            break;
        case "endswith":
            var values;
            if (typeof attrs.values !== 'undefined'){
                values = attrs.values.split(',');
            }else{
                values = [];
            };
            this_val.validate = function(){
                var i = 0,
                    value = $this.val();
                if (value.length === 0){
                    return true;
                }else{
                    for ( ; i < values.length; i++){
                        var type = $.trim(values[i]);
                        if (attrs.ignoreCase){
                            value = value.toLowerCase();
                            type = type.toLowerCase();
                        };
                        if (value.indexOf(type) + type.length === value.length){
                            return true;
                        };
                    };
                    return false;
                };
            };

            break;
        case "startswith":
            var values;
            if (typeof attrs.values !== 'undefined'){
                values = attrs.values.split(',');
            }else{
                values = [];
            };
            this_val.validate = function(){
                var i = 0,
                    value = $this.val();
                if (value.length === 0){
                    return true;
                }else{
                    for ( ; i < values.length; i++){
                        var type = $.trim(values[i]);
                        if (attrs.ignoreCase){
                            value = value.toLowerCase();
                            type = type.toLowerCase();
                        };
                        if (value.indexOf(type) === 0){
                            return true;
                        };
                    };
                    return false;
                };
            };

            break;
        case "custom":
            if( typeof(attrs.customFn) === 'undefined' ) { return; };
            if( typeof(attrs.customFn) === 'function' ) {
                this_val.validate = function() {
                    return attrs.customFn.call(this_val.node, this_val.attrs);
                };
            }else{
                this_val.validate = function() {
                    return eval(attrs.customFn + '.call(this_val.node, this_val.attrs)');
                };
            };

            break;
        default:
            return;
    };

    // 如果没有validate的话就用regex生成validate
    if(!this_val.validate && regex) {
        this_val.validate = function(){
            return regex.test(this_val.node.value);
        };
    }else if(!this_val.validate){
        return;
    };

    if (typeof(attrs.validFn) !== 'undefined'){
        this_val.success = function() {
            if( typeof(attrs.validFn) === 'function' ) {
                attrs.validFn.call(this_val.node, this_val.attrs);
            }else{
                eval(attrs.validFn + ".call(this_val.node, this_val.attrs)");
            };
        };
    }else{
        this_val.success = function(){
            if(this_val.error_obj) {
                $(this_val.error_obj).html("").hide();
            };
        };
    };

    if (typeof(attrs.invalidFn) !== 'undefined'){
        this_val.fail = function() {
            if( typeof(attrs.invalidFn) === 'function' ) {
                attrs.invalidFn.call(this_val.node, this_val.attrs);
            }else{
                eval(attrs.invalidFn + ".call(this_val.node, this_val.attrs)");
            };
        };
    }else{
        this_val.fail = function(){
            if(this_val.error_obj) {
                $(this_val.error_obj).html(this_val.msg).show();
            };
        };
    };

    if (attrs.blurCheck){
        if( !$.data(this, "zarkfx_check_validations") ) {
            $.data(this, "zarkfx_check_validations", []);

            var this_validation = function(){
                var val_functions = $.data(this, "zarkfx_check_validations"),
                    i = 0;
                for( ; i < val_functions.length; i++){
                    if (!val_functions[i]()){
                        return false;
                    };
                };
            }

            if ($this[0].tagName === 'INPUT' && $this.attr('type') === 'file'){
                $this.change(this_validation);
            }else{
                $this.blur(this_validation);
            };

        };

        $.data(this, "zarkfx_check_validations").push(function(){
            if( this_val.validate() ) {
                this_val.success();
                return true;
            } else {
                this_val.fail();
                return false;
            };
        });
    };

    if (attrs.submitCheck){
        var form = this.form;

        if (form){
            if( !$.data(form, "zarkfx_check_validations") ) {
                $.data(form, "zarkfx_check_validations", []);

                $(form).submit(function() {
                    var val_functions = $.data(form, "zarkfx_check_validations"),
                        success = true;
                    for(var i in val_functions) {
                        if (val_functions[i].validate()){
                            val_functions[i].success();
                        }else{
                            val_functions[i].fail();
                            if (attrs.checkBreak){
                                return false;
                            }else{
                                success = false;
                            };
                        };
                    };
                    return success;
                });
            };
            $.data(form, "zarkfx_check_validations").push(this_val);
        };

    };

    if (attrs.trigger){
        $(attrs.trigger).each(function(){
            var $this = $(this);
            if( !$.data(this, "zarkfx_check_validations") ) {
                $.data(this, "zarkfx_check_validations", []);

                if (typeof($this.attr('onclick')) !== 'undefined'){
                    var onclick = $this.attr('onclick');
                    $this.removeAttr('onclick');
                    var old_click = function(){
                        eval(onclick);
                    };
                }else{
                    var old_click = false;
                };
                $this.click(function(){
                    var val_functions = $.data(this, "zarkfx_check_validations"),
                        success = true;
                    for(var i in val_functions) {
                        if (val_functions[i].validate()){
                            val_functions[i].success();
                        }else{
                            val_functions[i].fail();
                            if (!attrs.checkAll){
                                return false;
                            }else{
                                success = false;
                            };
                        };
                    };
                    if (success){
                        old_click && old_click.call(this);
                    };
                    return success;
                });
            };
            $.data(this, "zarkfx_check_validations").push(this_val);
        });
    };

});
})();
