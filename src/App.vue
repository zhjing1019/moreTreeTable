<template>
  <div id="app">
    <more-tree-table :colHead="colHead" :rowHead="rowHead"></more-tree-table>
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
#app {

}
</style>
