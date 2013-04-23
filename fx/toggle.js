/*
 * DOC_BEGIN
 *
 * Toggle
 * ====================
 *
 * 你想点击某个按钮让某些元素在"显示"和"隐藏"两种状态之间交替切换？
 * 比如点击一个按钮后展开某个div，再次点击后隐藏这个div。
 *
 * 你还想把这些按钮和元素放在页面的任意地方？
 * 使用toggle fx可以轻松实现这些非常常见的需求。
 *
 * 想实现鼠标放上去显示某个div，鼠标移开后隐藏div？使用on=hover即可。
 *
 * 如果你希望点击按钮后改变按钮的文字, 比如此按钮为“显示”，那么你希望点击后文字变成“隐藏”？那么使用toggleHtml参数即可。
 *
 * 本fx由Sparker5团队原创开发。
 *
 *
 * Usage
 * --------------
 *
 * :FX name: toggle
 * :Description: 用开关控制元素显示或隐藏
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
 *         - require
 *         - 在“显示”和“隐藏”之间切换的元素
 *         - -
 *         - css选择器
 *
 *       * - on
 *         - optional
 *         - 触发事件
 *         - click
 *         - click | hover | mouseover | dblclick
 *
 *       * - hide
 *         - optional
 *         - 被隐藏的元素，第二次触发开关时不会被显示
 *         - -
 *         - css 选择器
 *
 *       * - show
 *         - optional
 *         - 被显示的元素，第二次触发开关时不会被隐藏
 *         - -
 *         - css 选择器
 *
 *       * - toggleHtml
 *         - optional
 *         - 触发此开关时交替替换的文字
 *         - -
 *         - 字符串
 *
 *       * - tr
 *         - optional
 *         - 切换效果，默认无效果
 *         - -
 *         - fade
 *
 *       * - speed
 *         - optional
 *         - 仅在tr等于fade时有效，表示fade切换速度
 *         - normal
 *         - slow | normal | fast | 任意单位毫秒的正整数
 *
 *       * - hideThis
 *         - optional
 *         - 是否在触发开关后隐藏自己
 *         - false
 *         - true | false
 *
 *       * - hideWay
 *         - optional
 *         - display表示不占位的普通隐藏，visibility表示占位的隐藏
 *         - display
 *         - display | visibility
 *
 * 点击按钮让div显示或隐藏
 * -----------------------------------
 *
 *  使用了toggleHtml参数修改了p标签的文字
 *
 * .. zarkfx:: :demo:
 *
 *     <p fx="toggle[target=#div1;toggleHtml=隐藏;]" >显示</p>
 *
 *     <div id="div1" style="display: none;">more informations</div>
 *
 * 鼠标放上去显示，鼠标移开隐藏
 * --------------------------------------
 *
 *  注意，使用了hideWay=visibility，表示被隐藏的元素其实是占位的，并没有真正的hide掉
 *
 * .. zarkfx:: :demo:
 *
 *     <p fx="toggle[target=#div2;on=hover;hideWay=visibility;]" >鼠标上来</p>
 *
 *     <div id="div2" style="visibility: hidden;">好了，你可以下去了</div>
 *
 *
 * 点击后自己消失，并使用fade效果
 * -----------------------------------
 *
 *  div中安放了一个恢复按钮，使用了多个target值
 *
 * .. zarkfx:: :demo:
 *
 *     <p id="switch3" fx="toggle[show=#div3;tr=fade;hideThis]" >点我,我就消失</p>
 *
 *     <div id="div3" style="display: none;">
 *         <p fx="toggle[target=#div3, #switch3; tr=fade;]">点我恢复</p>
 *     </div>
 *
 * DOC_END
 *
 * */

FX.getFrame('jquery-1.7.2', function($){
    FX.register('toggle', [], {
        target:         '',
        on:             'click',
        hide:           '',
        show:           '',
        toggleHtml:     '',
        tr:             '',
        speed:          'normal',
        hideThis:       false,
        hideWay:        'display'

    }, function(attrs){

        var show = function($obj){
            if (attrs.hideWay === 'display'){
                if (attrs.tr === 'fade'){
                    $obj.fadeIn(attrs.speed);
                }else{
                    $obj.show();
                };
            }else if(attrs.hideWay === 'visibility'){
                if (attrs.tr === 'fade'){
                    $obj.stop().animate({
                        visibility: 'visible'
                    });
                }else{
                    $obj.css('visibility', 'visible');
                };
            }
        };
        var hide = function($obj){
            if (attrs.hideWay === 'display'){
                if (attrs.tr === 'fade'){
                    $obj.fadeOut(attrs.speed);
                }else{
                    $obj.hide();
                };
            }else if(attrs.hideWay === 'visibility'){
                if (attrs.tr === 'fade'){
                    $obj.stop().animate({
                        visibility: 'hidden'
                    });
                }else{
                    $obj.css('visibility', 'hidden');
                };
            }
        };
        var isHide = function($obj){
            if (attrs.hideWay === 'display'){
                return $obj.css('display') === 'none';
            }else if(attrs.hideWay === 'visibility'){
                return $obj.css('visibility') === 'hidden';
            }
        };
    
        var $this = $(this);
        var switchFunc = function(){
            // 改变target的显示或隐藏效果
            $(attrs.target).each(function(){
                if ( isHide($(this)) ){
                    show($(this));
                }else{
                    hide($(this));
                };
            });
            
            if (attrs.hide) { hide($(attrs.hide)); };
            if (attrs.show) { show($(attrs.show)); };
            if (attrs.hideThis) { hide($this); };
            if (attrs.toggleHtml) {
                if($this.html() === $.data(this, 'old_value')){
                    $this.html(attrs.toggleHtml);
                }else{
                    $this.html($.data(this, 'old_value'));
                };
            };
        }; // End switchFunc

        if (attrs.on === 'hover') {
            $this.bind('mouseover', switchFunc).bind('mouseout', switchFunc);
        }else{
            $this.bind(attrs.on, switchFunc);
        };

        if (attrs.toggleHtml) {
            $.data(this, 'old_value', $this.html());
        };

    });
});
