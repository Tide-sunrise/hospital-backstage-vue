import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'

//挂号订单列表查询
export const registerOrderListService = (params) => {
    const tokenStore = useTokenStore();
    return request.get('/appointments/all', {params: params})
}

//挂号订单添加
export const registerOrderAddService = (registerOrderData) => {
    return request.put('/appointments', registerOrderData)
}

//挂号订单修改
export const registerOrderUpdateService = (registerOrderData) => {
    return request.post('/appointments', registerOrderData)
}

//挂号订单删除
export const registerOrderDeleteService = (id) => {
    return request.delete('/appointments/'+id)
}
