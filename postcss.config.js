module.exports = {
  plugins: {
    stylelint: {},
    autoprefixer: { browsers: ["last 2 versions", "IE 10"] },
    cssnano: [
      "default",
      {
        discardComments: {
          removeAll: true
        }
      }
    ]
  }
};
