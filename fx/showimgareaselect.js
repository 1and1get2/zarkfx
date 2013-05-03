;(function(){
FX.register('showimgareaselect', [], {
    values          : undefined,
    width           : 100,
    height          : 100

}, function(attrs) {
    var $this = $(this),
        $wrapper = $this.closest('div');
    attrs.values = attrs.values.split(' ');
    var a = attrs.values[0],
        b = attrs.values[1],
        c = attrs.values[2],
        d = attrs.values[3],
        width = attrs.width,
        height = attrs.height;

    $this.appendTo($wrapper);
    $wrapper.css({
        overflow: 'hidden',
        margin: 'auto',
        width: width,
        height: height
    });
    
    $this.hide().bind('load', function(){
        $this.css({
            marginLeft: Math.round(-width * a / c),
            marginTop: Math.round(-height * b / d),
            width: Math.round( width / c * $this.width() ),
            height: Math.round( height / d * $this.height() ),
            display: 'inline'
        }).show();;
    }).load();

});
})();
