/* eslint-disable require-jsdoc */

import {Lab_to_LCH, Lab_to_XYZ, LCH_to_Lab, XYZ_to_Lab} from "./w3c";

export const clamp = (val:number, min:number, max:number)=>{
    return Math.min(max, Math.max(min, val));
}

export const mix = (a:number, b:number, interp:number)=>{
  return a + (b - a) * interp;
}

export default class Color {
  _r: number;
  _g: number;
  _b: number;
  _a: number;
  constructor(r: number, g?: number, b?: number, a?: number) {
    if (arguments.length === 1) {
      g = r;
      b = r;
      a = 1;
    } else if (arguments.length === 3) {
      a = 1;
    } else if (arguments.length !== 4) {
      throw new Error("Color must be given initial component values.");
    }
    this._r = Math.min(1, Math.max(0, r));
    this._g = Math.min(1, Math.max(0, g));
    this._b = Math.min(1, Math.max(0, b));
    this._a = Math.min(1, Math.max(0, a));
  }

  r(): number {
    return this._r;
  }

  g(): number {
    return this._g;
  }

  b(): number {
    return this._b;
  }

  a(): number {
    return this._a;
  }

  setA(value: number): Color {
    this._a = Math.min(1, Math.max(0, value));
    return this;
  }

  setR(value: number): Color {
    this._r = Math.min(1, Math.max(0, value));
    return this;
  }

  setG(value: number): Color {
    this._g = Math.min(1, Math.max(0, value));
    return this;
  }

  setB(value: number): Color {
    this._b = Math.min(1, Math.max(0, value));
    return this;
  }

  multiply(other: Color): Color {
    return new Color(
      this.r() * other.r(),
      this.g() * other.g(),
      this.b() * other.b(),
      this.a() * other.a()
    );
  }

  premultiply(other: Color): Color {
    return new Color(
      this.a() * this.r() + other.r() * (1.0 - this.a()),
      this.a() * this.g() + other.g() * (1.0 - this.a()),
      this.a() * this.b() + other.b() * (1.0 - this.a()),
      1.0
    );
  }

  asRGB(): string {
    return (
      "rgb(" +
      Math.round(this._r * 255) +
      ", " +
      Math.round(this._g * 255) +
      ", " +
      Math.round(this._b * 255) +
      ")"
    );
  }

  asRGBA(): string {
    return (
      "rgba(" +
      Math.round(this._r * 255) +
      ", " +
      Math.round(this._g * 255) +
      ", " +
      Math.round(this._b * 255) +
      ", " +
      Math.round(this._a * 255) +
      ")"
    );
  }

  luminance(): number {
    // sRGB color model.
    const x1 = Color.inverseSRGBCompanding(this.r());
    const y1 = Color.inverseSRGBCompanding(this.g());
    const z1 = Color.inverseSRGBCompanding(this.b());
    const R_LUMINANCE = 0.648431;
    const G_LUMINANCE = 0.321152;
    const B_LUMINANCE = 0.155886;
    return x1 * R_LUMINANCE + y1 * G_LUMINANCE + z1 * B_LUMINANCE;
  }

  toLCH(): [number, number, number] {
    const x1: number = Color.inverseSRGBCompanding(this.r());
    const y1: number = Color.inverseSRGBCompanding(this.g());
    const z1: number = Color.inverseSRGBCompanding(this.b());
    return Lab_to_LCH(XYZ_to_Lab([x1, y1, z1]));
  }

  static fromLCH = (L3:number, C3: number, H3: number, a:number)=>{
    const [x3, y3, z3] = Lab_to_XYZ(LCH_to_Lab([L3, C3, H3]));
    return new Color(
      Color.sRGBCompanding(x3),
      Color.sRGBCompanding(y3),
      Color.sRGBCompanding(z3),
      a
    );
  }

  interpolate(other: Color, interp: number): Color {
    // console.log("Interpolating");
    interp = clamp(interp, 0, 1, );

    const [L1, C1, H1] = this.toLCH();
    const [L2, C2, H2] = other.toLCH();

    const L3: number = mix(L1, L2, interp);
    const C3: number = mix(C1, C2, interp);
    const H3: number = mix(H1, H2, interp);
    //console.log("L3=" + L3 + ", C3=" + C3 + ", H3=" + H3);

    return Color.fromLCH(L3, C3, H3, mix(this.a(), other.a(), interp));
  }

  static inverseSRGBCompanding = function (v: number): number {
    if (v <= 0.04045) {
      return v / 12.92;
    }
    return Math.pow((v + 0.055) / 1.055, 2.4);
  };

  static sRGBCompanding = function (v: number): number {
    if (v <= 0.0031308) {
      return v * 12.92;
    }
    return 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  };

  static fromRGB = function (rgb: string, defaultAlpha?: number) {
    // Default alpha to 255.
    if (arguments.length === 1) {
      defaultAlpha = 255;
    }

    // Extract the color from the string, as formatted in asRGB.
    const value: number[] = [];
    rgb
      .trim()
      .substring("rgb(".length, rgb.length - 1)
      .split(",")
      .forEach(function (c) {
        value.push(parseInt(c.trim()));
      });
    if (value.length < 3) {
      throw new Error("Failed to parse color");
    }
    if (value.length === 3) {
      value.push(defaultAlpha);
    }

    // Return a new color.
    return new Color(
      value[0] / 255,
      value[1] / 255,
      value[2] / 255,
      value[3] / 255
    );
  };

  clone(): Color {
    return new Color(this.r(), this.g(), this.b(), this.a());
  }

  equals(other: Color): boolean {
    return (
      this.r() === other.r() &&
      this.g() === other.g() &&
      this.b() === other.b() &&
      this.a() === other.a()
    );
  }
}
