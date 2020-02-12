<template>
  <div class="list">
    <Title
      class="list-title"
      :today="prov.today"
      :total="prov.total"
      :title="prov.name + ` 疫情统计`"
      :style="{ fontSize: `small` }"
    />
    <div class="list-table">
      <el-table
        class="table"
        size="mini"
        :data="tableData"
        style="font-size: 12px"
        :row-style="{ height: 0 }"
        :cell-style="{ padding: 0 }"
        :span-method="objectSpanMethod"
        stripe
        default-expand-all
      >
        <el-table-column prop="name" label="城市" align="center" width="110">
        </el-table-column>
        <el-table-column prop="kind" label=" " align="center" width="35">
        </el-table-column>
        <el-table-column prop="confirm" label="确诊" align="center">
        </el-table-column>
        <el-table-column prop="suspect" label="疑似" align="center" width="70">
        </el-table-column>
        <el-table-column prop="heal" label="治愈" align="center" width="70">
        </el-table-column>
        <el-table-column prop="dead" label="死亡" align="center" width="70">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Title from "./Title";
export default {
  name: "List",
  components: { Title },
  props: {
    prov: {
      type: Object,
      required: true
    }
  },
  computed: {
    tableData: function() {
      let arr = [];
      if (this.prov["children"] !== undefined) {
        this.prov["children"].forEach(city => {
          let td = { name: city["name"], kind: "↑" };
          let tt = { name: city["name"], kind: "总" };
          Object.assign(td, city["today"]);
          Object.assign(tt, city["total"]);
          arr.push(tt, td);
        });
      }

      return arr;
    }
  },
  methods: {
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.list
  display flex
  flex-direction column
  justify-content space-between
  .list-title
    height 8.5%
    margin-top 2.5px
  .list-table
    margin 7.5px
    height 86.5%
    .table
      height 100%
      overflow-x hidden
      overflow-y auto
    .table::-webkit-scrollbar
      width: 5px;
      height: 0;
      background-color: transparent;
    .table::-webkit-scrollbar-track
      -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: #FFF;
    .table::-webkit-scrollbar-thumb
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,.3);
      background-color: #AAA;
</style>
