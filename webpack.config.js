const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = (webpackEnv, options) => {
  const isEnvProduction = options.mode  === 'production';
  // Get env file based on passed --mode option. See package,json scripts
  const envFilename = '.env' + (isEnvProduction ? '' : '.' + options.mode);
  const envPath = path.join(__dirname, envFilename);
  const processEnv = dotenv.config({path: envPath}).parsed;
  console.info('\x1b[36m' + '> REACT ENV:', envFilename, '\x1b[0m\n');
  return {
    devtool: isEnvProduction ? undefined : 'source-map',
    devServer: {
      historyApiFallback: true,
    },
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
    },
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      alias: {
        react: path.join(__dirname, 'node_modules', 'react'),
        // Custom modules import alias
        // Always add it also to tsconfig.json
        '@': path.join(__dirname, './src/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
          },
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        { 
          test: /\.xml/,
          type: 'asset/resource',
          generator: {
            filename: 'sitemap.xml',
          }
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        // it will automatically pick up key values from .env file
        'process.env': JSON.stringify(processEnv) 
     }),
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // It will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin({ 'PUBLIC_URL': processEnv.PUBLIC_URL }),
    ],
    stats: 'errors-warnings',
  }
};

