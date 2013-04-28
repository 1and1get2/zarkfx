// http://jqueryui.com/demos/position/#events


;(function(){
FX.register('position', [ 'jqueryui-1.10.2' ], {            
    my       : 'center',
    at       : 'center',
    offset   : null,
    collision  : 'flip',
    target   : null,
    appendToBody: true

}, function(attrs){

    var $this = $(this);                 
    if (attrs.target){
        attrs.of = $(attrs.target);
        if (attrs.appendToBody){
            $this.appendTo('body');
        }
        $this.css({position:'absolute'}).position(attrs);
    }

});
})();
