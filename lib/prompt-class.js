var read = require("read");
var ScheduledAsync = require("./scheduled-class");

class PromptAsync extends ScheduledAsync{
  constructor(promptInterfaceConfig, wait){
    super(wait);
    this.__promptInterfaceConfig = promptInterfaceConfig || {
      input: process.stdin,
      output: process.stdout
    };
    this.__promptInterface = read;
  }

  prompt(question, silent, replace){
    return new Promise((res, rej) => {
      this.__promptInterface({prompt:question,
        silent: silent || false,
        replace:replace || undefined,
        input: this.__promptInterfaceConfig.input,
        output: this.__promptInterfaceConfig.output
      }, (err, answer, isDefault) => {
        if(err){
          rej(err);
          return;
        }
        res(answer);
      });
    });
  }

}

module.exports = PromptAsync;
