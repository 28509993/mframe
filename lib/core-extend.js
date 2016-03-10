/**
 * Created by wangmin on 16/2/20.
 */
var http = require('http')
    , IncomingMessage = http.IncomingMessage
//,OutgoingMessage=  require('http').OutgoingMessage
    ,ServerResponse = http.ServerResponse
    ,util=require('util')
    //,formidable=require('formidable')


function bufferLoad(stream, callback){
    var buffers = [];
    stream.on('data', function (trunk) {
        buffers.push(trunk);
    });
    stream.on('end', function () {
        callback(null, Buffer.concat(buffers));
    });
    stream.once('error', callback);
}

//根据项目要求，重载相关的函数
http.request2=function (options,data){
    return new Promise(function(resove,reject){
        var req = http.request(options, function (res) {
            res.setEncoding(options.encodeing|| 'utf8');
            bufferLoad(res,function(err,buffer){
                resove(buffer);
            });
        });
        req.on('error', function (e) {
            reject(e);
        });
        data &&  req.write(util.isString(data )?data:JSON.stringify(data) );
        req.end();
    })

}


ServerResponse.prototype.success=function(value) {
    var self = this;
    self.json(util._extend({result:'success'},value));
};

ServerResponse.prototype.fail=function(err){
    var self = this;
    var err = err||{};
    if (err.redirect){
        self.redirect(err.redirect);
        return ;
    }
    if (err.name==='Error' ){
        self.json({result:'fail',message:err.message||''});
        self._$log&&self._$log.error( '%s',err.message);
        self._$log&&self._$log.debug( '%s',err.stack);
    }else{
        self.json(util._extend({result:'fail'},err));
    }

};


ServerResponse.prototype.endPromise=function(promise){
    var res = this;
    promise.then(function(data){
        res.success(data);
    },function(e){
        res.fail(e);
    }).catch(function(e){
        res.fail(e);
    });

}




ServerResponse.prototype.renderPromise=function(promise){
    var res = this;
    var res = this;
    promise.done(function (data) {
        if (typeof data ==='string'){
            res.contentType('html'); //html
            res.send(data);
        }else if (data.redirect){
            res.redirect(data.redirect);
        }
        else{
            res.render2(data||{});
        }
    }).fail(function (err) {
        res.fail(util._extend({redirect:'/'},err) );
    });

}



IncomingMessage.prototype.isAuthorized = function() {
    //can be override isAuthorized
    return true;
}






IncomingMessage.prototype.waitPost = function(fn) {
    //can be override
    var req =this;
    if (req.method !== 'POST') return  process.nextTick(fn) ;
    //req.headers['content-type']

    var contentType =req.headers['content-type'];
    if (contentType.match(/urlencoded/i)) {

    }
    //......

    bufferLoad(req,function(err,buffer){
        console.log(buffer.toString());

    });


    //var form = new formidable.IncomingForm();
    //form.parse(req, function (err, fields,files) {
    //    //util._extend(req.query, fields);
    //    fields&&fields.info && (req._info=fields.info);
    //    files && (req.files=files)
    //    fn(err);
    //})

    //req.setEncoding('utf8');






}





Date['min'] = Error.prototype['min'] =new Date(0);
Date['max'] = Error.prototype['max'] =new Date('2099');


if (!Date.prototype.format) {
    Date.prototype.format = function (fmt) {
        var fmt = fmt||'yyyy-MM-dd hh:mm:ss';
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
}



Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}


Promise. as =Promise.prototype.as =function(value){
    return  new Promise(function (resolve,reject){
        process.nextTick(function(){
            if (value && value.constructor.name==='Error'){
                reject( value);
            }else{
                resolve( value);
            }

        });
    });
}


Promise. waterfall =Promise.prototype.waterfall=function (ps){
    var self = this;
    var results=[];
    var n =0;
    var ps = util.isArray(ps)?ps:[ps];
    if (ps.length<=0) return Promise.as();
    return new Promise(function(resovle,reject){
        !function step(v){
            var fn =ps[n];
            var p = fn.call(self,v);
            p.then(function(v){
                results.push(v);
                n++;
                if (n <ps.length){
                    step.call(null,v);
                }else{
                    resovle(results);
                }
            },function(err){
                reject (err);
            })
        }();
    });
}


