var PromptAsync = require("./../lib/prompt-class");
var ScheduledAsync = require("./../lib/scheduled-class");
var nEw = require("../lib/statics");

describe("PromptAsyncClass", () =>{
  var mockReadLib = function(retFlag){
    return {
      returnFlag: retFlag,
      question: function(str, fN){
        fN(retFlag);
      },
      close: function(){
        return retFlag
      }
    }
  }

  it("extends ScheduledAsync", () => {
    var a = new PromptAsync(null, true);
    expect(a).toBeInstanceOf(ScheduledAsync); //Done has not been invoked
  });

  it("should initialize with stdin and stdout as streams by default", async () => {
    var a = await nEw(PromptAsync)
    expect(a.__promptInterface).toBe(null);
    expect(a.__promptInterfaceConfig.input).toBe(process.stdin);
    expect(a.__promptInterfaceConfig.output).toBe(process.stdout);
  });

  it("should be able to pass in interfaces", async () => {
    var a = await nEw(PromptAsync, {input:"A", output:"B"})
    expect(a.__promptInterface).toBe(null);
    expect(a.__promptInterfaceConfig.input).toBe("A");
    expect(a.__promptInterfaceConfig.output).toBe("B");

  });

  it("open should set __promptInterface", async () => {
    var a = await nEw(PromptAsync)
    a.__readlineLib = mockReadLib;
    a.open();
    expect(a.__promptInterface).not.toBe(null);
  });

  it("close should unset __promptInterface", async () => {
    var a = await nEw(PromptAsync)
    a.__readlineLib = mockReadLib;
    a.open();
    a.close();
    expect(a.__promptInterface).toBe(null);
  });

  it("close should do nothing if __promptInterface is not set", async () => {
    var a = await nEw(PromptAsync)
    a.__readlineLib = mockReadLib;
    a.close();
    expect(a.__promptInterface).toBe(null);
  });

  it("prompt should return promise if interface is set", async () => {
    var a = await nEw(PromptAsync, "I am a flag")
    a.__readlineLib = mockReadLib;
    a.open();
    var promptRes = await a.prompt("some question");
    expect(promptRes).toBe("I am a flag");
  });

  it("prompt should throw exception if interface is not open", async () => {
    var a = await nEw(PromptAsync, "I am a flag")
    a.__readlineLib = mockReadLib;
    try{
      a.prompt("some question");
    } catch(err){
      return;
    }
    throw new Error("Should not reach here")

  });

  it("__destroy should close __promptInterface", async () => {
    var a = await nEw(PromptAsync)
    a.__readlineLib = mockReadLib;
    a.open();
    a.__destroy();
    expect(a.__promptInterface).toBe(null);
  });

})
