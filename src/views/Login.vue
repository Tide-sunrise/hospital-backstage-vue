<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
//定义数据模型
const registerData =ref({
  username:'',
  password:'',
  rePassword:''
})

//校验密码函数
const checkRePassword=(rule,value,callback)=>{
  // alert(value)
  // alert(registerData.value.password)
  if (value===''){
    callback(new Error('请再次确认密码'))
  }else if(value!==registerData.value.password){
    callback(new Error('请保证再次输入的密码一致'))
  }else {
    callback()
  }
}

//定义表单校验规则
const rules={
  username:[
    {required:true,message:'请输入用户名',trigger:'blur'},
    {min:5,max:16,message:'长度为5-16位非空字符',trigger:'blur'}
  ],
  password:[
    {required:true,message:'请输入密码',trigger:'blur'},
    {min:5,max:16,message:'长度为5-16位非空字符',trigger:'blur'}
  ],
  rePassword:[
    {validator:checkRePassword,trigger:'blur'}
  ]
}

import {userLoginService} from '@/api/user.js'
import {ElMessage} from "element-plus";
// const register = async () => {
//   let result = await userRegisterService(registerData.value);
//   // if(result.code===0){
//   //   alert(result.message?result.message:'注册成功')
//   // }else {
//   //   alert('注册失败')
//   // }
//   // alert(result.message?result.message:'注册成功');
//   ElMessage.success(result.message?result.message:'注册成功')
// }

//绑定数据，复用注册表单的数据类型
//登录函数
import {useTokenStore} from '@/stores/token.js'
import {useRouter} from 'vue-router'
const router = useRouter();
const tokenStore = useTokenStore();

const login = async () => {
  let result = await userLoginService(registerData.value);
  // if (result.code===0){
  //   alert(result.message?result.message:'登录成功')
  // }else {
  //   alert("登录失败")
  // }
  ElMessage.success(result.msg?result.message:'登录成功')
  //把得到的token存储到pinia中
  tokenStore.setToken(result.data)
  //跳转到首页
  router.push('/')
}
const clearRegisterData=()=>{
  registerData.value={
    username: '',
    password: '',
    rePassword: ''
  }
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="6" :offset="3" class="form">
      <el-form ref="form" size="large" autocomplete="off" :model="registerData" :rules="rules">
        <el-form-item>
          <div class="block">
            <el-image style="width: 400px; height: 50px" src="/src/assets/name.png" fit="fill" />
          </div>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="14" class="bg"></el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #b2e0fa;
  display: flex;
  justify-content: center;
  //align-items: center;
  .bg {

    //url('@/assets/login_title.png') no-repeat 60% center / 240px auto,
    background:
        url('@/assets/hospital.jpg') no-repeat right center / cover;
    border-radius: 20px 0 0 20px;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    margin-right: 125px;
    margin-left: 130px;
    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
