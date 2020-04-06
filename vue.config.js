module.exports = {
    productionSourceMap: false,
    publicPath : './',
    configureWebpack: {
      resolve: {
        alias: {
          'views': '@/views',
          'components': '@/components',
          'network': '@/network',
          'common': '@/common',
          'assets': '@/assets',
        }
      }
    }
  }

  