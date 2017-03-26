
var BaseAsync = require("./base-class");
var schedule = require("node-schedule");

class Interval {
  constructor(interval){
    this.interval = interval
  }

  cancel(){
    clearInterval(this.interval)
  }
}

class ScheduledAsync extends BaseAsync{
  constructor(wait){
    super(wait);
    this.__scheduled = {};
  }

  __destroy(){
    super.__destroy();
    for(var i in this.__scheduled){
      for(var j in this.__scheduled[i]){
        this.__scheduled[i][j].cancel();
      }
    }
  }

  schedule(cron, method, args){

    this.__scheduled[method] = this.__scheduled[method] || {};
    var task = this.__scheduled[method][cron];
    if(task){
      task.cancel();
    }

    if(typeof(cron) === 'number'){
      this.__scheduled[method][cron] = new Interval(setInterval( () => {
        this.a([method].concat(args || []));
      },cron))
    } else {
      this.__scheduled[method][cron] = schedule.scheduleJob(cron, () => {
        this.a([method].concat(args || []));
      });
    }

    return this.__scheduled[method][cron];
  }

  scheduleSimul(cron, method, args){

    this.__scheduled[method] = this.__scheduled[method] || {};
    var task = this.__scheduled[method][cron];
    if(task){
      task.cancel();
    }

    if(typeof(cron) === 'number'){
      this.__scheduled[method][cron] = new Interval(setInterval( () => {
        this.aPass([method].concat(args || []));
      },cron))
    } else {
      this.__scheduled[method][cron] = schedule.scheduleJob(cron, () => {
        this.aPass([method].concat(args || []));
      });
    }

    return this.__scheduled[method][cron];
  }

  cancel(method, cron){
    if(this.__scheduled[method][cron]){
      this.__scheduled[method][cron].cancel();
    }
  }

  cancelAll(){
    for(var i in this.__scheduled){
      for(var j in this.__scheduled[i]){
        this.__scheduled[i][j].cancel();
      }
    }
  }
}

module.exports = ScheduledAsync
