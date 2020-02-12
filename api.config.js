/**
 * @Author: XYF
 * @Created: 20/02/12 14:40
 * @Filename: api.config.js
 * @Function:
 */
//判断是否是生产环境
let isPro = process.env.NODE_ENV === "production"; //process.env.NODE_ENV用于区分是生产环境还是开发环境
//根据环境不同导出不同的baseURL
module.exports = {
  baseURL: isPro ? "https://view.inews.qq.com/" : "/api"
};
