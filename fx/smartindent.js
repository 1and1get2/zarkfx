/*
 * DOC_BEGIN
 *
 * Smart Indent
 * =============
 *
 * 给textarea增加自动缩进以及tab替换为空格功能
 *
 * 
 * Options
 * --------------
 *
 * :FX name: smartindent
 * :Description: 实现类似vim的自动缩进, 以及用空格代替tab
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
 *       * - smartindent
 *         - option
 *         - 是否使用自动缩进
 *         - true
 *         - true | false
 *
 *       * - expandtab
 *         - option
 *         - 是否使用空格代替tab, 某些浏览器可能不支持此项
 *         - true
 *         - true | false
 *
 *       * - tabstop
 *         - option
 *         - 用多少个空格代替一个tab
 *         - 4
 *         - 正整数
 *
 *
 * 配合Elastic自动调整高度
 * -------------------------
 *
 * .. zarkfx:: :demo:
 *
 *     <textarea fx="smartindent elastic">  按下回车和tab键测试一下吧  哈哈</textarea>
 *
 * DOC_END
 * */

;(function(){
FX.register('smartindent', [], {
    smartindent:    true,
    expandtab:      true,
    tabstop:        4

}, function(attrs){
    var $this = $(this);

    if ( this.tagName === 'TEXTAREA' ) {

        $this.keydown(function(event){
            // 忽略选中了文本时的情况
            if ( this.selectionStart !== this.selectionEnd) {
                return true;
            };

            // 得到光标之前和之后的内容
            var left = $(this).val().substr(0, this.selectionStart);
            var right = $(this).val().substr(this.selectionStart);

            // 按下enter, 自动缩进
            if ( event.keyCode === 13 && attrs.smartindent ) {
                // 得到最后一行前面的空格
                var lines = left.split('\n');
                var last_line = lines[lines.length - 1];
                last_line += 'a';
                var space_count = last_line.length - $.trim(last_line).length;
                var space = last_line.substr(0, space_count);
                // 插入换行和空格
                $(this).val(left + '\n' + space + right);
                // 移动光标到新行首
                this.selectionStart = this.selectionEnd = (left + '\n' + space).length;
                return false;
            };

            // 按下tab替换为空格
            if ( event.keyCode === 9 && attrs.expandtab && attrs.tabstop > 0 ) {
                for (var i = 0; i < attrs.tabstop; i++) {
                    left += ' '
                };
                $this.val(left + right);
                this.selectionStart = this.selectionEnd = left.length;
                return false;
            };
        });
    };
});
})();
