/*
 * DOC_BEGIN
 *
 * Focus Clean
 * =============
 *
 * 点击input时清空提示文字, 常用于输入提示。本fx由Sparker5团队原创开发。
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
 *       * - color
 *         - option
 *         - 提示文本的颜色值，false表示不改变颜色
 *         - #666
 *         - 颜色值字符串 | false
 *
 *       * - password
 *         - option
 *         - 是否在输入时使用password模式，即用*替代输入字符。仅在type=password时有效
 *         - true
 *         - true | false
 *
 *       * - resume
 *         - option
 *         - 没有填写任何字符并失焦时，是否恢复显示默认提示
 *         - true
 *         - true | false
 *
 * 点击input清空文本
 * -----------------
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="focusclean" value="搜索..." />
 *
 * 使用password模式
 * ------------------
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="password" fx="focusclean[password;color=false]" value="请输入密码" />
 *
 *
 * DOC_END
 * */


;(function(){
FX.register('focusclean', [], {
    color       : '#666666',
    password    : true,
    resume      : true

}, function(attrs){
    var $this = $(this);
    var old_value = $this.val();
    var old_color = $this.css('color');

    // 如果fx用于密码框, 则新建一个text在没有点击密码框时覆盖在原来的密码框上
    var on_password = attrs.password && $this[0].tagName === 'INPUT' && $this.attr('type') === 'password';
    if (on_password){
        var $input_text = $('<input type="text" />').attr('class', $this.attr('class'));
        if (attrs.resume) $input_text.val(old_value);

        $input_text.focus(function(){
            $input_text.hide();
            $this.show();
            $this.focus();
        });
        $this.after($input_text);
        $this.hide();
        if (attrs.color && attrs.color !== 'false'){
            $input_text.css('color', attrs.color).show();
        }
    };

    $this.focus(function(){
        if($this.val()==old_value){
            $this.val('');
            if (attrs.color && attrs.color !== 'false'){
                $this.css('color',old_color);
            };
        };
    }).blur(function(){
        if($this.val()==''){
            if (attrs.color && attrs.color !== 'false'){
                $this.css('color',attrs.color);
            };
            if (attrs.resume) $this.val(old_value);
            if (on_password){
                $this.hide();
                $input_text.show();
            };
        };
    });
    if (attrs.color && attrs.color !== 'false'){
        $this.css('color', attrs.color);
    };
});
})();
