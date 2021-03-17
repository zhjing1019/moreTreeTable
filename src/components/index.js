import MoreTreeTable from "./MoreTreeTable.vue";
// 为组件添加 install 方法，用于按需引入
MoreTreeTable.install = function(Vue) {
  Vue.component(MoreTreeTable.name, MoreTreeTable);
};
export default MoreTreeTable;
