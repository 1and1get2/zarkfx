/*
 * DOC_BEGIN
 *
    explode,blind,bounce,clip,drop,fade,fold,highlight,puff,pulsate,scale,shake,slide
 * DOC_END
 * */

;(function(){
FX.register('tooltip', [ 'jqueryui-1.10.2','jqueryui-1.10.2/position','jqueryui-1.10.2/tooltip' ], {  
    style        : 'smoothness',
    content      : '',
    tr           : 'fade',
    duration     : 300,
    myH          : 'left',
    atH          : 'left',
    myV          : 'center+30',
    atV          : 'center',
    collisionH   : 'flip',
    collisionV   : 'flip'

}, function(attrs){
    var $this = $(this);  
    
    if(attrs.tr){
        attrs.hide = {"effect":attrs.tr,"duration":attrs.duration};
    }
    
    if(attrs.myH || attrs.atH || attrs.myV || attrs.atV || attrs.collisionH|| attrs.collisionV){
        attrs.position = {
            "of":$this,
            "my":attrs.myH + ' ' + attrs.myV,
            "at":attrs.atH + ' ' + attrs.atV,
            "collision":attrs.collisionH + ' ' + attrs.collisionV
        }
    }
    $($this).tooltip(attrs);
    
});
})();
