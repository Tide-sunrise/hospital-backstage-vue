import request from '@/utils/request.js'

//医生规章制度列表查询
export const doctorRegulationListService = (params) => {
    return request.get('/schedules/all', {params: params})
}
