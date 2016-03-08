/**
 * Created by wangmin on 16/3/4.
 */

var crypto = require('crypto')
    ,util=require('util')



var natives={};
[
    function md5 (text) {
        return crypto.createHash('md5').update(text).digest('hex');
    },
    function randomStr(length){
        var buffer = crypto.randomBytes(length/2);
        var byteLength =buffer.length;
        var offset = 0;
        var byte ;
        var value=[length];
        while (offset<byteLength){
            byte = buffer.readUInt8(offset);
            value[offset*2] =chars[byte & 15];
            value[offset*2+1] =chars[ (byte>>4) & 15];
            offset ++ ;
        }
        return value.join('');
    },
    function bufferLoad(stream, callback){
        var buffers = [];
        stream.on('data', function (trunk) {
            buffers.push(trunk);
        });
        stream.on('end', function () {
            callback(null, Buffer.concat(buffers));
        });
        stream.once('error', callback);
    },
    function  queryString (obj){
        var sep =  '&';
        var eq =  '=';
        if (util.isObject(obj)) {
            var keys = Object.keys(obj);
            var fields = [];
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                var v =encodeURIComponent( obj[k]);
                fields.push(util.format('%s%s%s',k,eq,v));
            }
            return fields.join(sep);
        }
        return '';
    }

].forEach(function(fn) {
        natives[fn.name]=fn;
    });
exports=module.exports=natives;


