/*
 * DOC_BEGIN
 *
 * img Area Select
 * ===============
 *
 * 图片区域选择工具，常用于用户头像裁剪等。可以使用此fx让用户在前端选择图片的区域，然后把选择值(4个整数)保存在一个input里，再发给服务器端处理。
 *
 * 此fx由Sparker5团队基于
 * `imgAreaSelect <http://odyniec.net/projects/imgareaselect/>`_.
 * 开发。
 *
 * 提示，假设你使用此fx得到的四个值分别为a b c d，那么你可以在linux服务器中使用convert程序用如下的命令裁剪图片:
 *
 * convert source.jpe -crop cxd+a+b saved.jpg
 *
 * Options
 * --------------
 *
 * :FX name: imgareaselect
 * :Description: 前端图片裁剪区域的选择，所有值均为可选的
 *
 * .. topic:: Arguments
 *
 *    .. list-table::
 *       :widths: 1 5 1 2
 *       :header-rows: 1
 *
 *       * - Param
 *         - Description
 *         - Default
 *         - Values
 *
 *       * - style
 *         - 选择框的样式
 *         - default
 *         - default | animated | deprecated
 *
 *       * - preview
 *         - 预览选中区域的图片
 *         - -
 *         - jquery selector
 *
 *       * - valueElement
 *         - 保存选择区域的值，可以指定一个type=hidden的input，结果值由4个数字组成
 *         - -
 *         - jquery selector
 *
 *       * - aspectRatio
 *         - 选择区域的固定比例，比如4:3
 *         - -
 *         - 两个正整数之比
 *
 *       * - handles
 *         - 是否在选择区域的周边显示拖动提示的小方块
 *         - true
 *         - true | false
 *
 *       * - x1
 *         - 默认选中的水平起始位置
 *         - 0
 *         - 正整数
 *
 *       * - y1
 *         - 默认选中的垂直起始位置
 *         - 0
 *         - 正整数
 *
 *       * - x2
 *         - 默认选中的水平结束位置，必须大于x1
 *         - 100
 *         - 正整数
 *
 *       * - y2
 *         - 默认选中的水平结束位置，必须大于y1
 *         - 100
 *         - 正整数
 *
 *       * - foursquare
 *         - 选择区域是否固定为正方形，使用此参数时aspectRatio参数无效
 *         - false
 *         - true | false
 *
 *       * - hide
 *         - 初始状态下是否隐藏选中区域
 *         - false
 *         - true | false
 *
 *       * - keys
 *         - 是否允许使用键盘微调选中区域
 *         - true
 *         - true | false
 *
 *       * - fadeSpeed
 *         - 当选择区域消失时，fade效果的speed。false表示无fade效果
 *         - false
 *         - false | 正整数
 *
 *       * - autoHide
 *         - 是否在选中区域后自动隐藏选择区以及遮罩层
 *         - false
 *         - true | false
 *
 *       * - maxHeight
 *         - 选择区域最大高度
 *         - -
 *         - 正整数
 *
 *       * - maxWidth
 *         - 选择区域最大宽度
 *         - -
 *         - 正整数
 *
 *       * - minHeight
 *         - 选择区域最小高度
 *         - -
 *         - 正整数
 *
 *       * - minWidth
 *         - 选择区域最小宽度
 *         - -
 *         - 正整数
 *
 *       * - movable
 *         - 选中后，是否可以移动选择框
 *         - true
 *         - true | false
 *
 *       * - wrapper
 *         - 选择框在html文档中的父层元素，通常这个值是必须修改的，见样例
 *         - body
 *         - jquery selector
 *
 *       * - persistent
 *         - 是否禁止通过点击选中区域旁边的位置重新开始选择
 *         - false
 *         - true | false
 *
 *       * - resizable
 *         - 选中后，是否还可以拖动改变尺寸
 *         - true
 *         - true | false
 *
 *       * - resizeMargin
 *         - 选中区域的边框多少像素以内均可以点击拖动？数值越大越容易点中
 *         - 10
 *         - 正整数
 *
 *       * - zIndex
 *         - 选择区域div的zIndex值
 *         - 0
 *         - 正整数
 *
 * 预览选中区域
 * -------------------------
 *
 * 点击“查看样例1”打开新页面一边拖动选择框一边观察选中值吧。
 *
 * 样例1的代码如下
 *
 * <div id="w1" style="position: relative;" style="width: 300px; height: 300px;" > </div>
 *
 * <img src="/_static/demo/imgareaselect/flower2.jpg" fx="imgareaselect[preview=#preview;#valueElement=value; wrapper=#w1;]"/>
 *
 * <div id="preview" style="width:100px; height:100px;"></div>
 *
 * <input id="value" type="text" autocomplete="off" />
 *
 * .. zarkfx:: :demo:
 *
 *     <a href="/_static/demo/imgareaselect/demo1.html" target="_blank" >查看样例1</a>
 *
 * 固定选择区域的尺寸
 * -------------------------
 *
 * 样例2的代码如下
 *
 * <div id="w2" style="position: relative;" style="width: 300px; height: 300px;" > </div>
 *
 * <img src="/_static/demo/imgareaselect/flower2.jpg" fx="imgareaselect[x2=150; y2=100; resizable=false; persistent=true; handles=false; parent=w2; ]"/>
 *
 * .. zarkfx:: :demo:
 *
 *     <a href="/_static/demo/imgareaselect/demo2.html" target="_blank" >查看样例2</a>
 *
 *
 * 不在服务器端裁剪图片也能仅显示选中区域
 * --------------------------------------------
 *
 * 假设你已经使用imgareaselect得到了一个选择区域，值为80 80 100 100，那么你可以把这个值传给showimgareaselect fx，这样就不用在服务器端裁剪图片了。
 *
 * 这样使用的优点是简单，方便。缺点是用户不得不加载完整图片，不宜在一个页面中大量使用。
 *
 * 注意img外面的div标签是必须有的。
 *
 * 样例2的代码如下
 *
 * <div>
 *
 *     <img fx="showimgareaselect[values=80 80 100 100; width=50; height=50;]" src="/_static/demo/imgareaselect/flower2.jpg" />
 *
 * </div>
 *
 * .. zarkfx:: :demo:
 *
 *     <a href="/_static/demo/imgareaselect/demo3.html" target="_blank" >查看样例3</a>
 *
 * DOC_END
 * */


