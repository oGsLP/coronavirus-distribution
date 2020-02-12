/**
 * @Author: XYF
 * @Created: 20/02/10 15:43
 * @Filename: vue.config.js
 * @Function:
 */

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5
        target: "https://view.inews.qq.com/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
