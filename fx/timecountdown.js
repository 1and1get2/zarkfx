/*
 * DOC_BEGIN
 *
    year,Month,Day,Hour,Minute,Second,month,day,hour,minute,second
    
 * DOC_END
 * */

;(function(){
FX.register('timecountdown', [  ], {            
    targetTime   : '',
    totalSeconds  : '',
    style        : 'none',
    template     : '{Day}天{hour}小时{minute}分'

}, function(attrs){
    var $this = $(this);
    var intervalTime = 1000;
    var distanceTime;
    if(attrs.totalSeconds){
        distanceTime = attrs.totalSeconds * 1000;
    }else{
        var now = new Date();
        var endDate = new Date(attrs.targetTime);
        distanceTime = endDate - now ;
    }
    
    var countdown = function(){
        distanceTime -= intervalTime;
        var distance = distanceTime;
        var year,Month,Day,Hour,Minute,Second,month,day,hour,minute,second;
        year=Month=Day=Hour=Minute=Second=month=day=hour=minute=second=0;
        if(distance > 0){
            year = Math.floor(distance / (1000*60*60*24*365));
            Month  = Math.floor(distance / (1000*60*60*24*30));
            Day = Math.floor(distance / (1000*60*60*24));
            Hour = Math.floor(distance / (1000*60*60));
            Minute = Math.floor(distance / (1000*60));
            Second = Math.floor(distance / 1000);

            distance -= year * (1000*60*60*24*365);
            month = Math.floor(distance / (1000*60*60*24*30));

            distance -= month * (1000*60*60*24*30);
            day = Math.floor(distance / (1000*60*60*24));

            distance -= day * (1000*60*60*24);
            hour = Math.floor(distance / (1000*60*60));

            distance -= hour * (1000*60*60);
            minute = Math.floor(distance / (1000*60));
           
            distance -= minute * (1000*60);
            second = Math.floor(distance / 1000);
        }

        resultStr = attrs.template;
        
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
    window.setInterval(countdown,intervalTime);
});
})();
