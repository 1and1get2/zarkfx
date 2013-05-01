/*
 * DOC_BEGIN
 *
 * Position
 * ========
 *
 * 想把一个元素放到另一个元素的旁边？position用通俗的语法轻松做到这一点。
 *
 * 此fx基于
 * `jQuery UI Position Plugin <http://jqueryui.com/position/>`_.
 * 开发。
 *
 *
 * Options
 * -------
 *
 * :FX name: position
 * :Description: 把一个元素放在另一个元素的旁边
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
 *       * - target
 *         - optional
 *         - 当前元素所依靠的目标元素，若等于"mouse"表示跟随鼠标光标
 *         - null
 *         - jquery selector | mouse
 *
 *       * - myH
 *         - optional
 *         - 用当前元素水平的哪个位置去依靠另一个元素
 *         - center
 *         - left | center | right
 *
 *       * - atH
 *         - optional
 *         - 当前元素在水平位置上依靠在另一个元素的哪个位置
 *         - center
 *         - left | center | right
 *
 *       * - myV
 *         - optional
 *         - 用当前元素垂直的哪个位置去依靠另一个元素
 *         - center
 *         - top | center | bottom
 *
 *       * - atV
 *         - optional
 *         - 当前元素在垂直位置上依靠在另一个元素的哪个位置
 *         - center
 *         - top | center | bottom
 *
 *       * - collisionH
 *         - optional
 *         - 
 *         - flip
 *         - 
 *
 *       * - collisionV
 *         - optional
 *         - 
 *         - flip
 *         - 
 *
 *       * - wrapper
 *         - optional
 *         - 当前元素放在html文档中的哪个元素中
 *         - -
 *         - jquery selector
 *
 * :提示: 你还可以给myH、myV、atH、atV加上偏移量，比如 myH=left+10
 *
 * 把方块放在右边
 * -------------------------
 * 
 * my=left; at=right 表示把蓝块的左边靠在灰块的右边
 *
 * .. zarkfx:: :demo:
 *
 *      <div id="d1" style="width: 100px; height: 100px; background-color: grey;"> </div>
 *      <div fx="position[target=#d1; myH=left; atH=right; ]" style="width: 30px; height: 30px; background-color: blue; "> </div>
 *
 *
 * 把方块放在右内下角
 * -------------------------
 * 
 * .. zarkfx:: :demo:
 *
 *      <div id="d2" style="width: 100px; height: 100px; background-color: grey;"> </div>
 *      <div fx="position[target=#d2; myH=right; atH=right; myV=bottom; atV=bottom;]" style="width: 30px; height: 30px; background-color: blue; "> </div>
 *
 *
 * 红色方块跟随鼠标移动
 * -------------------------
 * 
 * .. zarkfx:: :demo:
 *
 *      <div fx="position[target=mouse; myH=left+3; atH=right; myV=bottom-3; atV=top;   ]" style="width: 30px; height: 30px; background-color: red; "> </div>
 *
 * DOC_END
 * */

;(function(){
FX.register('position', [ 'jqueryui-1.10.2/position' ], {            
    target      : null,
    myH         : 'center',
    atH         : 'center',
    myV         : 'center',
    atV         : 'center',
    collisionH  : 'flip',
    collisionV  : 'flip',
    wrapper     : ''

}, function(attrs){

    var $this = $(this);                 
    if (attrs.target){
        attrs.of = $(attrs.target);
        attrs.my = attrs.myH + ' ' + attrs.myV;
        attrs.at = attrs.atH + ' ' + attrs.atV;
        attrs.collision = attrs.collisionH + ' ' + attrs.collisionV;

        if (attrs.wrapper){
            $this.appendTo(attrs.wrapper);
        };

        if (attrs.target === 'mouse') {
            $( document ).mousemove(function( event ) {
                attrs.of = event;
                $this.position(attrs);
                $this.css('top', parseInt($this.css('top')) - $(document).scrollTop() );
            });
        }else{
            $this.css({position:'absolute'}).position(attrs);
        };

    };

});
})();
