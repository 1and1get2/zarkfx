/*
 * DOC_BEGIN
 *
 * DD Belated PNG
 * ==================
 *
 * 你想让png图片在ie6、ie7下也是半透明的？使用传统的css方案是做不到的，因此不得不借助js来实现。
 * 只需在你的img或div元素中使用fx="ddpng"即可实现png图片在ie6、7下的半透明效果。
 *
 * 但是根据实际项目经验，所有类似的png修复工具并不能100%地完美工作，你会发现有时不知道为什么就是无法让png图片半透明，或者当png图片过多时浏览器就会变卡等
 * 如果在你的项目中出现类似情况，我们建议你先尝试使用其它png修复的fx，如果还是不能解决你的问题的话，建议放弃...
 *
 * 此fx基于`DD_belatedPNG<http://www.dillerdesign.com/experiment/DD_belatedPNG/>`_开发，仅在ie6、ie7下加载ddpng插件并运行
 *
 * 
 * Options
 * --------------
 *
 * :FX name: cycle
 * :Description: 多张图片或多个div轮播
 * :Options: 无可选参数
 *
 * 让图片半透明
 * ------------
 *
 * 请用IE6查看效果
 *
 * .. zarkfx:: :demo:
 *
 *     <img fx="ddpng" src="/_static/demo/ddpng/boxbg2.png" />
 *
 *
 * 让div的背景图半透明
 * -------------------
 *
 * 请用IE6查看效果
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="ddpng" style="background: url(/_static/demo/ddpng/boxbg2.png) top left no-repeat transparent; width:80px; height:80px;" ></div>
 *
 * DOC_END
 *
 */

;(function(){
FX.register('ddpng', [], {}, function(attrs){
    if($.browser.msie && $.browser.version < 8){
        try { document.execCommand("BackgroundImageCache", false, true); }
        catch (err) {};
        FX.readyJs(['ddpng'], function(){
            DD_belatedPNG.fixPng(this);
        });
    };
});
})();
