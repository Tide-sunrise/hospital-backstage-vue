<script setup>
import {
  Tickets,
  Document,
  Memo,
  SetUp
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'

//调用函数，获取用户详细信息
// import {userInfoService} from "@/api/user.js";
import useUserInfoStore from "@/stores/userinfo.js";
import {useTokenStore} from "@/stores/token.js";
const tokenStore = useTokenStore();
import {ElMessage, ElMessageBox} from "element-plus";

const userInfoStore = useUserInfoStore();
const getUserInfo = async () => {
  // let result = await userInfoService();
  //数据存储到pinia中
  // userInfoStore.setInfo(result.data);
}

getUserInfo();

//条目被点击后，调用的函数
import {useRouter} from 'vue-router'
const router = useRouter();
const handleCommand = (command) => {
  if (command == 'logout') {
    //提示用户 确认框
    ElMessageBox.confirm(
        '你要退出登录么？',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
    )
        .then(async () => {
          //退出登录
          //1.清空pinia中存储的token以及个人信息
          tokenStore.removeToken();
          userInfoStore.removeInfo();
          //2.跳转到登录页面
          router.push('/login');
          //调用分类删除接口
          ElMessage({
            type: 'success',
            message: '退出登录成功',
          })

        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '退出登录取消',
          })
        })

  } else {
    router.push(`/user/${command}`);
  }
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu active-text-color="#ffd04b" background-color="#b2e0fa"  text-color="#000"
               router>
        <el-menu-item index="/doctor">
          <el-icon>
            <Tickets />
          </el-icon>
          <span>医生管理</span>
        </el-menu-item>
        <el-menu-item index="/patient">
          <el-icon>
            <Memo />
          </el-icon>
          <span>患者管理</span>
        </el-menu-item>
        <el-menu-item index="/registerOrder">
          <el-icon>
            <Document />
          </el-icon>
          <span>挂号记录管理</span>
        </el-menu-item>
        <el-menu-item index="/doctorRegulation">
          <el-icon>
            <SetUp />
          </el-icon>
          <span>医生排班记录</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>瓦纳海姆医院挂号管理系统后台：<strong>{{ userInfoStore.info.nickname }}</strong></div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.info.userPic? userInfoStore.info.userPic :avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
          <!-- command:条目被点击后会触发，在事件函数上可以声明一个参数接收条目对应的指令-->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>瓦纳海姆医院挂号管理系统后台 ©2024 Created by 张栩嘉</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #b2e0fa;

    &__logo {
      height: 120px;
      background: url('@/assets/name2.png') no-repeat center / 300px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
