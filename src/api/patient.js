import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'

//患者列表查询
export const patientListService = (params) => {
    const tokenStore = useTokenStore();
    return request.get('/patients/all', {params: params})
}

//患者添加
export const patientAddService = (patientData) => {
    return request.put('/patients', patientData)
}

//患者修改
export const patientUpdateService = (patientData) => {
    return request.post('/patients', patientData)
}

//患者删除
export const patientDeleteService = (id) => {

    return request.delete('/patients/'+id)
}
