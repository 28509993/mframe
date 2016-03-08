/**
 * Created by wangmin on 16/3/7.
 */

var crypto = require('crypto')
    ,http = require('http')
    , util = require('util')

var certificat= {app_key:'xxxxx',secret:'xxxxxxxx'}

var smsTemplates={
    SMS_1295060:{sms_free_sign_name:'注册验证',sms_template_code:'SMS_1295060'},
    SMS_1645003:{sms_free_sign_name:'测试产品',sms_template_code:'SMS_1645003'}
}


function sign (params, secret) {
    var str= secret;
    Object.keys(params).sort().forEach(function(k){
        str += k + params[k];
    });
    str += secret;
    var buff = new Buffer(str, 'utf8')
    var result = crypto.createHash("md5")
        .update(buff)
        .digest("hex").toUpperCase();
    return result;
}


var navtives={};

[
    function sendSms(mobile,templateId,data){
        var self = this;
        var smsTemplate =smsTemplates [ templateId];
        var smsData =  {
            app_key:certificat.app_key,
            format : 'json',
            method : 'alibaba.aliqin.fc.sms.num.send',
            //partner_id : 'top-sdk-java-20151020',
            rec_num : mobile||'13757112343',
            sign_method : 'md5',
            sms_type : 'normal',
            sms_param :  JSON.stringify(data||{})        ,// '{"code":"1234", "product":"Demo"}',
            sms_free_sign_name : smsTemplate.sms_free_sign_name,
            sms_template_code :smsTemplate.sms_template_code,
            v : '2.0',
            timestamp : new Date().format() //'2015-10-20 20:41:05'
        }
        smsData.sign= sign(smsData,certificat.secret);
        var post_data = self.lib.queryString (smsData);
        post_data =post_data
        var options = {
            host: "gw.api.taobao.com",
            path: "/router/rest",
            method: "POST",
            headers:{
                'Content-Type':"application/x-www-form-urlencoded;charset=utf-8",
                'Content-Length':post_data.length,
                'User-Agent':"SpaceTimeApp2.0",
                'Keep-Alive':true,
                'timeout':300000
            }
        };

        ////
        //{
        //    "alibaba_aliqin_fc_sms_num_send_response":{
        //    "result":{
        //        "err_code":"0",
        //            "model":"134523^4351232",
        //            "success":false,
        //            "msg":"成功"
        //    }
        //}
        //}
        var  p = http.request2(options,post_data+'\n').then(function(result){
            var _result =JSON.parse(result)||{};
            _result = _result['alibaba_aliqin_fc_sms_num_send_response'];
            if (_result&& _result['result'] && _result['result']['err_code']==='0'){
                return
            }
            self.log.error(util.format('send sms to alidayu:%s',result));
            return Promise.as(new Error('调用短信平台发送短信错误!'));
        });
        return p;
    }

].forEach(function (item) {
        navtives[item.name] = item;
    });

exports=module.exports=navtives;

