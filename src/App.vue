<template>
  <div class="more-app">
    <h3>多表头表格</h3>
    <more-tree-table :colData="colHead" :rowData="rowHead" :tableValue="tableValue1"></more-tree-table>
    <br>
    <hr>
    <br>
    <h3>竖向表头表格</h3>
    <more-tree-table :colData="colHead" :tableValue="tableValue2"></more-tree-table>
    <br>
    <hr>
    <br>
    <h3>横向表头表格</h3>
    <more-tree-table :rowData="rowHead" :tableValue="tableValue2"></more-tree-table>

  </div>
</template>

<script>
import moreTreeTableJs from "./moreTreeTableJs"

export default {
  name: 'app',
  data() {
    return {
      moreTreeTableJs: moreTreeTableJs,
      colHead: moreTreeTableJs.colHead,
      rowHead: moreTreeTableJs.rowHead,
      tableValue1: moreTreeTableJs.tableValue1,
      tableValue2: moreTreeTableJs.tableValue2,
      tableValue3: moreTreeTableJs.tableValue3
    }
  }
}
</script>

<style>
.more-app{
  width: calc(100vw - 140px);
  height: 400px;
}
</style>
