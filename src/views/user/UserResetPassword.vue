<script setup>
import { ref } from 'vue'
import useUserInfoStore from "@/stores/userinfo.js";
const userInfoStore = useUserInfoStore();

//创建一个新的对象，用于存储新的密码
const userPwd = ref({
  old_pwd:'',
  new_pwd:'',
  re_pwd:'',
})


const userInfo = ref({...userInfoStore.info})
//校验密码函数
const checkReNewPassword=(rule,value,callback)=>{
  // alert(value)
  // alert(userPwd.value.old_pwd)
  if (value===''){
    callback(new Error('请再次确认密码'))
  }else if(value!==userPwd.value.new_pwd){

    callback(new Error('请保证再次输入的密码一致'))
  }else {
    callback()
  }
}
const rules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    {
      min:5,max:16,
      message: '原密码格式不正确',
      trigger: 'blur'
    }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      min:5,max:16,
      message: '新密码格式不正确',
      trigger: 'blur'
    }
  ],
  re_pwd:[
    {required: true,validator:checkReNewPassword,trigger:'blur'}
  ]
}

//修改密码

import {userPasswordUpdateService} from "@/api/user.js";
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router/index.js";
import {useTokenStore} from "@/stores/token.js";
const tokenStore = useTokenStore();
const updateNewPassword = async () => {

  // ElMessage.success(result.message ? result.message : '修改成功');

  // //更新pinia中的数据
  // userInfoStore.setInfo(userInfo.value);
//提示用户 确认框
  ElMessageBox.confirm(
      '你确定要修改密码🐎？',
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        //调用接口
        let result = await userPasswordUpdateService(userPwd.value);
        //退出登录
        //1.清空pinia中存储的token以及个人信息
        tokenStore.removeToken();
        userInfoStore.removeInfo();
        //2.跳转到登录页面
        router.push('/login');
        //调用分类删除接口
        ElMessage.success(result.message ? result.message : '修改成功');

      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '你改个🏆密码',
        })
      })

}

</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>修改密码</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :model="userPwd" :rules="rules" label-width="100px" size="large">
          <el-form-item label="原密码" prop="old_pwd">
            <el-input type="password" v-model="userPwd.old_pwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input type="password" v-model="userPwd.new_pwd"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input type="password" v-model="userPwd.re_pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateNewPassword">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>