const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => config.resolve.symlinks(false)
});
