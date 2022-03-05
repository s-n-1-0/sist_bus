const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
    entry: {
        'index':"./src/index.ts",
    },
    output: {
        path: path.join(__dirname, '../docs/bundle'),
        filename: `[name].js`,
    },
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader',
            ]
          },
          {
            test: /\.ts$/,
            loader: "ts-loader",
            include: __dirname,
            options:{
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
    },
    resolve:{
        alias:{
          vue: "vue/dist/vue.esm-bundler.js"
        },
        extensions: [".js", ".vue",".ts"]
    },
    externals: {
    },
    plugins: [new VueLoaderPlugin(),
              new webpack.DefinePlugin({
                __VUE_PROD_DEVTOOLS__: false
              })]
};