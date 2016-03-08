/**
 * Created by wangmin on 16/3/4.
 */

var util = require('util')


util._extend(exports, require('./system'));
util._extend(exports, require('./business'));
util._extend(exports, {"openAli":require('./open-ali')});
util._extend(exports, {"openWechat":require('./open-wechat')});


