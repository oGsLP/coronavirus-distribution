module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "component",
      {
        libraryName: ["element-ui","echarts"],
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
