var readline = require("readline");
var ScheduledAsync = require("./scheduled-class");

class PromptAsync extends ScheduledAsync{
  constructor(promptInterfaceConfig, wait){
    super(wait);
    this.__promptInterfaceConfig = promptInterfaceConfig || {
      input: process.stdin,
      output: process.stdout
    };
    this.__promptInterface = null;
    this.__readlineLib = readline;
  }

  open(){
    this.__promptInterface = this.__readlineLib(this.__promptInterfaceConfig);
  }

  close(){
    if(this.__promptInterface){
      this.__promptInterface.close();
      this.__promptInterface = null;
    }
  }

  prompt(question){
    if(!this.__promptInterface){
      throw new Error("Prompt Interface is not open.");
    }
    return new Promise((res, rej) => {
      this.__promptInterface.question(question, (answer) => {
        res(answer);
      });
    });
  }

  __destroy(){
    this.close();
    super.__destroy();
  }
}

module.exports = PromptAsync;
