// const path = require('path');

// module.exports = {
//   resolve: {
//     alias: {
//       path: require.resolve('path-browserify'),
//     },
//   },
// };

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  webpack: {
    plugins: [
      new BundleAnalyzerPlugin(),
    ],
  },
};


// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.(webp|jpg|jpeg|png|gif|svg)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name].[hash].[ext]',
//               outputPath: 'images/', // Output directory for images
//             },
//           },
//         ],
//       },
//     ],
//   },
// };

