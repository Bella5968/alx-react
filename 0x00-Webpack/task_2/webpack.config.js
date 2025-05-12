const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  entry: './js/dashboard_main.js', // Entry point for your JavaScript
  output: {
    filename: 'bundle.js',  // Output the bundled file as "bundle.js"
    path: path.resolve(__dirname, 'public'),  // Output directory
    clean: true  // Clean the build folder on each build
  },
  mode: 'production',  // Set mode to production
  module: {
    rules: [
      {
        test: /\.css$/,  // Use CSS loader for CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,  // For handling images (like jpg, png)
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',  // Output images to "assets" folder
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ALX Dashboard',
      template: './public/index.html',  // Use this as the template for the HTML
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['imagemin-mozjpeg', { quality: 70 }],
          ['imagemin-pngquant', { quality: [0.65, 0.90], speed: 4 }],
        ],
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
