import GitalkModels from "@/models/GitalkModels.js";
const gitalk = GitalkModels.GithubAttributes;
export default ({ $axios }, inject) => {
    // 获取各类总数
    inject('getComments', () => $axios.$get(`https://api.github.com/repos/${gitalk.owner}/${gitalk.repo}/issues/comments?sort=created&direction=desc&per_page=7&page=1`))

}