;(function(){
FX.register('imgareaselect', [ 'imgareaselect' ], {
    style           : 'default',
    preview         : undefined,
    valueElement    : undefined,
    aspectRatio     : undefined,
    handles         : true,
    x1              : 0,
    y1              : 0,
    x2              : 100,
    y2              : 100,
    foursquare      : false,
    hide            : false,
    keys            : true,
    fadeSpeed       : false,
    autoHide        : false,
    maxHeight       : undefined,
    maxWidth        : undefined,
    minHeight       : undefined,
    minWidth        : undefined,
    movable         : true,
    wrapper         : 'body',
    persistent      : false,
    resizable       : true,
    resizeMargin    : 10,
    zIndex          : 0

}, function(attrs) {

    var $this = $(this);
    var change_functions = [];

    if(attrs.preview){
        var $preview = $(attrs.preview);
        $('<img/>').attr('src',$(this).attr('src')).css({display:'inline'}).appendTo(attrs.preview);
        $preview.css({overflow:'hidden', margin:'auto'});

        change_functions.push(function(img, selection){
            if ( !! selection.width && !! selection.height) {
                var e = $preview.width() / selection.width,
                    f = $preview.height() / selection.height;
                $("img", $preview).css({
                    width: Math.round(e * $this.width()),
                    height: Math.round(f * $this.height()),
                    marginLeft: -Math.round(e * selection.x1),
                    marginTop: -Math.round(f * selection.y1)
                });
            };
        });
    };

    if(attrs.valueElement){
        var $value = $(attrs.valueElement);
        change_functions.push(function(img, selection){
            $value.val(selection.x1 + " " + selection.y1 + " " + selection.width + " " + selection.height);
        });
        var values = $value.val().split(' ');
        if (values.length === 4){
            if (!attrs.x1) attrs.x1 = parseInt(values[0]);
            if (!attrs.x2) attrs.x2 = attrs.x1 + parseInt(values[2]);
            if (!attrs.y1) attrs.y1 = parseInt(values[1]);
            if (!attrs.y2) attrs.y2 = attrs.y1 + parseInt(values[3]);
        };
    };

    if(attrs.foursquare) {
        attrs.aspectRatio = "1:1";
        delete attrs.foursquare;
    }else if(!attrs.aspectRatio){
        delete attrs.aspectRatio;
    };
    attrs.parent = attrs.wrapper;
    delete attrs.wrapper;

    if(attrs.aspectRatio){
        var w = parseInt(attrs.aspectRatio.split(':')[0]),
            h = parseInt(attrs.aspectRatio.split(':')[1]);
        attrs.y2 = Math.round(attrs.y1 + (attrs.x2-attrs.x1) * h / w);
    };

    attrs.onSelectChange = function(img, selection){
        for(var i in change_functions){
            change_functions[i](img, selection);
        };
    };
    attrs.onSelectBegin = attrs.onSelectChange;
    attrs.onSelectEnd = attrs.onSelectChange;
    attrs.onInit = attrs.onSelectChange;

    // 偏一修正, 如果没有这个修正, 那么得到的attrs.x2可能会超过真正的宽度
    if ($this.width() > attrs.x1){ //某些浏览器下, $this.width()可能为0
        attrs.x2 = Math.min(attrs.x2, $this.width());
    }
    if ($this.height() > attrs.y1){ //某些浏览器下, $this.height()可能为0
        attrs.y2 = Math.min(attrs.y2, $this.height());
    }

    // 修正, 要求x2 y2要比x1 y1大
    attrs.x2 = Math.max(attrs.x2, attrs.x1 + 1);
    attrs.y2 = Math.max(attrs.y2, attrs.y1 + 1);

    $this.imgAreaSelect(attrs);

});
})();
