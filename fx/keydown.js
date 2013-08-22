/*
 * DOC_BEGIN
 *
 * Key Down
 * =============
 *
 * 你想给某个元素绑定某种特定事件，比如在textarea中当按下ctrl+enter时提交表单?
 *
 * 使用keydown通过设置按键名称轻松实现以上效果。
 * 
 * Options
 * --------------
 *
 * :FX name: keydown
 * :Description: 使用通俗的单词给元素绑定键盘事件
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
 *       * - key
 *         - required
 *         - 事件名称，目前仅支持三种事件
 *         - undefined
 *         - enter | esc | ctrl+enter
 *
 *       * - target
 *         - required
 *         - 执行事件的目标对象
 *         - undefined
 *         - jquery selector
 *
 *       * - action
 *         - option
 *         - 对目标元素执行的事件名称
 *         - click
 *         - 字符串
 *
 * 用ctrl+enter提交表单
 * -------------------------
 *
 *  试一下在输入框中按下ctrl+enter
 *
 * .. zarkfx:: :demo:
 *
 *   <form id="f1" action="#" method="POST" onsubmit="alert('提交了表单'); return false;" >
 *      <textarea fx="keydown[key=ctrl+enter; action=submit; target=#f1]">
 *      </textarea>
 *   </form>
 *
 * DOC_END
 * */


;(function(){
FX.register('keydown', [], {
    key     : undefined,
    action  : 'click',
    target  : undefined

}, function(attrs){
    var $this = $(this);

    if (attrs.key && attrs.target){
        var key_code=null, ctrl=null, alt=null, shift=null;

        if (attrs.key === 'enter'){
            key_code = 13;
        }else if (attrs.key === 'esc'){
            key_code = 27;
        }else if (attrs.key === 'ctrl+enter'){
            key_code = 13;
            ctrl = true;
        };

        if (key_code && attrs.target){
            $this.keydown(function(event){
                if (event.keyCode === key_code 
                    && ( ctrl === null  || event.ctrlKey === ctrl) 
                    && ( alt === null   || event.altKey === alt) 
                    && ( shift === null || event.shiftKey === shift)){
                    eval('$(\''+attrs.target+'\').'+attrs.action+'()');
                    return false;
                };
            });
            // 修复某些浏览器下div不支持事件冒泡的bug
            if ( $this[0].tagName === 'DIV' && ($this.attr('tabindex') === undefined) ){
                $this.attr('tabindex', 1);
            };
        };
    };

});
})();
