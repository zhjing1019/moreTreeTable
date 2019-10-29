<template>
  <el-table-column :label="coloumnHeader.name" :prop="coloumnHeader.filterId" align="center">
    <template v-for="item in coloumnHeader.children">
      <tableColumn
        v-if="item.children && item.children.length"
        :key="item.allId"
        :coloumn-header="item"
        @change="change"
      ></tableColumn>
      <el-table-column v-else :key="item.allId" :label="item.name" :prop="item.filterId" align="center">
        <template slot-scope="scope">
          <!-- <el-input
            v-if="isEdit"
            size="mini"
            v-model="scope.row[item.filterId]"
            placeholder=""
            @change="change(scope.row, item.filterId)"
            @keyup.enter.native="change(scope.row, item.filterId)"
          ></el-input> -->
          <div>
            1111
          </div>
          <!-- <span v-else>--</span> -->
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "tableColumn",
  props: {
    coloumnHeader: {
      type: Object,
      required: true
    },
    isEdit: Boolean
  },
  methods: {
    change(row, column, index) {
      this.$emit("change", row, column, index);
    }
  }
};
</script>

<style scoped></style>
