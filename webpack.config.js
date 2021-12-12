const path = require("path");

module.exports = {
  entry: {
    lib: path.resolve(__dirname, "src/color.ts"),
    lch: path.resolve(__dirname, "src/demo/lch.ts"),
    colorwheel: path.resolve(__dirname, "src/demo/colorwheel.ts"),
    interpolate: path.resolve(__dirname, "src/demo/interpolate.ts"),
    premultiply: path.resolve(__dirname, "src/demo/premultiply.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "parsegraph-color.[name].js",
    globalObject: "this",
    library: "parsegraph_color",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["ts-shader-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".glsl"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  mode: "development",
  devtool: "eval-source-map",
};
