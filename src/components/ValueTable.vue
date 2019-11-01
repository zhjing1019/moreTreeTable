<template>
  <!-- <div class="edit-row-head"> -->
  <table class="editTable__block value-table">
    <tr v-for="(x, xindex) in edit.lastDataCol" :key="xindex">
      <td v-for="(y, yindex) in edit.lastDataRow" :key="yindex + '_' + xindex" :style="tdStyle">
        --
      </td>
    </tr>
  </table>

  <!-- </div> -->
</template>

<script>
export default {
  inject: ["edit"],
  props: {
    tableData: Object
  },
  watch: {
    tableData: {
      immediate: true,
      deep: true,
      handler(val) {
        this.valueData = val;
        this.tableData = val;
      }
    },
    valueData: {
      deep: true,
      handler(val) {
        this.$emit("updata:tableData", val);
      }
    }
  },

  data() {
    return {
      valueData: {},
      tdStyle: {
        width: this.edit.headColWidth + "px",
        height: this.edit.tableTdHeight + "px",
        textAlign: "center"
      }
    };
  },
  methods: {
    change(data) {
      this.$emit("tdChange", data);
    }
  }
};
</script>

<style lang="scss">
.value-table {
  table {
    table-layout: fixed;
  }
  .el-table td {
    padding: 0 !important;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-table th {
    padding: 0 !important;
    height: 39px;
    line-height: 39px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-table .cell {
    padding: 0;
    padding-left: 0;
  }
  .el-input__inner {
    border: 0;
    background: transparent;
  }
}

// }
</style>
