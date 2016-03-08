/**
 * Created by wangmin on 16/3/6.
 */




var navtives={};

[
    function apply_sms_code(value){
        var self = this;
        //验证码${code}，您正在注册成为${product}用
        value.smsCode||(value.smsCode = (Math.random()+'').slice(2,6));
        //泡泡亲子游',sms_template_code:'SMS_1645003'
        var data ={code:value.smsCode,product:'王敏测试项目'}
        var p =self.busi.openAli.sendSms.call(self,value.mobile,'SMS_1295060',data);
        return p;
    }

].forEach(function (item) {
        navtives[item.name] = item;
    });

exports=module.exports=navtives;
