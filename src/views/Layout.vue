<script setup>
import {
  List,
  Checked,
  Failed
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
        '你要删除退出登录🐎？',
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
      <el-menu active-text-color="#ffd04b" background-color="#232323"  text-color="#fff"
               router>
<!--        <el-menu-item index="/article/category">-->
<!--          <el-icon>-->
<!--            <Management />-->
<!--          </el-icon>-->
<!--          <span>文章分类</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="/article/manage">-->
<!--          <el-icon>-->
<!--            <Promotion />-->
<!--          </el-icon>-->
<!--          <span>文章管理</span>-->
<!--        </el-menu-item>-->
<!--        -->
<!--        <el-menu-item index="/spring">-->
<!--          <el-icon>-->

<!--          </el-icon>-->
<!--          <span>音乐</span>-->
<!--        </el-menu-item>-->
        <el-menu-item index="/doctor">
          <el-icon>
            <List />
          </el-icon>
          <span>医生管理</span>
        </el-menu-item>
        <el-menu-item index="/patient">
          <el-icon>
            <Failed/>
          </el-icon>
          <span>患者管理</span>
        </el-menu-item>
        <el-menu-item index="/registerOrder">
          <el-icon>
            <Checked/>
          </el-icon>
          <span>挂号记录管理</span>
        </el-menu-item>

<!--        <el-sub-menu >-->
<!--          <template #title>-->
<!--            <el-icon>-->
<!--              <UserFilled />-->
<!--            </el-icon>-->
<!--            <span>个人中心</span>-->
<!--          </template>-->
<!--          <el-menu-item index="/user/info">-->
<!--            <el-icon>-->
<!--              <User />-->
<!--            </el-icon>-->
<!--            <span>基本资料</span>-->
<!--          </el-menu-item>-->
<!--&lt;!&ndash;          <el-menu-item index="/user/avatar">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-icon>&ndash;&gt;-->
<!--&lt;!&ndash;              <Crop />&ndash;&gt;-->
<!--&lt;!&ndash;            </el-icon>&ndash;&gt;-->
<!--&lt;!&ndash;            <span>更换头像</span>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-menu-item>&ndash;&gt;-->
<!--          <el-menu-item index="/user/resetPassword">-->
<!--            <el-icon>-->
<!--              <EditPen />-->
<!--            </el-icon>-->
<!--            <span>重置密码</span>-->
<!--          </el-menu-item>-->
<!--        </el-sub-menu>-->
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>吧唧吧唧医院挂号管理系统后台：<strong>{{ userInfoStore.info.nickname }}</strong></div>
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
<!--              <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>-->
<!--              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>-->
<!--              <el-dropdown-item command="resetPassword" :icon="EditPen">重置密码</el-dropdown-item>-->
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
<!--        <div style="width: 1290px; height: 570px;border: 1px solid red;">-->
<!--          内容展示区-->
<!--        </div>-->
        <router-view></router-view>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>吧唧吧唧医院挂号管理系统后台 ©2024 Created by 张栩嘉 好好好</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url('@/assets/login_title.png') no-repeat center / 120px auto;
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
