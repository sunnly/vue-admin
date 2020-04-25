import Vue from "vue";

import Svgicon from "./Svgicon";

Vue.component("svg-icon",Svgicon);

//读取指定目录的所有文件，是否遍历子目录 结尾文件
const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => {
    // console.log(requireContext.keys());
    return requireContext.keys().map(requireContext);
}
requireAll(req);