var ScheduledAsync = require("./../lib/scheduled-class");
var BaseAsync = require("./../lib/base-class");

describe("ScheduledAsyncClass", () =>{
  it("extends BaseAsync", () => {
    var a = new ScheduledAsync(true);
    expect(a).toBeInstanceOf(BaseAsync); //Done has not been invoked
  });

  it("schedule should accept cron string and invoke a function", async () => {
    var a = new ScheduledAsync();
    await a.__done;
    return new Promise((res) => {
      var blankFn = (clazz, method) => {
        expect(method).toBe("__getDone");
        res();
      };
      a.addInterceptor(blankFn);
      a.schedule("*/1 * * * * *", "__getDone");
    })

  });

  it("schedule should accept number and invoke a function", async () => {
    var a = new ScheduledAsync();
    await a.__done;
    return new Promise((res) => {
      var blankFn = (clazz, method) => {
        expect(method).toBe("__getDone");
        res();
      };
      a.addInterceptor(blankFn);
      a.schedule(1000, "__getDone");
    })
  });

  it("scheduleSimul should accept cron string and invoke a function", async () => {
    var a = new ScheduledAsync();
    await a.__done;
    return new Promise((res) => {
      var blankFn = (clazz, method) => {
        expect(method).toBe("__getDone");
        res();
      };
      a.addInterceptor(blankFn);
      a.scheduleSimul("*/1 * * * * *", "__getDone");
    })

  });

  it("scheduleSimul should accept number and invoke a function", async () => {
    var a = new ScheduledAsync();
    await a.__done;
    return new Promise((res) => {
      var blankFn = (clazz, method) => {
        expect(method).toBe("__getDone");
        res();
      };
      a.addInterceptor(blankFn);
      a.scheduleSimul(1000, "__getDone");
    })
  });

  it("scheduleSimul should cancel previous cron string if multiple are set", async () => {
    var a = new ScheduledAsync();
    await a.__done;
    var task = a.scheduleSimul("*/1 * * * * *", "__getDone");
    return new Promise((res) => {
      var blankFn = (clazz, method) => {
        expect(method).toBe("__getDone");
        expect(a.__scheduled["__getDone"][1000]).not.toBe(task)
        res();
      };
      a.addInterceptor(blankFn);
      a.scheduleSimul("*/1 * * * * *", "__getDone");
    })
  });

  it("schedule should cancel previous cron string if multiple are set", async () => {
    var a = new ScheduledAsync();
    await a.__done;
    var task = a.schedule("*/1 * * * * *", "__getDone");
    return new Promise((res) => {
      var blankFn = (clazz, method) => {
        expect(method).toBe("__getDone");
        expect(a.__scheduled["__getDone"][1000]).not.toBe(task)
        res();
      };
      a.addInterceptor(blankFn);
      a.schedule("*/1 * * * * *", "__getDone");
    })
  });

  it("schedule should cancel previous interval if multiple are set", async () => {
    var a = new ScheduledAsync();
    await a.__done;
    var task = a.schedule(1000, "__getDone");
    return new Promise((res) => {
      var blankFn = (clazz, method) => {
        expect(method).toBe("__getDone");
        expect(a.__scheduled["__getDone"][1000]).not.toBe(task)
        res();
      };
      a.addInterceptor(blankFn);
      a.schedule(1000, "__getDone");
    })
  });

  it("cancelAll should cancelAll intervals", async () => {
    var a = new ScheduledAsync();
    await a.__done;
    var task = a.schedule(1000, "__getDone");
    a.cancelAll();
  });

  it("cancel should cancel interval if set", async () => {
    var a = new ScheduledAsync();
    await a.__done;
    var task = a.schedule(1000, "__getDone");
    a.cancel("__getDone", 1000);
  });

  it("cancel should not cancel interval does not exist", async () => {
    var a = new ScheduledAsync();
    await a.__done;
    var task = a.schedule(1000, "__getDone");
    a.cancel("__getDone", 99);
  });

  it("__destory should cancel all intervals and crons", async () => {
    var a = new ScheduledAsync();
    await a.__done;
    var task = a.schedule(1000, "__getDone");
    a.__destroy();
  });

})
