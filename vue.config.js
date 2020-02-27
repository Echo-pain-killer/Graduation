module.exports = {
    publicPath : './',
    outputDir :'dist',
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

  