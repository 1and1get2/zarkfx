FX.getFrame('jquery-1.3.2', function($){
    var show = function(hideStyle, $obj){
        if (hideStyle === 'display'){
            $obj.show();
        }else if(hideStyle === 'visibility'){
            $obj.css('visibility', 'visible');
        }
    };
    var hide = function(hideStyle, $obj){
        if (hideStyle === 'display'){
            $obj.hide();
        }else if(hideStyle === 'visibility'){
            $obj.css('visibility', 'hidden');
        }
    };

    var isHide = function(hideStyle, $obj){
        if (hideStyle === 'display'){
            return $obj.css('display') === 'none';
        }else if(hideStyle === 'visibility'){
            return $obj.css('visibility') === 'hidden';
        }
    };
    
    FX.register('toggle', [], function(attrs){

        var $this = $(this);
        if(attrs.target !== undefined){
            var toggleFunc = function(){
                $(attrs.target).each(function(){
                    if ( !isHide(attrs.hideStyle, $(this)) ){
                        hide(attrs.hideStyle, $(this));
                    }else{
                        show(attrs.hideStyle, $(this));
                    };
                });

                if (attrs.hideme) {
                    hide(attrs.hideStyle, $this);
                };

                if (attrs.hideid) {
                    hide(attrs.hideStyle, $('#'+attrs.hideid));
                };

                if (attrs.toggleHtml) {
                    if($this.html() === $.data(this, 'old_value')){
                        $this.html(attrs.toggleHtml);
                    }else{
                        $this.html($.data(this, 'old_value'));
                    };
                };
            }
            if (attrs.on === 'hover'){
                $this.bind('mouseover', toggleFunc).bind('mouseout', toggleFunc);
            }else{
                $this.bind(attrs.on, toggleFunc);
            };

            if (attrs.toggleHtml) {
                $.data(this, 'old_value', $this.html());
            };

        };

    }, {
        on: 'click',
        target: undefined,
        hideme: false,
        hideid: undefined,
        toggleHtml: undefined,
        hideStyle:    'display'
    });
});
