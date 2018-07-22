/**
 * webpack打包默认的插件
 */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let cwd = process.cwd();

let plusgins = [
    new VueLoaderPlugin()
]

/**
 * 支持多个模版渲染
 * @param {Object} webpackConfig 
 */
exports.getWebpackPlugin = (webpackConfig) => {
    if (webpackConfig && webpackConfig.webpackPlugin) {
        if (webpackConfig.webpackPlugin.templatePath) {
            let templatePath = webpackConfig.webpackPlugin.templatePath;
            if (Array.isArray(templatePath)) {
                templatePath.forEach(item => {
                    plusgins.push(
                        new HtmlWebpackPlugin({
                            template: path.resolve(cwd, item)
                        })
                    )
                })
            } else {
                throw new Error('项目 wksin.config.js 中配置模版路径格式不正确，必须是数组')
            }
        } else {
            throw new Error('没有在项目 wksin.config.js 中配置模版路径')
        }
    }

    return plusgins;
}