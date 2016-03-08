/**
 * Created by wangmin on 16/3/7.
 */


var navtives={};

[
    function apply_sms_code1(mobile,message){
        var self = this;
        var p = self.lib.sms.sendVerifyCode.call(self,{mobile:mobile,message:message})
            .then(function(){
                //save redis， 1200s短信验证码失效 ,key =sms:13757112343
                var key =['sms',mobile].join(pot);
                var client =self.redis.get.call(self,rdb);
                client.set(key,message,'EX','120000');
                return {info: {smsCode:message,username:mobile }};
            });
        return p;
    }

].forEach(function (item) {
        navtives[item.name] = item;
    });

exports=module.exports=navtives;
