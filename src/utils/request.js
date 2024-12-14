//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import {ElMessage} from "element-plus";

//定义一个变量,记录公共的前缀  ,  baseURL
// const baseURL = 'http://localhost:8080';
const baseURL = '/api';
const instance = axios.create({baseURL})

import {useTokenStore} from "@/stores/token.js";
//添加请求拦截器
instance.interceptors.request.use(
    (config)=>{
        //请求前的回调
        //添加token
        const tokenStore = useTokenStore();
        //判断有没有token
        if (tokenStore.token){
            config.headers.Authorization=tokenStore.token;
        }
        console.log(config)
        return config;
    },
    (err)=>{
        return Promise.reject(err);
    }
)

// import {useRouter} from "vue-router";
// const router = useRouter();
import router from "@/router";
//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        //判断业务状态码
        if (result.data.code===0){
            return result.data;
        }else if (result && (result.data.code === 11 || result.data.message === 'NEED_LOGIN')){
            ElMessage.error('请登录');
            router.push('/login');
            // 在这种情况下，你可能也想拒绝这个Promise，因为它实际上不是一个成功的响应。
            return Promise.reject(new Error('NEED_LOGIN'));
        }
        //操作失败
        // alert(result.data.message?result.data.message:'服务异常')
        ElMessage.error(result.data.message?result.data.message:'服务异常')
        //异步操作的状态转换为失败
        return Promise.reject(result.data)

    },
    err=>{
        //判断响应的状态码，如果是401，则证明未登录，提示请登录，并且跳转到登录页面
        //判断错误信息，如果是NOT LOGIN，则提示请登录，并且跳转到登录页面
        // alert(err.response.data.message?err.response.data.message:'服务异常')
        if (err.response.data.code===401||err.response.data.message==='NOT LOGIN'){
            // alert('请登录')
            ElMessage.error('请登录')
            router.push('/login')
        }else {
            ElMessage.error('服务异常');
        }
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;
