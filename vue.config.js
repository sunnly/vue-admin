const path = require("path");
module.exports = {
    //基本路径：publicPath取代了baseUrl
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    // 输出文件目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    //关键点在这  原来的 Compiler 换成了 runtimeCompiler
    runtimeCompiler: true,
    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: () => {},
    configureWebpack:{
        resolve: {
            extensions: ['.js', '.json', '.vue'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                'public': path.resolve(__dirname, './src/public'),
                'components': path.resolve(__dirname, './src/components'),
                'common': path.resolve(__dirname, './src/common'),
                'api': path.resolve(__dirname, './src/api'),
                'views': path.resolve(__dirname, './src/views'),
                'data': path.resolve(__dirname, './src/data')
            }
        }
    },
    //生产环境是否生成sourceMap文件
    productionSourceMap: false,
    //Css相关配置
    css:{
        //是否使用css分离插件 ExtractTextPlugin
        // extract: true,
        //开启CSS source maps?
        sourceMap: false,
        //css预设器配置项
        loaderOptions: {
            sass: {
                //prependData：旧版本为data
                prependData: '@import "@/assets/styles/main.scss";'
            }
        },
        //启用css modules for all / pre-processor files.
        modules: false
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    // 配置 webpack-dev-server 行为。
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
        proxy: null, // string | Object
        before: app => {}
    },
    //第三方插件
    pluginOptions: {}
}