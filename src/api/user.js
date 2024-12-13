
import request from '@/utils/request.js'

// //提供调用注册接口的方法
// export const userRegisterService = (registerData) => {
//     //转换为json格式,params中要包含adminId,password
//     const params = {
//         adminId: registerData.username,
//         password: registerData.password
//     }
//     return request.post('/user/register', params)
// }

//提供调用登录接口的方法
export const userLoginService = (loginData) => {
    const params = {
        adminId: loginData.username,
        password: loginData.password
    }
    return request.post('/admins/login', params)
}

//获取用户详细信息
export const userInfoService = () => {
    return request.get('/user/userInfo')
}

// //修改个人信息
// export const userInfoUpdateService = (userInfoData) => {
//     return request.put('/user/update', userInfoData)
// }
//
// //修改头像
// export const userAvatarUpdateService = (avatarUrl) => {
//     const params = new URLSearchParams();
//     params.append('avatarUrl', avatarUrl)
//     return request.patch('/user/updateAvatar', params)
// }
//
// //修改密码
// export const userPasswordUpdateService = (passwordData) => {
//     const params = new URLSearchParams();
//     for (let key in passwordData) {
//         params.append(key, passwordData[key])
//     }
//     return request.patch('/user/updatePwd', passwordData)
// }
