/**
 * Created by wangmin on 16/3/3.
 */

var setting = require('./setting.json')
    ,http = require("http")
    ,cluster = require("cluster")
    ,os = require("os");

function startServer(){
    if (cluster.isMaster) {
        console.log('server-http-outer master is starting ...');
        cluster.on('exit', function (worker, code, signal) {
            console.error('process cluster exit!');

        });

        cluster.on('fork', function (worker) {

        });
        var n=os.cpus().length;
        n=1;
        for (var i =0 ;i<n;i++){
            cluster.fork();
        }
    }else{
        var app = require('./app/main.js').mainServer(setting);
        var server = http.createServer(app);
        var port = 8778;
        server.listen(port,function(){
            console.log('server-http-outer is running, port:', port);
        })
    }

}





startServer.call(null);



