<template>
  <div>
    <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <li v-for="post in articleList" :key="post.id">
          <Article :data="post" :showTab="false" />
        </li>
    </ul>

    <Paginator
      :pageSize="pagination.pageSize"
      :pageTotal="pagination.pageTotal"
      :page="pagination.page"
      @pageChange="pageChangeHanlder"
    />
  </div>
</template>
<script>
import Paginator from "@/components/Paginator.vue";
import { Article } from "@/components/ArticleCard";
export default {
  components: {
    Paginator,
    Article,
  },

  // 校验路由参数是否有效
  validate({ params }) {
    const id = params.id ? params.id : 0;
    // 必须是数值
    return /^\d+$/.test(id);
  },

  async asyncData({ params, app }) {
    // 分类id，为空则查询推荐
    const categoryId = params.id ? params.id : null;

    // 查询文章列表
    const query = { categoryId, current: 1, size: 9 };
    const { data } = await app.$getArticleList(query);

    let pagination = {
      pageSize: data.size,
      pageTotal: data.total,
      page: data.current,
    };
    return { query, articleList: data.records, pagination };
  },

  methods: {
    async pageChangeHanlder(current) {
      this.query.current = current;
      const { data } = await this.$getArticleList(this.query);
      this.pagination.pageSize = data.size;
      this.pagination.pageTotal = data.total;
      this.pagination.page = data.current;
      this.articleList = data.records;
    },
  },
};
</script>
