<template>
  <div class="editTableWrapper" ref="editTableWrapper" @wheel="wheel">
    <!-- 固定列头表格 西南方向 左下角部分-->
    <col-head
      v-if="colHead.length > 0"
      class="fix south__west"
      :onlyFix="true"
      :allRow="true"
      @popoverChange="popoverChange3"
      :style="southWestStyle"
    ></col-head>
    <!-- 固定列头部表格 西北方向 左上角部分 -->
    <col-head
      v-if="colHead.length > 0"
      class="fix north__west"
      :onlyFix="true"
      :allRow="false"
      @popoverChange="popoverChange3"
      :style="northWestStyle"
    ></col-head>
    <!-- 固定表头表格 东北方向 主体表头 右上角-->
    <row-head
      v-if="headers.length > 0"
      :headers="headers"
      class="fix north__east"
      :allRow="false"
      :style="northEastStyle"
      @popoverChange="popoverChange2"
      :isEdit="isEdit"
    ></row-head>
    <div :style="allTable">
      <row-head
        v-if="headers.length > 0"
        :headers="headers"
        class="fix north__east"
        :allRow="false"
        :style="northEastStyle1"
        @popoverChange="popoverChange2"
        :isEdit="isEdit"
      ></row-head>
      <!-- 表体数值部分   右下角 -->
      <value-table
        v-if="colHead.length > 0 && (list1.length > 0 || list2.length > 0)"
        :style="rightBottomStyle"
        :tableData.sync="tableData"
        @tdChange="tdChange"
        isEdit="isEdit"
      >
      </value-table>
    </div>

    <scroll-bar
      v-if="vBarSize > 0 && vBarSize < 100"
      :vertical="true"
      :size="vBarSize"
      :move="vMove"
      @scroll="vScroll"
    />
    <scroll-bar v-if="hBarSize > 0 && hBarSize < 100" :size="hBarSize" :move="hMove" @scroll="hScroll" />
  </div>
</template>
<script>
import "@/common/icon/icon-plus.svg";
import ColHead from "./ColHead.vue";
import ScrollBar from "@/common/component/ScrollBar.vue";
import RowHead from "./RowHead.vue";
import ValueTable from "./ValueTable.vue";
import scrollable from "./scrollable.js";

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

