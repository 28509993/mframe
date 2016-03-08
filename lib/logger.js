/**
 * Created by wangmin on 15/7/3.
 */

    /*
var logfn=function(){
    console.log.apply(null,arguments);
}

exports = module.exports = function () {
    logfn.log =console.log
    logfn.warn =console.warn
    logfn.error =console.error
    logfn.info =console.info
    return logfn;
}
*/

var log4js = require('log4js');

function loggerHander(name){
    var logger = log4js.getLogger(name || 'normal');
    //logger.setLevel('INFO');
    logger.setLevel('TRACE');
    return logger;
}

exports = module.exports = loggerHander;



exports.use = function () {
    var logger = loggerHander('access');
    var reslog = log4js.connectLogger(logger,{level:'trace',format:':method :url :status'});
    return function(req,res,next){
        res._$log=logger;
        reslog.apply(null,arguments);
    }
}

exports.initialize = function (options) {
    options&& log4js.configure({appenders: options, replaceConsole: false});
}



