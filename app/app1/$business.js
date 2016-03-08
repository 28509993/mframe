/**
 * Created by wangmin on 16/3/7.
 */


var path =require('path')

function full(filename){
    return path.resolve(__dirname,filename);
}
exports = module.exports = tuple('log!normal','lib','busi',
    function(log,lib,busi){
        return [
            tuple({noAuth:true},function signupa(req,res,next){
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
