import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'

//医生列表查询
export const doctorListService = (params) => {
    // const tokenStore = useTokenStore();
    return request.get('/doctors/all', {params: params})
}

//医生添加
export const doctorAddService = (doctorData) => {
    return request.put('/doctors', doctorData)
}

//医生修改
export const doctorUpdateService = (doctorData) => {
    return request.post('/doctors', doctorData)
}

//医生删除
export const doctorDeleteService = (id) => {
    console.log(id);
    return request.delete('/doctors/'+id)
}
