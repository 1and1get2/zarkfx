/*
 *
 *
 * DD_belatedPNG
 * =============
 *
 * 让IE6下的PNG图片半透明,请用IE6预览本效果. (本FX基于 `DD_belatedPNG <http://www.dillerdesign.com/experiment/DD_belatedPNG/>`_ 开发)
 *
 * 让图片半透明
 * ------------
 * fx="ddpng"
 *
 * .. zarkfx:: :demo:
 *
 *     <img fx="ddpng" src="/_static/static/img/ddpng/boxbg2.png" />
 *
 * 让div的背景图半透明
 * -------------------
 * fx="ddpng"
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="ddpng" style="background: url(/_static/static/img/ddpng/boxbg2.png) top left no-repeat transparent; width:80px; height:80px;" ></div>
 *
 *
 *
 */


try { document.execCommand("BackgroundImageCache", false, true); }
catch (err) {};

FX.getFrame('jquery-1.3.2', function($){

    FX.register('ddpng', [ 'detect', 'ddpng' ], {}, function(attrs){
        if(FX.detect.browser === 'IE' && FX.detect.version === 6){
            DD_belatedPNG.fixPng(this);
        };
    });
});
