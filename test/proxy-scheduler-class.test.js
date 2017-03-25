var ProxyAsync = require("./../lib/proxy-scheduler-class");

describe("ProxyAsyncClass", () =>{
  it("should construct", () => {
    var a = new ProxyAsync({});
    expect(a).not.toBe(null);
  });

  it("should copy methods on construct", () => {
    class A{
      constructor(){

      }

      test(){

      }
    }
    var myTest = new A();
    var a = new ProxyAsync(myTest);
    expect(a.test).not.toBe(null);
  });
})
