/*
 *  <a fx="popvideo" href="http://player.youku.com/player.php/sid/XMzIwNzQyNzA0/v.swf" >
 *
 * */

;(function(){
FX.loadCSS(FX.CSS_PATH + 'fancybox/fancybox.css');

FX.register('popvideo', [ 'fancybox' ], function(attrs){
    $(this).fancybox({
        'padding'           : 0,
        'autoScale'         : false,
        'transitionIn'      : 'none',
        'transitionOut'     : 'none',
        'overlayOpacity'    : 0.8,
        'hideOnOverlayClick': false
    });

}, {});

})();
