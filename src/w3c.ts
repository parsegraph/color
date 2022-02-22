/* eslint-disable camelcase */
export type ColArray = [number, number, number];

export function XYZ_to_Lab(XYZ: ColArray): ColArray {
  // Assuming XYZ is relative to D50, convert to CIE Lab
  // from CIE standard, which now defines these as a rational fraction
  const ε = 216 / 24389; // 6^3/29^3
  const κ = 24389 / 27; // 29^3/3^3
  const white = [0.96422, 1.0, 0.82521]; // D50 reference white

  // compute xyz, which is XYZ scaled relative to reference white
  const xyz = XYZ.map((value, i) => value / white[i]);

  // now compute f
  const f = xyz.map((value) =>
    value > ε ? Math.cbrt(value) : (κ * value + 16) / 116
  );

  return [
    116 * f[1] - 16, // L
    500 * (f[0] - f[1]), // a
    200 * (f[1] - f[2]), // b
  ];
}

export function Lab_to_XYZ(Lab: ColArray): ColArray {
  // Convert Lab to D50-adapted XYZ
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  const κ = 24389 / 27; // 29^3/3^3
  const ε = 216 / 24389; // 6^3/29^3
  const white = [0.96422, 1.0, 0.82521]; // D50 reference white
  const f = [];

  // compute f, starting with the luminance-related term
  f[1] = (Lab[0] + 16) / 116;
  f[0] = Lab[1] / 500 + f[1];
  f[2] = f[1] - Lab[2] / 200;

  // compute xyz
  const xyz = [
    Math.pow(f[0], 3) > ε ? Math.pow(f[0], 3) : (116 * f[0] - 16) / κ,
    Lab[0] > κ * ε ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / κ,
    Math.pow(f[2], 3) > ε ? Math.pow(f[2], 3) : (116 * f[2] - 16) / κ,
  ];

  // Compute XYZ by scaling xyz by reference white
  return xyz.map((value, i) => value * white[i]) as ColArray;
}

export function Lab_to_LCH(Lab: ColArray): ColArray {
  // Convert to polar form
  const hue = (Math.atan2(Lab[2], Lab[1]) * 180) / Math.PI;
  return [
    Lab[0], // L is still L
    Math.sqrt(Math.pow(Lab[1], 2) + Math.pow(Lab[2], 2)), // Chroma
    hue >= 0 ? hue : hue + 360, // Hue, in degrees [0 to 360)
  ];
}

export function LCH_to_Lab(LCH: ColArray): ColArray {
  // Convert from polar form
  return [
    LCH[0], // L is still L
    LCH[1] * Math.cos((LCH[2] * Math.PI) / 180), // a
    LCH[1] * Math.sin((LCH[2] * Math.PI) / 180), // b
  ];
}
