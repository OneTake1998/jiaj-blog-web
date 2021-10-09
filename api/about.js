export default ({ $axios }, inject) => {
    // 查询技术频道列表接口
    inject('getAuthor', () => $axios.$get('/api/about'))
    // 获取各类总数
    inject('getAllTotal', () => $axios.$get('/api/about/allTotal'))
}