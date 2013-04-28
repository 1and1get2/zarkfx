/*
 * DOC_BEGIN
 *
 * 你想让<textarea>根据文本长度自动调整高度?
 * 使用此fx轻松搞定。
 *
 * 此fx基于`jQuery Elastic Plugin<http://unwrongest.com/projects/elastic/>`_开发。
 *
 * Elastic
 * =============
 *
 * Options
 * --------------
 *
 * :FX name: 
 * :Description: 
 *
 *
 * 自动调整高度
 * ------------
 *
 * .. zarkfx:: :demo:
 *
 *      <textarea fx="elastic">
 *          试着在这里输入更多的文字看看
 *      </textarea>
 *
 * DOC_END
 * */


;(function(){
FX.register('elastic', [ 'elastic' ], {}, function(attrs){
    $(this).elastic();
});
})();
