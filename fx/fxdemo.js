/*
 * DOC_BEGIN
 *
 * FX Demo
 * =======
 *
 * 你想在开发中调试zarkfx? 你想在你的网页中输入fx代码然后立刻查看效果？
 *
 * 给你的textarea添加一个fxdemo即可。
 * zarkfx的官方文档页面就使用了fxdemo，所以你可以在一边查看文档时一边修改代码并尝试。
 *
 * Options
 * ---------
 *
 * :FX name: fxdemo
 * :Description: 用于前端调试fx
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
 *       * - lazy
 *         - optional
 *         - 如果为true，则textarea中的代码不会立刻执行，需要点击try按钮
 *         - false
 *         - true | false
 *
 *       * - style
 *         - optional
 *         - 调试样式，暂不支持其它值
 *         - default
 *         - default
 *
 * 使用fxdemo执行textarea中的代码
 * -------------------------------
 *
 * 下面这个textarea标签的源代码为：
 *
 *    <textarea fx="fxdemo">
 *      <input type="text" value="我原本是没有生命的" fx="focusclean" />
 *    </textarea>
 *
 * 因为我们给textarea标签添加了fxdemo，所以textarea中的文本被执行了，生成了一个input标签
 *
 * .. zarkfx:: :script:
 *
 *    <textarea fx="fxdemo">
 *      <input type="text" value="我原本是没有生命的" fx="focusclean" />
 *    </textarea>
 *
 *
 * 当用户点击try按钮后再执行代码
 * -------------------------------
 *
 * 下面这个textarea标签的源代码为：
 *
 *    <textarea fx="fxdemo[lazy]">
 *      <input type="text" value="我是用上面textarea中的代码生成的" fx="focusclean" />
 *    </textarea>
 *
 * 因为使用了lazy参数，所以textarea中的代码不会立刻没执行，点击try按钮试试
 *
 * .. zarkfx:: :script:
 *
 *    <textarea fx="fxdemo[lazy]">
 *      <input type="text" value="我原本是不存在的" fx="focusclean" />
 *    </textarea>
 *
 *
 * DOC_END
 */


;(function(){
FX.register( "fxdemo", [], {
    style   : 'default',
    lazy    : false

}, function(attrs) {
    $(this).wrap('<div class="zarkfx_demo" />');
    var result = $('<div class="result" />');
    $(this).after(result);
    var tryit = $('<button class="zarkfx_fxdemo_tryit">Try it!</button>');
    $(this).after(tryit);
    $(this).after('<br/>');
    tryit.data("source", $(this));
    tryit.data("result", result);
    tryit.data("children", result.find('> *'));
    tryit.click(function(){
        // delete old fx
        if ($(this).data("children")){
            $(this).data("children").remove();
        };
        var children = $($(this).data("source").val());
        $(this).data("children", children);
        children.appendTo($(this).data("result"));
        $('['+FX.FX_NAME+']', $(this).data("result")).each(FX.enqueueFXElem);
        FX.runQueue();
    });

    if(!attrs["lazy"]) {
        setTimeout(function() {
            tryit.trigger("click");
        }, 10);
    };
});
})();