const convertToRows = originColumns => {
  let maxLevel = 1;
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children) {
      let colSpan = 0;
      column.children.forEach(subColumn => {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach(column => {
    column.level = 1;
    traverse(column);
  });
  const rows = [];
  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }
  const allColumns = getAllColumns(originColumns);

  allColumns.forEach(column => {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });

  let count = 0;
  let colRow = [];
  let lastData = [];
  let cell = [];
  for (let i = 0; i < maxLevel; i++) {
    cell.push(null);
  }
  allColumns.forEach(column => {
    let newCell = JSON.parse(JSON.stringify(cell));
    if (column.level === maxLevel || !column.children) {
      colRow[count] = newCell;
      count++;
    }
  });

  let colRowIndex = 0;
  allColumns.forEach(column => {
    if (column.level === maxLevel || !column.children) {
      colRow[colRowIndex][column.level - 1] = column;
      lastData.push(column);
      colRowIndex++;
    } else {
      colRow[colRowIndex][column.level - 1] = column;
    }
  });
  return { colRow: colRow, lastData: lastData };
};

//计算单元格的colSpan
/**
 * 计算单元格的colsapn，用于合并列
 * 计算单元格所属的层级
 * @param {*} originColumns，是指第一层级的元素
 */
const headersToRows = originColumns => {
  let maxLevel = 1;
  const traverse = (column, parent) => {
    if (parent) {
      //计算当前元素属于第几个层级
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        //计算最大层级
        maxLevel = column.level;
      }
    }
    if (column.children) {
      let colSpan = 0;
      column.children.forEach(subColumn => {
        //进行递归
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach(column => {
    column.level = 1;
    traverse(column);
  });
  const rows = [];
  let lastData = [];
  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }
  const allColumns = getAllColumns(originColumns);
  allColumns.forEach(column => {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
      lastData.push(column);
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });
  return { rows: rows, lastData: lastData };
};

export default {
  name: "EditTable",
  mixins: [scrollable],
  components: { RowHead, ColHead, ValueTable, ScrollBar },
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      count: 0,
      data: [],
      //初始化数据
      initTable: [],
      scrollX: 0,
      scrollY: 0,
      clientWidth: 0,
      clientHeight: 0,
      tdHeight: [],

      tableClientX: 0,
      tableClientY: 0,
      hoverDiv: {
        top: 0,
        left: 0,
        width: 0,
        rowIndex: -1,
        colIndex: -1
      },
      isFirst: 0,
      isVal: false,
      isValueData: 0,
      testData: [],
      expandAllColHead: [],
      actualAll: 0
    };
  },
  provide() {
    return {
      edit: this
    };
  },
  computed: {
    //表头的初始化数据
    headers() {
      let newArr = [];
      if (this.list1.length > 0) {
        this.headGrage(this.list1);
        newArr = this.list1;
        if (this.list2.length > 0) {
          newArr.forEach(x => {
            this.$set(x, "children", this.resetRightHeader);
          });
        }
      } else {
        if (this.list2.length > 0) {
          this.headGrage(this.resetRightHeader);
          newArr = this.resetRightHeader;
        }
      }
      if (this.list1.length > 0 || this.list2.length > 0) {
        this.headGrage(newArr);
        this.headWidthField(newArr);
      }
      this.giveAllId(newArr);
      this.giveFilterId(newArr);
      return newArr;
    },
    resetRow() {
      return headersToRows(this.headers);
    },
    //横向表头  tr和td的数据
    resetNewRowHead() {
      let data = this.resetRow;
      return data.rows;
    },
    lastDataRow() {
      let data = this.resetRow;
      return data.lastData;
    },
    //给横向表头增加children
    resetRightHeader() {
      let colHead = [];
      if (this.list2.length > 0) {
        var cache = [];
        var str = JSON.stringify(this.list2, function(key, value) {
          if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            } // Store value in our collection
            cache.push(value);
          }
          return value;
        });
        cache = null; // Enable garbage collection
        colHead = JSON.parse(str);

        for (let i = colHead.length - 1; i > -1; i--) {
          let newChildren = [];
          colHead[i].children && colHead[i].children.length > 0
            ? (newChildren = [...colHead[i].children])
            : (newChildren = [colHead[i]]);

          // this.colSpanCount(newChildren);
          if (colHead[i - 1]) {
            if (colHead[i - 1].children && colHead[i - 1].children.length > 0) {
              // let newHead = this.headGrage(colHead[i - 1].children);
              let newHead = this.headWidthField(colHead[i - 1].children);
              if (newHead) {
                newHead.forEach(x => {
                  let strNewChildren = JSON.parse(JSON.stringify(newChildren));
                  this.$set(x, "children", strNewChildren);
                  this.$set(x, "isExpand", true);
                });
              }
            } else {
              let strNewChildren = JSON.parse(JSON.stringify(newChildren));
              this.$set(colHead[i - 1], "children", strNewChildren);
            }
          }
        }
      }

      return [colHead[0]];
    },
    allHeadRow() {
      return this.headGrage(this.headers);
    },
    actualFields() {
      return this.headWidthField(this.headers);
    },
    allColHeadRow() {
      return this.headGrage(this.colHead);
    },
    colActualFields() {
      return this.headWidthField(this.colHead);
    },
    //横向表格的宽度
    colheadWidth() {
      let width = 0;
      if (this.colHead.length > 0) {
        if (this.resetNewColHead.length > 0) {
          this.resetNewColHead[0].forEach(() => {
            width += this.headColWidth;
          });
        }
      }
      return width;
    },
    actualHeight() {
      this.heightAdaption();
      let height = 0;
      if (this.list1.length > 0 || this.list2.length > 0) {
        height += this.headerHeight;
      }
      if (this.colHead.length > 0) {
        height += this.lastDataCol.length * (this.tableTdHeight + 1);
      }
      if (height < this.actualAll) {
        height = this.actualAll;
      }
      return height;
    },
    //reset 纵向表头的数据
    colHeaderData() {
      let colHead = this.resetColHeadRow;
      let grageHead = this.headGrage([colHead[0]]);
      this.headWidthField([colHead[0]]);
      let newArr = grageHead.slice(1);
      this.giveAllId(newArr[0]);
      this.giveFilterId(newArr[0]);
      return newArr[0];
    },
    //纵向表头tr 和td的数据
    resetCol() {
      return convertToRows(this.colHeaderData);
    },
    resetNewColHead() {
      let colRowData = this.resetCol;
      return colRowData.colRow;
    },
    lastDataCol() {
      let colRowData = this.resetCol;
      return colRowData.lastData;
    },

    tableData() {
      let arr = {};
      let row = [];
      let col = [];
      if (this.headers.length > 0) {
        row = this.lastDataRow;
      }
      if (this.colHead.length > 0) {
        col = this.lastDataCol;
      }
      col.forEach(x => {
        row.forEach(y => {
          let key = x.filterId + "__" + y.filterId;
          arr[key] = {
            hxId: x.filterId,
            zxId: y.filterId,
            value: ""
          };
        });
      });
      let val = this.getData;
      if (val && Object.keys(val).length > 0) {
        if (val.sj && val.sj.length > 0) {
          val.sj.forEach(x => {
            let key = x.rowId + "__" + x.colId;
            let obj = {
              hxId: x.rowId,
              zxId: x.colId,
              value: x.value
            };
            this.$set(arr, key, obj);
          });
        }
      }

      return arr;
    },
    resetColHeadRow() {
      var cache = [];
      let colHead = [];
      if (this.colHead.length > 0) {
        var str = JSON.stringify(this.colHead, function(key, value) {
          if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            } // Store value in our collection
            cache.push(value);
          }
          return value;
        });
        cache = null; // Enable garbage collection
        colHead = JSON.parse(str);

        for (let i = colHead.length - 1; i > -1; i--) {
          let newChildren = [];
          colHead[i].children && colHead[i].children.length > 0
            ? (newChildren = [...colHead[i].children])
            : (newChildren = [colHead[i]]);

          // this.colSpanCount(newChildren);
          if (colHead[i - 1]) {
            if (colHead[i - 1].children && colHead[i].children.length > 0) {
              // let newHead = this.headGrage(colHead[i - 1].children);
              let newHead = this.headWidthField(colHead[i - 1].children);
              if (newHead) {
                newHead.forEach(x => {
                  let strNewChildren = JSON.parse(JSON.stringify(newChildren));
                  this.$set(x, "children", strNewChildren);
                  this.$set(x, "isExpand", true);
                });
              }
            } else {
              let strNewChildren = JSON.parse(JSON.stringify(newChildren));
              this.$set(colHead[i - 1], "children", strNewChildren);
            }
          }
        }
      }

      return [...colHead];
    },
    //横向表头的高度
    headerHeight() {
      let height = this.allHeadRow.map(() => this.tableTdHeight).reduce((total, current) => total + current);
      return height;
    },
    actualWidth() {
      let width = 0;
      if (this.headers.length > 0) {
        width = this.lastDataRow.map(() => this.headColWidth).reduce((total, current) => total + current);
      } else {
        width = 0;
      }
      width = width + this.colheadWidth + this.allColHeadRow.length;
      return width;
    },
    actualWidth1() {
      let width = 0;
      if (this.headers.length > 0) {
        width = this.lastDataRow.map(() => this.headColWidth).reduce((total, current) => total + current);
      } else {
        width = 0;
      }
      return width;
    },

    editTableStyle() {
      return {
        height: "100%",
        width: `calc(100% - ${this.colheadWidth + this.allColHeadRow.length - 3}px)`,
        marginLeft: this.colheadWidth + this.allColHeadRow.length - 3 + "px"
      };
    },

    //左上角
    northWestStyle() {
      return {
        width: this.colheadWidth + "px"
        // height: this.tableHeaderHeight + "px"
      };
    },
    //左下角
    southWestStyle() {
      return { top: -this.scrollY + "px", width: this.colheadWidth + "px", left: "0px" };
    },
    //右上角
    northEastStyle() {
      return {
        position: "absolute",
        left: -this.scrollX + this.colheadWidth + "px",
        width: this.actualWidth1 + "px",
        minWidth: `calc(100% - ${this.colheadWidth}px)`,
        zIndex: 10,
        top: 0
      };
    },
    allTable() {
      return {
        position: "absolute",
        left: -this.scrollX + this.colheadWidth + "px",
        width: this.actualWidth1 + "px",
        minWidth: `calc(100% - ${this.colheadWidth}px)`,
        zIndex: 0,
        top: -this.scrollY + "px"
      };
    },
    northEastStyle1() {
      return {
        width: "100%",
        position: "relative"
      };
    },
    //右下角
    rightBottomStyle() {
      return {
        width: "100%",
        position: "relative"
      };
    }
  },
  props: {
    leftNav: Object,
    getData: Object,
    isEdit: {
      type: Boolean,
      default: true
    },
    listFirst: Array,
    listSecond: Array,
    listThree: Array,
    tableTdHeight: {
      type: Number,
      default: 40
    },
    headColWidth: {
        type: Number,
        default: 80
    },
    isHasData: {
      type: Number,
      default: 0
    },
    colHead: {
      type: Array,
      required: true
    },

    tableHeaderHeight: {
      type: Number,
      default: 40
    },
    editTable: {
      type: Object,
      required: true
    }
  },
  watch: {
    // getData(val) {
    //   debugger;
    //   if(val && Object.keys(val).length > 0) {
    //     // let key = x.filterId + "__" + y.filterId;
    //     //   arr[key] = {
    //     //     hxId: x.filterId,
    //     //     zxId: y.filterId,
    //     //     value: ""
    //     //   };
    //     if(val.sj && val.sj.length > 0) {
    //       val.sj

    //     }

    //   }
    // },
    listFirst: {
      immediate: true,
      deep: true,
      handler(val) {
        let value = [];
        val && val.length > 0 ? (value = val) : (value = []);
        this.list1 = JSON.parse(JSON.stringify(value));
      }
    },
    listSecond: {
      immediate: true,
      deep: true,
      handler(val) {
        let value = [];
        val && val.length > 0 ? (value = val) : (value = []);
        this.list2 = JSON.parse(JSON.stringify(value));
      }
    },
    listThree: {
      immediate: true,
      deep: true,
      handler(val) {
        let value = [];
        val && val.length > 0 ? (value = val) : (value = []);
        this.list3 = JSON.parse(JSON.stringify(value));
      }
    },
    data: {
      immediate: true,
      // deep: true,
      handler(val) {
        this.data = val;
        this.tdHeight = new Array(val.length);
        if (val && this.isFirst == 0) {
          this.initTable = JSON.parse(JSON.stringify(val));
          this.isFirst++;
        }
        this.tdHeight = new Array(this.data.length);
        this.$nextTick(() => {
          this.tableClientY = this.$refs.editTableWrapper.offsetTop;
          this.tableClientX = this.$refs.editTableWrapper.offsetLeft;
        });
        this.$emit("change", val);
      }
    }
  },
  mounted() {
    let self = this;
    this.heightAdaption();
    window.onresize = () => {
      if (self.currentSelect) {
        let parentTarget = "";
        if (self.currentSelect.target.nodeName == "TD") {
          parentTarget = self.currentSelect.target;
        } else {
          parentTarget = self.getParentTag(self.currentSelect.target);
        }
        self.drag.width = parentTarget.offsetWidth;
        self.drag.cirLeft = self.drag.width - 4;
        self.drag.cirTop = self.drag.height - 4;
        self.drag.clientX = parentTarget.offsetLeft;
        self.drag.clientY = parentTarget.offsetTop;
      }
      this.heightAdaption();
    };
  },
  methods: {
    popoverChange2(val) {
      this.$emit("popoverChange", val, "list2");
    },
    popoverChange3(val) {
      this.$emit("popoverChange", val, "list3");
    },
    tdChange(data) {
      this.$emit("tdChange", data);
    },

    // 将头部分级
    headGrage(data, arr = []) {
      if (arr.length < 1) arr = [this.forHead(data)];

      if (this.isChildren(data) > 0) {
        let two = [];
        data.forEach(x => {
          if (x.children && x.children.length > 0) two.push(...this.forHead(x.children, x));
        });
        arr = [...arr, two];
        return this.headGrage(two, arr);
      } else {
        return arr;
      }
    },

    //占宽度的头部
    headWidthField(data, arr = []) {
      if (this.isChildren(data) > 0) {
        let two = [];
        data.forEach(x => {
          if (x.children && x.children.length > 0) {
            two.push(...this.forHead(x.children, x));
          } else {
            arr.push(x);
          }
        });
        return this.headWidthField(two, arr);
      } else {
        let newData = [...arr, ...data];
        newData.forEach(x => {
          x.isExpand = true;
        });
        return [...arr, ...data];
      }
    },
    forHead(data, parent = {}) {
      let newData = [];
      data.forEach(x => {
        if (x.parentId) {
          newData.push(x);
        } else {
          x.parentId = Object.keys(parent).length > 0 ? parent.id : "";
          x.parentName = Object.keys(parent).length > 0 ? parent.name : "";
          newData.push(x);
        }
      });
      return newData;
    },
    isChildren(data) {
      let count = 0;
      data.forEach(x => {
        if (x.children && x.children.length > 0) count++;
      });
      return count;
    },
    giveAllId(data) {
      data.forEach(x => {
        this.giveItemAllId(x);
      });

      return data;
    },
    giveFilterId(data) {
      data.forEach(x => {
        this.giveItemFilterId(x);
      });
      return data;
    },
    giveItemFilterId(data) {
      if (data.filterId) {
        if (data.children && data.children.length > 0) {
          // this.giveAllId(data.children);
          data.children.forEach(x => {
            if (!x.filterId) {
              //如果没有filterId
              let filterId = data.filterId;
              let childrenFilterId = x.isExpand ? x.id : "";
              let split = "";
              filterId && childrenFilterId ? (split = "_") : (split = "");
              x.filterId = filterId + split + childrenFilterId;
            }
          });
          return this.giveFilterId(data.children);
        } else {
          return;
        }
      } else {
        let filterId = data.isExpand ? data.id : "";
        data.filterId = filterId;
        if (data.children && data.children.length > 0) {
          // this.giveAllId(data.children);
          data.children.forEach(x => {
            if (!x.filterId) {
              //如果没有filterId
              let childrenFilterId = x.isExpand ? x.id : "";
              let split = "";
              filterId && childrenFilterId ? (split = "_") : (split = "");
              x.filterId = filterId + split + childrenFilterId;
            }
          });
          return this.giveFilterId(data.children);
        } else {
          return;
        }
      }
    },
    giveItemAllId(data) {
      if (data.allId) {
        if (data.children && data.children.length > 0) {
          // this.giveAllId(data.children);
          data.children.forEach(x => {
            if (!x.allId && x.parentId) {
              if (x.parentId === data.id) {
                x.allId = data.allId + "_" + x.id;
                x.allName = data.allName + "_" + x.name;
              } else {
                x.allId = data.allId + "_" + x.parentId + "_" + x.id;
                x.allName = data.allName + "_" + x.parentName + "_" + x.name;
              }
            }
          });
          return this.giveAllId(data.children);
        } else {
          return;
        }
      } else {
        let pid = data.parentId ? data.parentId + "_" : "";
        let pName = data.parentName ? data.parentName + "_" : "";
        let allId = pid + data.id;
        let allName = pName + data.name;
        data.allId = allId;
        data.allName = allName;
        if (data.children && data.children.length > 0) {
          // this.giveAllId(data.children);
          data.children.forEach(x => {
            if (!x.allId && x.parentId) {
              if (x.parentId === data.id) {
                x.allId = allId + "_" + x.id;
                x.allName = allName + "_" + x.name;
              } else {
                x.allId = allId + "_" + x.parentId + "_" + x.id;
                x.allName = allName + "_" + x.parentName + "_" + x.name;
              }
            }
          });
          return this.giveAllId(data.children);
        } else {
          return;
        }
      }
    },

    heightAdaption() {
      this.$nextTick(() => {
        this.allTableHeight =
          this.$refs.editTableWrapper && this.$refs.editTableWrapper.offsetHeight
            ? this.$refs.editTableWrapper.offsetHeight
            : 0;
        this.allTableWidth =
          this.$refs.editTableWrapper && this.$refs.editTableWrapper.offsetWidth
            ? this.$refs.editTableWrapper.offsetWidth
            : 0;
      });
    },

    getParentTag(startTag) {
      var self = this;
      // 传入标签是否是DOM对象
      if (!(startTag instanceof HTMLElement)) return console.error("receive only HTMLElement");
      // 父级标签是否是body,是着停止返回集合,反之继续
      if ("BODY" !== startTag.parentElement.nodeName) {
        if (startTag.parentElement.nodeName == "TD") {
          return startTag.parentElement;
        } else {
          if (startTag.parentElement.parentElement) {
            return self.getParentTag(startTag.parentElement);
          } else {
            return false;
          }
        }
        // 再上一层寻找
      }
    }
  }
};
</script>
<style lang="scss">
.editTableWrapper {
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;

  .err-div {
    position: absolute;
    top: 10px;
    height: 20px !important;
    line-height: 20px !important;
    background: rgba(245, 108, 108, 0.1);
    border: 1px solid rgba(245, 108, 108, 0.4);
    font-size: 12px;
    color: #f56c6c;
    z-index: 1000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  table {
    table-layout: fixed;
  }
  th {
    background: #f0f2f5;
    font-size: 14px;
    color: #606266;
  }
}

.editTable {
  position: relative;
  overflow: hidden;
  // border: 1px solid #dcdfe6;
  border-top: 0;
  background: #fff;
  .th-div {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    div {
      height: 100%;
      .el-input {
        height: 100%;
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
    }
    .el-input__inner {
      height: 100%;
      line-height: 100%;
      border: 0;
      outline: 0;
      background: transparent;
      padding-left: 6px;
      padding-right: 15px;
    }
    .el-date-editor .el-input__inner {
      padding-left: 30px;
    }
    .el-range-separator {
      visibility: hidden;
    }
    .el-range-input {
      background: transparent;
    }
  }
}
.edit-table-add {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  border: 1px dashed #dcdfe6;
  color: #303133;
  margin-top: 10px;
  cursor: pointer;
  svg {
    fill: #333333;
    vertical-align: middle;
    margin-right: 6px;
  }
}
.north__west {
  position: absolute;
  left: 0px;
  top: 0px;
  background: #f0f2f5;
  font-size: 14px;
  color: #606266;
  z-index: 113;
  th {
    // background: #f0f2f5;
    background: #eaf8f0;
    font-size: 14px;
    color: #606266;
    z-index: 112;
    // border: 1px solid #dcdfe6
  }
}
.south__west {
  z-index: 111;
  position: absolute;
  left: 0px;
  top: 0;
  th {
    // background: #f0f2f5;
    background: #eaf8f0;
    font-size: 14px;
    color: #606266;
    z-index: 112;
  }
  td {
    font-size: 12px;
    // color: #606266;
    background: #eaf8f0;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // font-size: 11px;
    color: #6a6a6a;
    svg {
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }
}
.north__east {
  position: absolute;
  top: 0px;
  min-width: 100%;
  z-index: 110;
  font-size: 14px;
  color: #606266;
  th {
    background: #f7f3fe;
  }
}
.activity__table {
  min-width: 100%;
  th {
    background: #f0f2f5;
    font-size: 14px;
    color: #606266;
  }
  td {
    font-size: 12px;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // font-size: 11px;
    color: #6a6a6a;
  }
}

.editTable__block {
  user-select: none;
  position: absolute;
  border-collapse: collapse;
  padding: 0;

  & th,
  td {
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    font-size: 11px;
    color: #6a6a6a;
  }
}
.editTableWrapper {
  .el-input--small {
    .el-input__inner {
      border-color: transparent;
      background: transparent;
      font-size: 12px;
      color: #606266;
      outline: 0;
    }
  }
}

.icon-ser {
  cursor: pointer;
}
.editTableWrapper .editTable .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0;
}
.editTableWrapper .el-form-item--small .el-form-item__error {
  z-index: 100;
}
</style>
