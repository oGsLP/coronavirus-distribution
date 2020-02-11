<template>
  <div class="list">
    {{ prov.name }}
    <el-table
      class="table"
      size="mini"
      :data="tableData"
      style="width: 100%;font-size: 12px"
      :row-style="{ height: 0 }"
      :cell-style="{ padding: 0 }"
      :span-method="objectSpanMethod"
      fit
      stripe
      border
    >
      <el-table-column prop="name" label="城市" align="center" width="100">
      </el-table-column>
      <el-table-column prop="kind" label=" " align="center" width="50">
      </el-table-column>
      <el-table-column prop="confirm" label="确诊" align="center" width="80">
      </el-table-column>
      <el-table-column prop="suspect" label="疑似" align="center" width="65">
      </el-table-column>
      <el-table-column prop="heal" label="治愈" align="center" width="60">
      </el-table-column>
      <el-table-column prop="dead" label="死亡" align="center" width="60">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "List",
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
          console.log(city);
          let td = { name: city["name"], kind: "↑" };
          let tt = { name: city["name"], kind: "总和" };
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
.table
  max-height 80%
  overflow-x hidden
  overflow-y scroll
</style>
