// webpack.config.js
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

function loadCRAStyleEnv(mode) {
  // Orden al estilo CRA:
  // .env, .env.local, .env.{mode}, .env.{mode}.local
  const files = [
    '.env',
    '.env.local',
    `.env.${mode}`,
    `.env.${mode}.local`,
  ].filter(f => fs.existsSync(f));

  files.forEach(file => {
    const res = dotenv.config({ path: file });
    dotenvExpand.expand(res);
  });

  // Exponer SOLO REACT_APP_* + NODE_ENV + PUBLIC_URL (como CRA)
  const raw = {};
  Object.keys(process.env).forEach(k => {
    if (k === 'NODE_ENV' || k === 'PUBLIC_URL' || k.startsWith('REACT_APP_')) {
      raw[k] = process.env[k];
    }
  });

  // Mapear para DefinePlugin
  const stringified = {};
  Object.keys(raw).forEach(k => {
    stringified[`process.env.${k}`] = JSON.stringify(raw[k]);
  });

  return { raw, stringified };
}

module.exports = (env, argv) => {
  const mode = argv.mode === 'production' ? 'production' : 'development';
  const isDev = mode === 'development';
  const { stringified, raw } = loadCRAStyleEnv(mode);

  return {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDev ? 'static/js/bundle.js' : 'static/js/[name].[contenthash:8].js',
      assetModuleFilename: 'static/media/[name].[hash][ext][query]',
      publicPath: '/', // comportamiento CRA para rutas SPA
      clean: true
    },
    mode,
    devtool: isDev ? 'eval-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { runtime: 'automatic' }]
              ]
            }
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        // Imágenes y fuentes como hace CRA
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 10 * 1024 } } // inline <10KB
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true, // react-router funcionando como CRA
      open: true,
      client: {
        overlay: true
      }
      // Si quieres proxy tipo CRA:
      // proxy: { '/api': { target: 'http://localhost:5007', changeOrigin: true } }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        // Simular %PUBLIC_URL% de CRA
        templateParameters: {
          PUBLIC_URL: raw.PUBLIC_URL || ''
        },
        favicon: fs.existsSync('public/favicon.ico') ? 'public/favicon.ico' : undefined
      }),
      new webpack.DefinePlugin({
        ...stringified,
        'process.env.NODE_ENV': JSON.stringify(mode)
      })
    ],
    performance: { hints: false }
  };
};
