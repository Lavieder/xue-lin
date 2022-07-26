const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量
        additionalData: `
          @import "@/assets/css/variable.scss";
        `
      }
    }
  },
  // vant 组件按需加载
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()]
      })
    ],
    resolve: {
      // 设置路径别名
      alias: {
        assets: '@/assets',
        components: '@/components',
        network: '@/network',
        utils: '@/utils',
        views: '@/views'
      }
    }
  }
})
