<template>
  <div class="more-app">
    <more-tree-table :colData="colHead" :rowData="rowHead"></more-tree-table>
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
      rowHead: moreTreeTableJs.rowHead
    }
  }
}
</script>

<style>
.more-app{
  width: 100vw;
  height: 100vh;
  padding: 20px;
}
</style>
