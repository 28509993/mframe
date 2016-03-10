/**
 * Created by wangmin on 16/2/22.
 */
var path =require('path')
    ,util=require('util')


exports = module.exports = tuple('log!normal','lib','busi',
    function(log,lib,busi){
        //log.info('info');
        //log.warn('info');
        //log.error('info');
        return [

            tuple({noAuth:true},function apply_sms_code(req,res,next){
                log.info('Call %s:%j',arguments.callee.name,req.query);
                var self = this;
                //APP用户登录
                //数据校验 : 输入{info:username}
                var value = req.query;
                if (!/^1\d{10}$/.test( value.mobile)){
                    return res.endPromise(Promise.as(new Error('请写入正确的手机号码!')));
                }
                util._extend(value,{smsCode: (Math.random()+'').slice(2,6)});
                var p = busi.apply_sms_code.call(self,value);
                res.endPromise(p);
            }),

            tuple({noAuth:true},function signup(req,res,next){
                log.info('Call %s:%j',arguments.callee.name,req.query);
                var self = this;
                //APP用户登录
                //输入{info:username,password}
                var p = Promise.as({a:'a'});
                res.endPromise(p);
                //res.success()
            })
        ];
    });

