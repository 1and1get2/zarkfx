/*
 * DOC_BEGIN
 *
 * Timecountdown
 * =========
 *
 * 你要组织的晚会、备战高考、需要倒计时么？
 *
 * 使用timecountdown可以轻松的实现倒计时的功能。
 *
 * 此fx由
 * `duoduo <http://my.oschina.net/duoduo3369/blog>`_
 * 开发。
 *
 * Options
 * --------------
 *
 * :FX name: timecountdown
 * :Description: 倒计时
 *
 * :时间字符串: 需要满足这样的格式:2013/12/25 15:00:00
 *
 * :模版字符串: template参数的类型是"模版字符串"，可以随意指定文字，例如:离高考还有{Day}天。字符串中用"{}"包裹的参数会被替换为具体的值。比如默认的template='{Day}天{hour}小时{minute}分'会被替换成具体的83天2小时29秒。模版中可以使用的参数有:Year,Month,Day,Hour,Minute,Second,month,day,hour,minute,second。大写的表示'总共'，例如'{year}年{month}月'会替换成1年5个月,'{year}年{Month}月',则会替换成1年17个月,当用大写参数时，保证大写参数是第一个，以之前的这个例子只要使用{Month}就可以指明还有17个月了。
 *
 * .. topic:: Arguments
 *
 *    .. list-table::
 *       :widths: 1 1 5 2 1
 *       :header-rows: 1
 *
 *       * - Param
 *         - R/O
 *         - Description
 *         - Default
 *         - Values
 *
 *       * - targetTime
 *         - required
 *         - 倒计时的目标时间,使用targetTime与用户的浏览器当前时间的差值来倒计时，如果用户浏览器时间不准确,倒计时时间会不正确
 *         - -
 *         - 时间字符串 
 *
 *       * - totalSeconds
 *         - optional
 *         - 离倒计时的目标时间的总秒数，优先级高于targetTime,如果设定了totalSeconds则targetTime失效。一般是服务器返回一次totalSeconds，这样可以避免用户浏览器时间不准确的问题
 *         - - 
 *         - 正整数
 *
 *       * - template
 *         - optional
 *         - 倒计时文字模版
 *         - {Day}天{hour}小时{minute}分
 *         - 模版字符串
 *
 *
 * 默认效果
 * -------------------------
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="timecountdown[targetTime=2021/12/26 20:00:00;]"></div>
 *
 * 使用totalSeconds
 * -------------------------
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="timecountdown[targetTime=2021/12/26 20:00:00;totalSeconds=150;]"></div>
 *
 * 自定义模板
 * -------------------------
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="timecountdown[targetTime=2021/12/20;template=离2021年12月20日还有{Year}年{month}月{day}天;]"></div>
 *
 * 自定义模板,精确到秒
 * -------------------------
 *
 * .. zarkfx:: :demo:
 *
 *      <div fx="timecountdown[targetTime=2021/6/7;template=离2021年高考还有{Day}天{hour}小时{minute}分钟{second};]"></div>
 * 
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
