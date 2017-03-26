
var ScheduledAsync = require("./scheduled-class");

var FILTER = ['__defineGetter__',
  '__defineSetter__',
  'hasOwnProperty',
  '__lookupGetter__',
  '__lookupSetter__',
  'propertyIsEnumerable',
  'constructor',
  'toString',
  'toLocaleString',
  'valueOf',
  'isPrototypeOf',
  '__proto__']

function getAllFuncs(obj) {
  var instance = obj
    var props = [];

    do {
        props = props.concat(Object.getOwnPropertyNames(obj).filter(function(name){return FILTER.indexOf(name) < 0}));
    } while (obj = Object.getPrototypeOf(obj));

    return props.sort().filter(function(e, i, arr) {
       if (e!=arr[i+1] && typeof instance[e] == 'function') return true;
    });
}

class ProxyAsync extends ScheduledAsync{
  constructor(instance, wait){
    super(wait);
    this.__methods = [];
    this.swapInstance(instance);
  }

  swapInstance(newInstance){
    for(var i in this.__methods){
      delete this[this.__methods[i]];
    }
    this.__methods = getAllFuncs(newInstance);
    for(var i in this.__methods){
      this[this.__methods[i]] = newInstance[this.__methods[i]].bind(newInstance);
    }
  }
}

module.exports = ProxyAsync;
