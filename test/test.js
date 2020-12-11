var assert = require("assert");
import Color from "../dist/color";

describe("Color", function () {
  it("works", ()=>{
    assert.ok(new Color(1, 1, 1, 1));
  });
});
