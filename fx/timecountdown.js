/*
 * DOC_BEGIN
 *
    Year         : false,
    Month        : false,
    Day          : false,
    Hour         : false,
    Minute       : false,
    Second       : false,
    month        : false, 
    day          : false,
    hour         : false,
    minute       : false,
    second       : false,
 * DOC_END
 * */

;(function(){
FX.register('timecountdown', [  ], {            
    targetTime   : '',
    style        : 'none',
    template     : '{Day}天{hour}小时{minute}分'

}, function(attrs){
    //年的话有1种  1年
    //月之后的都有2种      1年5月 17月
    //yyMMdd
    //yy-mm-dd hh-mm-ss
    //MM-dd hh
    var $this = $(this);
    
    var countdown = function(){
        var now = new Date();
        var endDate = new Date(attrs.targetTime);
        var distance = endDate - now ;
        var   year = Math.floor(distance / (1000*60*60*24*365));
        var  Month = Math.floor(distance / (1000*60*60*24*30));
        var    Day = Math.floor(distance / (1000*60*60*24));
        var   Hour = Math.floor(distance / (1000*60*60));
        var Minute = Math.floor(distance / (1000*60));
        var Second = Math.floor(distance / 1000);

        distance -= year * (1000*60*60*24*365);
        var month = Math.floor(distance / (1000*60*60*24*30));

        distance -= month * (1000*60*60*24*30);
        var day = Math.floor(distance / (1000*60*60*24));

        distance -= day * (1000*60*60*24);
        var hour = Math.floor(distance / (1000*60*60));

        distance -= hour * (1000*60*60);
        var minute = Math.floor(distance / (1000*60));
       
        distance -= minute * (1000*60);
        var second = Math.floor(distance / 1000);

        var resultStr = attrs.template;
        
        resultStr = resultStr.replace(/{Year}/g,year);
        resultStr = resultStr.replace(/{Month}/g,Month);
        resultStr = resultStr.replace(/{Day}/g,Day);
        resultStr = resultStr.replace(/{Hour}/g,Hour);
        resultStr = resultStr.replace(/{Minute}/g,Minute);
        resultStr = resultStr.replace(/{Second}/g,Second);
        resultStr = resultStr.replace(/{month}/g,month);
        resultStr = resultStr.replace(/{day}/g,day);
        resultStr = resultStr.replace(/{hour}/g,hour);
        resultStr = resultStr.replace(/{minute}/g,minute);
        resultStr = resultStr.replace(/{second}/g,second);
        $($this).html(resultStr);
    }
    window.setInterval(countdown,1000);
});
})();
