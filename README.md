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

  myFunc(x){
    return x + 1
  }

  myLog(message){
    console.log(message + this.suffix);
  }
}

var myInstance = await nEw(MyClass, "World");

//Cron format
myInstance.schedule("*/1 * * * * *", "myLog", "Hello ");

//Milliseconds format
myInstance.schedule(1000, "myLog", "Hello ");

//This will perform the myLog with message 'Hello World' function every second
```

##API

###function nEw(ClassFn, ...params) -> Promise\<Class_Instance\>
Returns a promise that will return the class upon complete construction, params will be inputed into the constructor function.

###class BaseAsync

####function a([methodName, ...params]) -> Promise\<[status, returnValue]\>

invokes a method asynchronously on the class.
