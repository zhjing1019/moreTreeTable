<template>
  <div class="standard-cascader">
    <el-popover
      :placement="position"
      width="440"
      trigger="click"
      v-model="visible"
      popper-class="stand-cascader-popover"
    >
      <div class="popover-title">{{ idObj.name }}</div>

      <el-cascader-panel
        v-model="value"
        :options="options"
        :props="{
          multiple: true,
          value: 'id',
          label: 'name',
          emitPath: false
        }"
      ></el-cascader-panel>
      <div class="popover-footer">
        <el-button
          size="mini"
          type="text"
          @click="
            () => {
              this.visible = false;
            }
          "
          >取消</el-button
        >
        <el-button size="mini" type="primary" @click="popoverChange">确定</el-button>
      </div>
      <div
        slot="reference"
        class="th-popover"
        @click="colThClick(data)"
        :style="{ lineHeight: height + 'px', textAlign: 'center', height: height + 'px' }"
      >
        {{ data.name }}
      </div>
    </el-popover>
  </div>
</template>

<script>
const getAllColumns = columns => {
  const result = [];
  columns.forEach(column => {
    if (column.children) {
      result.push(column);
      result.push.apply(result, getAllColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};
export default {
  props: {
    height: Number,
    data: Object,
    list: Array,
    position: {
      type: String,
      default: "right"
    }
  },
  data() {
    return {
      visible: false,
      options: [],
      idObjChildren: [],
      title: "",
      value: [],
      idObj: {}
    };
  },
  watch: {
    options: {
      deep: true,
      handler(val) {
        if (val && val.length > 0) {
          let allData = getAllColumns(val);
          let arr = [];
          allData.forEach(x => {
            if (x.isChoose) arr.push(x.id);
          });
          this.value = arr;
        }
      }
    }
  },

  computed: {},
  methods: {
    popoverChange() {
      if (this.value.length > 0) {
        this.visible = false;
        this.$emit("popoverChange", this.value);
      } else {
        this.$message.error("必须选择一项！");
      }
    },

    colThClick(data) {
      if (data) {
        this.title = data.name;
        let arr = data.allId ? data.allId.split("_") : [data.id];
        let idObj = {};
        for (let i = this.list.length - 1; i > -1; i--) {
          for (let j = arr.length - 1; j > -1; j--) {
            if (arr[j] === this.list[i].id) {
              idObj = this.list[i];
              break;
            }
          }
        }
        idObj.children && idObj.children.length > 0 ? (this.idObjChildren = idObj.children) : (this.idObjChildren = []);
        this.idObj = idObj;
        this.options = this.idObjChildren;
      }
    }
  }
};
</script>

<style lang="scss">
.standard-cascader {
  min-width: 100%;
}
.stand-cascader-popover {
  padding: 0;
  .popover-title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #dcdfe6;
    padding: 0 12px;
    color: #303133;
    font-size: 16px;
    font-weight: bold;
  }
  .th-popover {
    width: 100%;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .el-popover__reference {
    width: 100%;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .popover-footer {
    height: 48px;
    line-height: 48px;
    text-align: right;
    border-top: 1px solid #dcdfe6;
    padding: 0 12px;
  }
  .el-cascader-panel {
    overflow: auto;
  }
  .is-bordered {
    border: 0;
  }
}
</style>
