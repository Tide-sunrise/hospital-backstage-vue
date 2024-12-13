import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'

//患者列表查询
export const patientListService = (params) => {
    const tokenStore = useTokenStore();
    return request.get('/patient', {params: params})
}

//患者添加
export const patientAddService = (patientData) => {
    return request.post('/patient', patientData)
}

//患者修改
export const patientUpdateService = (patientData) => {
    return request.put('/patient', patientData)
}

//患者删除
export const patientDeleteService = (id) => {
    return request.delete('/patient?id='+id)
}
