module.exports = {
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

/*
module: {
  rules: [
    {
      test: /\.md$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        'vue-loader',
        {
          loader: 'markdown-to-vue-loader',
          options: {
              exportSource: true    // この設定でMarkdownのRawデータを読み込めるようにする
          },
        },
      ],
    },
  ],
}
*/
