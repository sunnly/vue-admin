import axios from "axios";
import {Message} from "element-ui";
import router from "../router";
import store from "../store";

//自己创建axios，里面可以加自定义都属性
const service = axios.create();
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // this.$store.setItem("token","hello,am token");

    // console.log(store.getItem("token"));
    config.headers["token"] = "hhsdfsdfsdf";
    Message.info("发送中");
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    Message.success("请求成功");
    // router.push({
    //     name: "About"
    // })
    // return ;
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default service;
