module.exports = {
  transpileDependencies: ['vuetify'],
  "publicPath": "./",
  "configureWebpack": {
    "module": {
      "rules": [
        {
          "test": /\.md$/,
          "loader": 'raw-loader',
          "exclude": /(node_modules)/,
        }
      ]
    }
  }
}