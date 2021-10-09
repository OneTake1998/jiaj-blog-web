export default ({ $axios }, inject) => {

    //根据标题查询文章
    inject('searchArticle', query => $axios.$post(`/api/article/search`, query))
    // 获取所有正常状态的分类及标签
    inject('getCategoryAndLabel', () => $axios.$get(`/api/category/label/list`))

    // 文章列表分页接口
    inject('getArticleList', query => $axios.$post('/api/article/list', query))

    //文章归档
    inject('getArticles', query => $axios.$post('/api/article/articles', query))

    // 查询技术频道列表接口
    inject('getCategoryList', () => $axios.$get('/api/category/list'))

    // 查询文章详情
    inject('getArticleById', id => $axios.$get(`/api/article/${id}`))

    // 更新文章浏览数
    inject('updateArticleViewCount', id => $axios.$put(`/api/article/viewCount/${id}`))

   
}