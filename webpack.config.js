//引入一个包
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
//webpack中所有配置信息
module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        environment: {
            arrowFunction: false // 关闭webpack的箭头函数，可选
        }

    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [{
            //test 规则生效的文件
            test: /\.ts$/,
            // 要使用的loader
            use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                //指定环境的插件
                                "@babel/preset-env",
                                // 配置信息
                                {
                                    // 要兼容的目标浏览器
                                    "targets": {
                                        "chrome": "58",
                                        "ie": "11"
                                    },
                                    //指定corejs的版本
                                    "corejs": "3",
                                    //使用方式 ‘usage‘ 为按需加载
                                    "useBuiltIns": "usage"
                                }
                            ]
                        ]
                    }
                },
                {
                    loader: "ts-loader",
                }
            ],
            // 排除编译的文件路径
            exclude: /node_modules/
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ]
}