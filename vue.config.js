module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    // 打包时不生成.map文件 避免看到源码
    productionSourceMap: false,
    
    // filenameHashing: false

    css: {
        extract: true   //是否将组件的样式提取出出单独的css文件
    }
}