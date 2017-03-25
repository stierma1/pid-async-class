
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
    this.__methods = getAllFuncs(instance);
    for(var i in this.__methods){
      this[this.__methods[i]] = instance[this.__methods[i]].bind(instance);
    }
  }

}

module.exports = ProxyAsync;
