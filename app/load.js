const fs = require('fs');
const path = require('path');
const conf = require('./config/config.default');
const app = require('./application');
const { Tool } = require('./utils/');
const { PATH } = require('./lib/enum');

const TYPE = Tool.buildEnum({
  'controller': 'controller',
  'service': 'service',
});

/**
 * 加载service 和 controller
 */
exports.loadBase = function(type){
  let filePath = app.config.root;
  filePath = path.join(filePath,type);
  let files = fs.readdirSync(filePath);
  files.map(file => {
    app[`add${Tool.firstUpperCase(type)}`](file.substring(0,file.length - 3),require(path.join(filePath,file)));
  });
};

exports.loadMiddware = function(){
  let middwarePath = path.join(app.config.root,PATH.MIDDWARE);
  let isHave = false;
  try {
    fs.accessSync(middwarePath,fs.constants.F_OK);
    isHave = true;
  } catch (error) {}
  isHave && app.addMiddwares(require(middwarePath));
};


exports.load = function(){
  exports.loadMiddware();
  exports.loadBase(TYPE.controller);
  exports.loadBase(TYPE.service);
};
