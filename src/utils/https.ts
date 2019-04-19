import axios from "axios";
import { Message, MessageBox } from 'element-ui'
// 创建axios实例
let service: any = {};
if (process.env.NODE_ENV === "development") {
  service = axios.create({
    baseURL: "http://192.168.0.142:3000/", // api的base_url
    timeout: 50000 // 请求超时时间
  });
} else {
  // 生产环境下
  service = axios.create({
    baseURL: "0.0.0.0:3000/", // api的base_url
    timeout: 50000 // 请求超时时间
  });
}

// console.log('process.env.BASE_URL',process.env.BASE_URL)
// request拦截器 axios的一些配置
service.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    // Do something with request error
    console.error("error:", error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器 axios的一些配置
service.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    console.error("error:" + error); // for debug
    return Promise.reject(error);
  }
);

function checkResponseStatus (response:any) {
  if (response.status === 200 || response.status === 304) {
    return response.data
  }
  return {error:true,response:response}
}
function cactchError (error:any) {
  if (error.status === 400 || error.status === 404 || error.status === 500) {
     Message({
      message: `服务器访问出错. Error:${error.error},Message:${error.message}`,
      type: 'error',
      duration: 5000
    })
    return {error:true}
  }
}

// check server response
function checkResponseCode (response:any) {
  const header = response.head
  if (header && header.success) {
    return response
  } else {
    if (header.code === '401') {
    } else {
      Message({
        message: header.msg,
        type: 'error',
        duration: 4000
      })
      return { error: true }
    }
  }
}
export default {
  get (url:string,params:any){
    if(!url) return
    return service.get(url,{params:params})
    .then(checkResponseStatus)
    .then(checkResponseCode)
    .catch(cactchError)
  },
  post (url:string, data:any) {
    if (!url) return
      return service.post(url, data)
        .then(checkResponseStatus)
        .then(checkResponseCode)
        .catch(cactchError)
  }
}
