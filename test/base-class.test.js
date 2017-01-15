var BaseAsync = require("./../lib/base-class");

describe("BaseAsyncClass", () =>{
  it("should not be fully instantiated immediately", () => {
    var a = new BaseAsync(true);
    expect(a.__done).toBeInstanceOf(Promise); //Done has not been invoked
    expect(a.__completeConstruction).toBeInstanceOf(Function)
  });

  it("should be fully instantiated after __completeConstruction is invoked", async () => {
    var a = new BaseAsync(true);
    a.__completeConstruction();
    await a.__done;
    expect(a.__done).toBe(undefined) //Done has been invoked
    expect(a.__completeConstruction).toBe(undefined)
  });

  it("should be fully instantiated if wait param is falsey and await is invoked on __done", async () => {
    var a = new BaseAsync(false);
    await a.__done;
    expect(a.__done).toBe(undefined) //Done has been invoked
    expect(a.__completeConstruction).toBe(undefined)
  });

  it("await __getDone should return the object", async () => {
    var a = new BaseAsync(true);
    a.__completeConstruction();
    var x = await a.__getDone();
    expect(a).toBe(x)
  });

  it("addInterceptor should add an interceptor", async () => {
    var a = new BaseAsync(true);
    a.__completeConstruction();
    await a.__getDone();
    var blankFn = () => {};
    a.addInterceptor(blankFn);
    expect(a.__interceptors[0]).toBe(blankFn)
  });


  it("__destroy should exit the internal process", async () => {
    var a = new BaseAsync(true);
    a.__completeConstruction();
    await a.__getDone();
    a.__destroy();
    expect(a.__process.state).toBe("normal")
  });

  it("a should invoke a method asynchronously ", async () => {
    var a = new BaseAsync(true);
    a.__completeConstruction();
    await a.__getDone();
    var blankFn = () => {};
    var [status] = await a.a(["addInterceptor", blankFn]);
    expect(status).toBe("OK");
    expect(a.__interceptors[0]).toBe(blankFn)
  });

  it("a should invoke a method asynchronously and return error if fails", async () => {
    var a = new BaseAsync(true);
    a.__completeConstruction();
    await a.__getDone();
    var blankFn = () => {};
    var [status, err] = await a.a(["bacon", blankFn]);
    expect(status).toBe("ERR");
  });

  it("a should invoke all interceptors", async () => {
    var a = new BaseAsync(true);
    a.__completeConstruction();
    await a.__getDone();
    var blankFn = (clazz, method) => {
      expect(method).toBe("__getDone");
    };
    a.addInterceptor(blankFn);
    expect(a.__interceptors[0]).toBe(blankFn)
    var [status] = await a.a(["__getDone"]);
    expect(status).toBe("OK");
  });

})
