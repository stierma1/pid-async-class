
var System = require("pid-system");

class BaseAsync {
  constructor(wait){
    var self = this;
    this.__interceptors = [];
    this.__done = new Promise((res, rej) => {
      this.__completeConstruction = res;
      System.promote(async function(message){
       var [method, ...rest] = message;
       try{
         for(var i = 0; i < self.__interceptors.length; i++){
           await self.__interceptors[i](self, method, rest);
         }
         return [["OK", self[method].apply(self, rest)]]
       } catch(err){
         return [["ERR", err]];
       }
     }).then((proc) =>{
       this.__process = proc;
     });
    }).then(() => {
      this.__done = undefined;
      this.__completeConstruction = undefined;
      return this;
    }).catch(() => {
      this.__done = undefined;
      this.__completeConstruction = undefined;
      return this;
    })

    this.__process = null;

    if(!wait){
      this.__completeConstruction();
    }
  }

  __getDone(){
    return this.__done;
  }

  a(message){
    var self = this;
    return new Promise((res) => {
      System.promote(function(message){
        System.exit(this)
        res(message);
      }, "emitter").then(function(p){
        System.send(self.__process, [p, message]);
      })
    })

  }

  addInterceptor(func){
    this.__interceptors.push(func);
  }

  __destroy(){
    System.exit(this.__process);
  }

}

module.exports = BaseAsync
