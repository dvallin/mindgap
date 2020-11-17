/* eslint-disable */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const mode = isProduction ? 'production' : 'development'

const plugins = [new ForkTsCheckerWebpackPlugin(), new HtmlWebpackPlugin({ template: 'src/index.html' })]

module.exports = {
  mode,
  entry: {
    main: ['./src/index'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      react: path.resolve(path.join(__dirname, './node_modules/react')),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [['@babel/plugin-proposal-class-properties']],
          },
        },
      },
    ],
  },
  plugins,
}
