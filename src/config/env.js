/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = 'http://192.168.10.102:9988/dialog-api';
//let baseUrl = 'http://127.0.0.1:8082/dialog-api';
let routerMode = 'history';
let imgBaseUrl = 'http://192.168.10.102:9988/dialog-api/';
//let imgBaseUrl = 'http://127.0.0.1:8082/dialog-api/';

if (process.env.NODE_ENV == 'development') {

} else if (process.env.NODE_ENV == 'production') {

    // baseUrl = 'http://cangdu.org:8001';
}

export {
    baseUrl,
    routerMode,
    imgBaseUrl,
}