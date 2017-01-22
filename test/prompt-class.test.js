var PromptAsync = require("./../lib/prompt-class");
var ScheduledAsync = require("./../lib/scheduled-class");
var nEw = require("../lib/statics");

describe("PromptAsyncClass", () =>{
  var mockReadLib = function(options, cb){
    return cb(null, options);
  }

  var mockReadLibErr = function(options, cb){
    return cb(options);
  }

  it("extends ScheduledAsync", () => {
    var a = new PromptAsync(null, true);
    expect(a).toBeInstanceOf(ScheduledAsync); //Done has not been invoked
  });

  it("should initialize with stdin and stdout as streams by default", async () => {
    var a = await nEw(PromptAsync)
    expect(a.__promptInterfaceConfig.input).toBe(process.stdin);
    expect(a.__promptInterfaceConfig.output).toBe(process.stdout);
  });

  it("should be able to pass in interfaces", async () => {
    var a = await nEw(PromptAsync, {input:"A", output:"B"})
    expect(a.__promptInterfaceConfig.input).toBe("A");
    expect(a.__promptInterfaceConfig.output).toBe("B");

  });

  it("should prompt with options", async () => {
    var a = await nEw(PromptAsync)
    a.__promptInterface = mockReadLib;
    var val = await a.prompt("What What", true, "*")
  });

  it("should throw error if error exists", async () => {
    var a = await nEw(PromptAsync)
    a.__promptInterface = mockReadLibErr;
    try{
      await a.prompt("What What")
    } catch(err){
      return;
    }
    throw new Error("Should not have reached here")
  });



})
