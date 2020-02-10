<template>
  <div id="graph">
    <p>{{ this.data.china.total.suspect }}</p>
    <div ref="map" id="map" style="width: 900px;height: 600px"></div>
  </div>
</template>

<script>
import "echarts/map/js/china";

export default {
  name: "Graph",
  data() {
    return {
      data: {
        china: {
          total: {},
          today: {},
          provinces: []
        },
        js: {
          today: {},
          total: {},
          cities: []
        },
        yz: {}
      },
      chart: {}
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
    fetchData() {
      return this.$axios
        .get("/api/g2/getOnsInfo?name=disease_h5")
        .then(res => JSON.parse(res.data.data));
    },
    async getData() {
      let data = await this.fetchData();
      let china = data["areaTree"][0];
      this.data.china.total = china["total"]; // confirm suspect dead heal
      this.data.china.today = china["today"]; // confirm suspect dead heal isUpdated
      china["children"].forEach(prov => {
        this.data.china.provinces.push({
          name: prov["name"],
          value: prov["total"]["confirm"]
        });
      });
      let su = china["children"][7];
      this.data.js.total = su["total"];
      this.data.js.today = su["today"];
      su["children"].forEach(city => {
        if (city["name"] === "扬州") {
          this.data.yz = city;
        } else {
          Object.assign(city, city["total"]);
          delete city["today"];
          delete city["total"];
          this.data.js.cities.push(city);
        }
      });
    },
    initGraph() {
      const map = this.$refs.map;
      this.chart = this.$echarts.init(map);
      this.chart.showLoading();
    },
    async drawGraph() {
      // {
      //     china: {
      //         total,
      //         today,
      //         provinces
      //     },
      //     js: {
      //         today: su_today,
      //         total: su_total,
      //         cities
      //     },
      //     yz,
      //     su
      // }

      let option = {
        tooltip: {},
        visualMap: {
          min: 0,
          max: 1500,
          left: "left",
          top: "bottom",
          text: ["高", "低"], //取值范围的文字
          inRange: {
            color: ["#FFFAF5", "#ac0000"] //取值范围的颜色
          },
          show: true //图注
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          roam: true,
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
              areaColor: "#e4b2ff",
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
            data: this.data.china.provinces
          }
        ]
      };
      this.chart.setOption(option);
      this.chart.hideLoading();
    }
  }
};
</script>

<style scoped></style>
