// 导入单个组件
import MoreTreeTable from "./components/index.js";

const components = [
    MoreTreeTable,
];

const install = function(Vue) {
  if (install.installed) return;
  install.installed = true;

  components.map(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export {
    MoreTreeTable,
};
export default {
  install
};
