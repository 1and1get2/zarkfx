/*
 *
 * DOC_BEGIN
 *
 * Cycle
 * =====
 *
 * This FX provides a packaged
 * `jQuery Cycle Plugin <http://jquery.malsup.com/cycle/>`_.
 *
 * 原参数文档见: http://www.malsup.com/jquery/cycle/options.html
 *
 * Usage(style 1)
 * --------------
 *
 * .. js:function:: cycle(fx=fade[,timeout=4000,blabla])
 *
 *    Description here.
 *
 *    :param required fx: (fade|shuffle|blabla)
 *
 *       Cycle method, see :ref:`cycle-example1`
 *
 *    :param optional timeout: non-negative integer
 *
 *       Cycle interval
 *
 *    :param optional blabla:
 *
 *       blabla
 *
 * Usage(style 2)
 * --------------
 *
 * :FX name: cycle
 * :Description: Description here
 * :Others: Any other information
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
 *       * - fx
 *         - required
 *         - fade|shuffle|others
 *         - fade
 *         - Cycle method, see :ref:`cycle-example1`
 *
 *       * - timeout
 *         - optional
 *         - non-negative integer
 *         - 4000
 *         - Cycle interval
 *
 *       * - blabla
 *         - optional
 *         - blabla
 *         -
 *         - blabla
 *
 * .. _cycle-example1:
 *
 * Example 1
 * ---------
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="cycle[fx=fade;timeout=100]">
 *         <img src="http://cloud.github.com/downloads/malsup/cycle/beach1.jpg" width="200" height="200" />
 *         <img src="http://cloud.github.com/downloads/malsup/cycle/beach2.jpg" width="200" height="200" />
 *         <img src="http://cloud.github.com/downloads/malsup/cycle/beach3.jpg" width="200" height="200" />
 *     </div>
 *
 * Example 2
 * ---------
 *
 * .. zarkfx:: :demo:
 *
 *     <script type="text/javascript">
 *         var params_as_var = {
 *             fx:"shuffle",
 *             timeout:5000,
 *         }
 *     </script>
 *
 *     <div fx="cycle[fx_var=params_as_var]">
 *         <img src="http://cloud.github.com/downloads/malsup/cycle/beach1.jpg" width="200" height="200" />
 *         <img src="http://cloud.github.com/downloads/malsup/cycle/beach2.jpg" width="200" height="200" />
 *         <img src="http://cloud.github.com/downloads/malsup/cycle/beach3.jpg" width="200" height="200" />
 *     </div>
 *
 * DOC_END
 *
 */

// 如果要让cycle默认不滚动, 把timeout设置为0即可

FX.getFrame('jquery-1.3.2', function($) {

    FX.register('cycle', [ ['js', 'cycle'] ], function(attrs) {

        if(!attrs["fx_var"]) {
            $(this).cycle(attrs);
        } else {
            eval("$(this).cycle(" + attrs["fx_var"] + ")");
        };

    }, {
        fx_var: undefined,
        timeout: 0,
        speed:  1000,
        pause:  0 // hover时暂停

    });

});
