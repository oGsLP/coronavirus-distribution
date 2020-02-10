/**
 * @Author: XYF
 * @Created: 20/02/10 15:43
 * @Filename: vue.config.js
 * @Function:
 */

const path = require("path");

module.exports={
  devServer:{
      proxy:{
        '/api':{
          target: 'https://view.inews.qq.com/',
          changeOrigin: true,
          pathRewrite:{
            '^/api':''
          }
        }
      }
  }
};
