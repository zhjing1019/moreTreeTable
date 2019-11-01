<template>
  <div class="more-app">
    <!-- <h3>多表头表格</h3> -->
    <more-tree-table :colData="colHead" :rowData="rowHead"></more-tree-table>
    <!-- <br>
    <hr>
    <br>
    <h3>竖向表头表格</h3>
    <more-tree-table :colData="colHead" :tableValue="tableValue2"></more-tree-table> -->

  </div>
</template>

<script>
import MoreTreeTable from "./components/MoreTreeTable"
import moreTreeTableJs from "./moreTreeTableJs"

export default {
  name: 'app',
  components: {
    MoreTreeTable
  },
  data() {
    return {
      moreTreeTableJs: moreTreeTableJs,
      colHead: moreTreeTableJs.colHead,
      rowHead: moreTreeTableJs.rowHead,
      tableValue1: moreTreeTableJs.tableValue1,
      tableValue2: moreTreeTableJs.tableValue2,
      tableValue3: moreTreeTableJs.tableValue3,

    }
  }
}
</script>

<style>
.more-app{
  width: 100vw;
  height: 100vh;

}
</style>
