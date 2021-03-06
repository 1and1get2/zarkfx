/*
 *
 * DOC_BEGIN
 *
 * Confirm
 * =========
 *
 * 你想让用户在点击删除按钮之后再次确认？
 *
 * confirm fx可以轻松实现在任何元素上弹出确认框，只有用户点击“确定”后才会执行原本的操作。
 *
 * 此fx由Sparker5团队原创开发。
 *
 *
 * Options
 * --------------
 *
 * :FX name: accordion
 * :Description: 确认弹窗提示
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
 *       * - msg
 *         - optional
 *         - 确认提示语
 *         - Are you sure?
 *         - 字符串
 *
 *
 *
 * 给a标签添加提示
 * ---------------
 *
 * .. zarkfx:: :demo:
 *
 *     <a fx="confirm[msg=你确定删除?]" >删除</a>
 *
 *
 * 给button添加提示
 * ----------------
 *
 * 点击取消时onclick事件不被执行
 *
 * .. zarkfx:: :demo:
 *
 *     <input fx="confirm[msg=你确定删除?]" type="button" value="删除" onclick="alert('删除成功')" />
 *
 *
 * DOC_END
 *
 */


;(function(){
FX.register('confirm', [], {
    msg:        'Are you sure?'

}, function(attrs){
    var $this = $(this);

    if (typeof($this.attr('onclick')) !== 'undefined'){
        var onclick = $this.attr('onclick');
        $this.removeAttr('onclick');
        var old_click = function(){
            eval(onclick);
        };
        $this.click(function(){
            if ( confirm(attrs.msg) ){
                old_click && old_click.call(this);
                return true;
            }else{
                return false;
            };
        });
    }else{
        $this.click(function(){
            return confirm(attrs.msg);
        });
    };

});

})();
