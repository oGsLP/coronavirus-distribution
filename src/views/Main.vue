<template>
  <div class="main">
    <div class="left-part">
      <Title
        id="title"
        :today="nation.today"
        :total="nation.total"
        :title="`全国新型冠状病毒分布图`"
      />
      <div ref="map" id="map"></div>
    </div>
    <List class="right-part" :prov="listData" />
  </div>
</template>

<script>
import "echarts/map/js/china";
import Title from "./Title";
import List from "./List";

import getTime from "../util/getTime";

export default {
  name: "Main",
  components: {
    Title,
    List
  },
  data() {
    return {
      updateTime: getTime(),
      nation: {
        total: {},
        today: {}
      },
      provinces: [],
      listData: {},
      graphData: [],
      chart: {},
      mockNanHai: { name: "南海诸岛", total: { confirm: null } }
    };
  },
  created() {
    // let that = this;
    // this.getData().then(function() {
    //   that.drawGraph();
    // });
  },
  mounted() {
    this.initGraph();
    let that = this;
    this.getData().then(() => {
      that.drawGraph();
    });
  },
  computed: {},
  methods: {
    async getData() {
      this.handleData(
        await this.$axios
          .get("/api/g2/getOnsInfo?name=disease_h5")
          .then(res => JSON.parse(res.data.data))
      );
    },
    handleData(data) {
      this.updateTime = data["lastUpdateTime"];
      this.nation.total = data["chinaTotal"]; // confirm suspect dead heal
      this.nation.today = data["chinaAdd"]; // confirm suspect dead heal isUpdated
      let provinces = data["areaTree"][0]["children"];
      provinces.push(this.mockNanHai);
      this.provinces = provinces;
      // let that =this;
      provinces.forEach(prov => {
        this.graphData.push({
          name: prov["name"],
          value: prov["total"]["confirm"]
        });
      });
    },
    initGraph() {
      const map = this.$refs.map;
      this.chart = this.$echarts.init(map);
      this.chart.showLoading();
    },
    async drawGraph() {
      let option = {
        title: {
          text: "Latest Update",
          subtext: `  ${this.updateTime}`,
          left: "center",
          top: "10%"
        },
        tooltip: {},
        toolbox: {
          show: true,
          right: "20",
          top: "middle",
          orient: "vertical",
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          min: 0,
          max: 1500,
          left: "20",
          bottom: "20",
          orient: "horizontal",
          text: ["高", "低"], //取值范围的文字
          inRange: {
            color: ["#FFFAF5", "#ac0000"] //取值范围的颜色
          },
          itemWidth: 15,
          itemHeight: 180,
          show: true //图注
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          roam: true,
          zoom: 1.25,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: "rgba(0,0,0,0.4)"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.1)"
            },
            emphasis: {
              areaColor: "#fff42b",
              shadowOffsetX: 7,
              shadowOffsetY: 0,
              shadowBlur: 25,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.6)"
            }
          }
        },
        series: [
          {
            name: "确诊人数",
            type: "map",
            geoIndex: 0,
            data: this.graphData
          }
        ]
      };
      this.chart.setOption(option);
      let that = this;
      this.chart.on("click", function(param) {
        that.listData = that.getProvince(param.name);
        // todo
      });
      this.chart.hideLoading();
      this.listData = this.getProvince("江苏");
    },
    getProvince(name) {
      for (let prov of this.provinces)
        if (prov.name === name) {
          return prov;
        }
    }
  }
};
</script>

<style lang="stylus" scoped>
.main
  margin 0 1%
  width 98%
  height 700px
  /*border 1px solid black*/
  display flex
  flex-direction row
  justify-content space-around
  .left-part,.right-part
    margin 0 0.5%
    box-shadow 0 4px 4px 0 rgba(0,0,0,0.3)
    border-radius 4px
    /*border 1px solid black*/
  .left-part
    width 67%
    display flex
    flex-direction column
    justify-content space-around
    #title
      /*border 1px solid black*/
      height 10%
    #map
      height 88%
      width 99%
      margin 0 0.5%
      min-height 300px
      min-width 450px
  .right-part
    width 31%
</style>
