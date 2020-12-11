var assert = require("assert");
import todo from "../dist/color";

describe("Package", function () {
  it("works", ()=>{
    assert.equal(todo(), 42);
  });
});
