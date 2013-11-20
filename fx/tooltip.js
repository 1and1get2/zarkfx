/*
 * DOC_BEGIN
 *
 
 * DOC_END
 * */

;(function(){
FX.register('tooltip', [ 'jqueryui-1.10.2/tooltip' ], {            
    target       : null,
    style        : 'none',
    content      : '',
    disabled     : false,
    hide         : 'center',
    atV          : 'center',
    collisionH   : 'flip',
    collisionV   : 'flip',
    wrapper      : ''

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
