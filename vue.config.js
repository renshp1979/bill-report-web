module.exports = {
    chainWebpack: config => {
        // 移除 prefetch 插件 开启异步加载路由
        config.plugins.delete('prefetch')
    },
    transpileDependencies: [

    ],
    publicPath: './',
    outputDir:'dist',
    lintOnSave: false,
    productionSourceMap: false
};
