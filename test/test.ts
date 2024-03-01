import { assert, expect } from "chai";
import Color, { mix } from "../src/index";

describe("Color", function () {
  it("works", () => {
    assert.ok(new Color(1, 1, 1, 1));
  });

  it("has random", () => {
    for (let i = 0; i < 100; ++i) {
      const c = Color.random(0.5);
      expect(c.r()).to.be.greaterThanOrEqual(0.25);
      expect(c.g()).to.be.greaterThanOrEqual(0.25);
      expect(c.b()).to.be.greaterThanOrEqual(0.25);
      expect(c.r()).to.be.lessThanOrEqual(0.75);
      expect(c.g()).to.be.lessThanOrEqual(0.75);
      expect(c.b()).to.be.lessThanOrEqual(0.75);
      expect(c.a()).to.equal(1);
    }
  });

  it("supports asHex", () => {
    expect(new Color(1, 1, 1, 1).asHex()).to.eql("#ffffff");
    expect(new Color(0, 1, 1, 1).asHex()).to.eql("#00ffff");
    expect(new Color(0, 0, 1, 1).asHex()).to.eql("#0000ff");
    expect(new Color(0, 0, 0, 1).asHex()).to.eql("#000000");
    expect(new Color(0, 0, 1, 1).asHex()).to.eql("#0000ff");
    expect(new Color(0, 1, 0, 1).asHex()).to.eql("#00ff00");
    expect(new Color(1, 0, 1, 1).asHex()).to.eql("#ff00ff");
    expect(new Color(0, 1, 1, 1).asHex()).to.eql("#00ffff");
    expect(new Color(1, 1, 0, 1).asHex()).to.eql("#ffff00");
  });

  it("supports fromHex", () => {
    expect(Color.fromHex('#ff6699').asHex()).to.eql("#ff6699");
    expect(Color.fromHex('ff6699').asHex()).to.eql("#ff6699");
    expect(Color.fromHex('ff00ff').asHex()).to.eql("#ff00ff");
  });

  it("supports asRGBA", () => {
    expect(new Color(1, 1, 1, 1).asRGBA()).to.eql("rgba(255, 255, 255, 1)");
    expect(new Color(1, 0, 1, 1).asRGBA()).to.eql("rgba(255, 0, 255, 1)");
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
    const start = new Color(0, 0, 1);
    const b = new Color(1, 1, 0);
    const c = start.interpolate(b, 0);
    assert.equal(
      c.asRGB(),
      start.asRGB(),
      "Trivial interpolate (interp=0) does not work: " + c.asRGB()
    );
  });

  it("Color.interpolate at end", function () {
    const r = new Color(0, 0, 1);
    const b = new Color(1, 1, 0);
    const c = r.interpolate(b, 1);
    assert.equal(
      c.asRGB(),
      b.asRGB(),
      "Trivial interpolate (interp=1) does not work: " + c.asRGB()
    );
  });

  it("Color.interpolate at middle", function () {
    const r = new Color(0, 0, 1);
    const b = new Color(1, 1, 0);
    const c = r.interpolate(b, 0.5);
    assert.equal(
      c.toLCH()[0],
      mix(r.toLCH()[0], b.toLCH()[0], 0.5),
      "Luminance must be 50"
    );
  });
});
