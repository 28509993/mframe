/**
 * Created by wangmin on 16/3/3.
 */

var util = require('util')
    ,path =require('path')
    ,core = require('./core-extend');

function full(filename){
    return path.resolve(__dirname,filename);
}



util._extend(exports, {"logger":require('./logger')});
util._extend(exports, require('./util'));
//util._extend(exports, {"connect":include(full('./connect'))});


