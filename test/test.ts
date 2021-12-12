import { assert, expect } from "chai";
import Color, {mix} from "../dist/parsegraph-color.lib";

describe("Color", function () {
  it("works", () => {
    assert.ok(new Color(1, 1, 1, 1));
  });

  it("supports asRGBA", () => {
    expect(new Color(1, 1, 1, 1).asRGBA()).to.eql("rgba(255, 255, 255, 255)");
    expect(new Color(1, 0, 1, 1).asRGBA()).to.eql("rgba(255, 0, 255, 255)");
    expect(new Color(1, 1, 1, 0).asRGBA()).to.eql("rgba(255, 255, 255, 0)");
  });

  it("toLCH red", function () {
    const start = new Color(1, 0, 0, 1);
    assert.deepEqual(start.toLCH()[2], 0);
  });

  it("toLCH black", function () {
    const start = new Color(0, 0, 0, 1);
    assert.deepEqual([0, 0, 0], start.toLCH());
  });

  it("toLCH white", function () {
    const start = new Color(1, 1, 1, 1);
    assert.deepEqual(100, start.toLCH()[0]);
  });

  it("LCH roundtrip", function () {
    const start = new Color(1, 1, 1, 1);
    const end = Color.fromLCH(...start.toLCH(), 1);
    assert.equal(start.asRGB(), end.asRGB());
  });

  it("Color.interpolate at start", function () {
    var start = new Color(0, 0, 1);
    var b = new Color(1, 1, 0);
    var c = start.interpolate(b, 0);
    assert.equal(
      c.asRGB(),
      start.asRGB(),
      "Trivial interpolate (interp=0) does not work: " + c.asRGB()
    );
  });

  it("Color.interpolate at end", function () {
    var r = new Color(0, 0, 1);
    var b = new Color(1, 1, 0);
    var c = r.interpolate(b, 1);
    assert.equal(
      c.asRGB(),
      b.asRGB(),
      "Trivial interpolate (interp=1) does not work: " + c.asRGB()
    );
  });

  it("Color.interpolate at middle", function () {
    var r = new Color(0, 0, 1);
    var b = new Color(1, 1, 0);
    var c = r.interpolate(b, 0.5);
    assert.equal(
      c.toLCH()[0],
      mix(r.toLCH()[0], b.toLCH()[0], .5), "Luminance must be 50"
    );
  });
});
