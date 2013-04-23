/*
 *
 * FX Demo
 * =======
 *
 * :FX name: fxdemo
 * :Description: This FX is used to show ZARKFX demos, and allows interaction.
 *
 * .. topic:: Arguments
 *
 *    .. list-table::
 *       :widths: 1 1 1 1 5
 *       :header-rows: 1
 *
 *       * - Param
 *         - R/O
 *         - Values
 *         - Default
 *         - Description
 *
 *       * - lazy
 *         - optional
 *         - true|false
 *         - true
 *         - If set to false, the initial result will not show
 *           until "Try it!" is clicked.
 *
 * Examples:
 * ---------
 *
 * Without lazy option:
 *
 * .. zarkfx:: :script:
 *
 *    <textarea fx="fxdemo">Some HTML here</textarea>
 *
 *
 * With lazy option:
 *
 * .. zarkfx:: :script:
 *
 *    <textarea fx="fxdemo[lazy]">Some HTML here</textarea>
 *
 *
 */

FX.getFrame("jquery-1.7.2", function($) {

    FX.register( "fxdemo", [], {
        style: 'default',
        lazy: false,

    }, function(attrs) {
        $(this).wrap('<div class="zarkfx_demo" />');
        $(this).before('<div class="label">Source (you can change it to try your ideas):</div>');
        var result = $('<div class="result" />');
        $(this).after(result);
        $(this).after('<div class="label" style="display:none">Result:</div>');
        var tryit = $('<button class="tryit">Try it!</button>');
        $(this).after(tryit);
        $(this).addClass("source");
        tryit.data("source", $(this));
        tryit.data("result", result);
        tryit.click(function(){
            $( ".label", $(this).parent() ).css("display", "");
            $(this).data("result").html( $(this).data("source").val() );
            $('['+FX.FX_NAME+']', $(this).data("result")).each(FX.enqueueFXElem);
            FX.runQueue();
        });
        if(!attrs["lazy"]) {
            setTimeout(function() {
                tryit.trigger("click");
            }, 10);
        };
    });

});
