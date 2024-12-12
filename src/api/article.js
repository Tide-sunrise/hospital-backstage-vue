import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'
export const articleCategoryListService = () => {
    const tokenStore = useTokenStore();
    //在pinia中定义的响应式数据，都不需要.value
    // return request.get('/category',{headers:{'Authorization':tokenStore.token}})
    return request.get('/category')

}

//文章分类的添加
export const articleCategoryAddService = (categoryData) => {
    return request.post('/category', categoryData)
}

//文章分类的修改
export const articleCategoryUpdateService = (categoryData) => {
    return request.put('/category', categoryData)
}

//文章分类的删除
export const articleCategoryDeleteService = (id) => {
    return request.delete('/category?id='+id)
}

//文章列表查询
export const articleListService = (params) => {
    return request.get('/article', {params: params})
}

//文章添加
export const articleAddService = (articleData) => {
    return request.post('/article', articleData)
}