import { assert, expect } from 'chai';
import Color from "../dist/parsegraph-color";

describe("Color", function () {
  it("works", ()=>{
    assert.ok(new Color(1, 1, 1, 1));
  });

  it("supports asRGBA", ()=>{
    expect(new Color(1, 1, 1, 1).asRGBA()).to.eql('rgba(255, 255, 255, 255)');
    expect(new Color(1, 0, 1, 1).asRGBA()).to.eql('rgba(255, 0, 255, 255)');
    expect(new Color(1, 1, 1, 0).asRGBA()).to.eql('rgba(255, 255, 255, 0)');
  });
});
