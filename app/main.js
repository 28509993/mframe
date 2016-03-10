/**
 * Created by wangmin on 16/2/19.
 */

var path = require('path')
    ,util = require('util')
    ,express =require('express')
    ,mauk =require('mauk')
    ,lib=require('../lib')
    ,busi=require('../busi')




var extend= {
    log: lib.logger
    ,lib:lib
    ,busi:busi
}


function setError(){
    var app =this;
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            //console.log(err);
            //console.log(req.headers)
            res.status(err.status || 500);
            res.send(err.stack);
            console.log(err.stack)
        })
    }
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send(err.message);

    })
}


function loadExtendLib (app,options){
    extend.log.initialize(options.log);
    app.extend = util._extend( {
        options: options},extend);
    return app;
}



exports.mainServer=function(options) {
    var app = express();
    loadExtendLib(app,options);
    var tree = mauk.treeRouter(app)();
    tree.load(path.resolve('app/demo'));
    app.use(extend.log.use())
        .use(tree.route());
    setError.call(app);
    return app;
}

process.on('uncaughtException',function(err){
    console.error(err.stack);
});
process.on('exit',function(){
    console.error('process exit!');
});

process.on('error',function(){
    console.error('process error!');
});