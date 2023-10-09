const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
//require package functionalities

module.exports = () => { //export webpack configs
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [ //configures plugins
      new HtmlWebpackPlugin({ //sets html template
        template: './index.html',
        title: 'Web App',
      }),
      new InjectManifest({ //sets cache config files
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      new WebpackPwaManifest({ //sets webpack specifics 
        fignerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'Jate',
        description: 'Jate Installer',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [ //sets path to icon/logo
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),

      new MiniCssExtractPlugin(),
      new WorkboxPlugin.GenerateSW(),

    ],

    module: {
      rules: [{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
          },
        },
      },
      ],
    },
  };
};
