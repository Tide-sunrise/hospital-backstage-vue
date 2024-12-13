import {createRouter,createWebHistory} from 'vue-router'

//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import DoctorVue from "@/views/doctor/DoctorManagement.vue"
import RegisterOrderVue from "@/views/registerOrder/RegisterOrderManagement.vue";
import PatientVue from "@/views/patient/PatientManagement.vue"

import {useTokenStore} from "@/stores/token.js";

//定义路由关系
const routes =[
    {path: '/login',component:LoginVue},
    //生成子路由
    {path: '/',component: LayoutVue,redirect:'/doctor',children:[
            {path: '/doctor',component:DoctorVue},
            {path: '/patient',component:PatientVue},
            {path: '/registerOrder',component: RegisterOrderVue}

        ]}
]

//创建路由器
const router=createRouter({
    history:createWebHistory(),
    routes:routes
})

//导航守卫
router.beforeEach((to, from, next) => {
    const tokenStore = useTokenStore();
    if (to.path !== '/login' && !tokenStore.token) {
        next('/login');
    } else {
        next();
    }
})

//导出路由
export default router


