import service from "@/utils/request";
import {Message} from "element-ui";
console.log(process.env.VUE_APP_MAIN_COLOR);
export function Login() {
    service.request({
        method: "GET",
        url: "/api/banner/web/getWebBannerList",
        data: {
            page: 0,
            pageRows: 3,
            bannerSite: "index"
        }
    }).then(res=>{
        console.log(res);
        Message.success("获取到数据啦");

    })
}