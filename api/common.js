export default ({ $axios }, inject) => {
    // 查询技术频道列表接口
    inject('getMusic', () => $axios.$get('/api/music'))
    // 获取各类总数
}