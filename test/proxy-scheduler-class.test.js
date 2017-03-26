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

  it("should swap methods on new instance", () => {
    class A{
      constructor(){

      }

      test(){

      }
    }
    class B{
      constructor(){

      }
      test2(){

      }
    }
    var myTest = new A();
    var a = new ProxyAsync(myTest);
    a.swapInstance(new B());
    expect(a.test).toBe(undefined);
    expect(a.test2).not.toBe(undefined);
  });
})
