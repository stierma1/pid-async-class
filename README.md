# pid-async-class

##Exports
Exports static function nEw, BaseAsync class, and ScheduledAsync class

##Usage

###Basic
```javascript
var nEw = require("pid-async-class").nEw;
var BaseAsync = require("pid-async-class").BaseAsync;

class MyClass extends BaseAsync{
  constructor(){
    super();
  }

  myFunc(x){
    return x + 1
  }
}

var myInstance = await nEw(MyClass);

var [status, returnValue] = await myInstance.a(["myFunc", 1]);
  //status === "OK"
  //returnValue === 2
```

###Basic schedule
You can add scheduled executions with the schedule function.
Multiple schedules are allowed.

```javascript
var nEw = require("pid-async-class").nEw;
var ScheduledAsync = require("pid-async-class").ScheduledAsync;

class MyClass extends ScheduledAsync{
  constructor(suffix){
    super();
    this.suffix = suffix;
  }

  myLog(message){
    console.log(message + this.suffix);
  }
}

var myInstance = await nEw(MyClass, "World");

//Cron format
myInstance.schedule("*/1 * * * * *", "myLog", ["Hello "]);

//Milliseconds format
myInstance.schedule(1000, "myLog", ["Hello "]);

//This will perform the myLog with message 'Hello World' function every second
```

###Proxy schedule
Similar to Schedule Class but only requires an existing class instance and not inheritance, you can swap instances at runtime.

```javascript
var nEw = require("pid-async-class").nEw;
var ProxyAsync = require("pid-async-class").ProxyAsync;

class MyClass {
  constructor(suffix){
    super();
    this.suffix = suffix;
  }

  myLog(message){
    console.log(message + this.suffix);
  }
}

var myInstance = new MyClass("World");

var myProxy = await nEw(ProxyAsync, myInstance);

//Cron format
myProxy.schedule("*/1 * * * * *", "myLog", ["Hello "]);

//Milliseconds format
myProxy.schedule(1000, "myLog", ["Hello "]);

//This will perform the myLog with message 'Hello World' function every second
class MyClass2{
  constructor(suffix){
    super();
    this.suffix = suffix;
  }

  myLog2(message){
    console.log(message + this.suffix);
  }
}

myProxy.cancelAll();
//Swap Instances at runtime!!! (remember to cancel previous schedules)
myProxy.swapInstance(new MyClass2("World"));
```


##API

###function nEw(ClassFn, ...params) -> Promise\<Class_Instance\>
Returns a promise that will return the class upon complete construction, params will be inputed into the constructor function.

###class BaseAsync

####function a([methodName, ...params]) -> Promise\<[status, returnValue]\>

invokes a method asynchronously on the class in the classes subprocess.  The class subprocess can only invoke one 'a' method at a time.  Other 'a' calls will queue up.

####function aPass([methodName, ...params]) -> Promise\<[status, returnValue]\>

invokes a method asynchronously on the class in its own subprocess.  Multiple can run at the same time.

###class ScheduledAsync extends BaseAsync

####function schedule(CronString or number(milliseconds), methodName, Array<any> Params) -> undefined

Invokes the method according to the cron string or number, with params.  Note this will perform only one scheduled task at a time.  Others will wait in a queue until the class process is open.

####function scheduleSimul(CronString or number(milliseconds), methodName, Array<any> Params) -> undefined

Invokes the method according to the cron string or number, with params.  Note this will perform the scheduled tasks in their own coroutine so concurrent scheduled tasks can occur.

####function cancel(methodName, CronString or number(milliseconds)) -> undefined

Will cancel the scheduled task given the methodName and matching CronString or number

####function cancelAll() -> undefined

Will cancelAll the scheduled tasks
