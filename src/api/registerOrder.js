import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'

//挂号订单列表查询
export const registerOrderListService = (params) => {
    const tokenStore = useTokenStore();
    return request.get('/registerOrder', {params: params})
}

//挂号订单添加
export const registerOrderAddService = (registerOrderData) => {
    return request.post('/registerOrder', registerOrderData)
}

//挂号订单修改
export const registerOrderUpdateService = (registerOrderData) => {
    return request.put('/registerOrder', registerOrderData)
}

//挂号订单删除
export const registerOrderDeleteService = (id) => {
    return request.delete('/registerOrder?id='+id)
}
