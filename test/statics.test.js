var BaseAsync = require("./../lib/base-class");
var nEw = require("./../lib/statics");

describe("nEw", () =>{
  it("should allow await on class while its contructing", async () => {
    var x = await nEw(BaseAsync);
    expect(x).toBeInstanceOf(BaseAsync);
  });
});
