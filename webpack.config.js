const {webpackConfig, relDir} = require("./webpack.common");

module.exports = {
  entry: {
    index: relDir("src/index.ts"),
    demo: relDir("src/demo.ts"),
    lch: relDir("src/demo/lch.ts"),
    colorwheel: relDir("src/demo/colorwheel.ts"),
    interpolate: relDir("src/demo/interpolate.ts"),
    premultiply: relDir("src/demo/premultiply.ts"),
  },
  ...webpackConfig(false),
};
