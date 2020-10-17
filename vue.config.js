const path = require("path");
module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.join(__dirname, "src"))
      .set("components", path.join(__dirname, "src/components"));
  },
};
