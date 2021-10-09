<template>
  <div class="flex flex-col">
    <div class="post-header">
      <Breadcrumbs :current="'标签'" />
      <h1 class="post-title text-white uppercase">{{ $route.query.name }}</h1>
    </div>
    <div class="main-grid">
      <div class="relative">
        <transition name="fade-slide-y" mode="out-in">
          <div v-show="isEmpty" class="post-html flex flex-col items-center">
            <h1>没有找到任何文章</h1>
            <svg-icon icon-class="empty-search" style="font-size: 35rem" />
          </div>
        </transition>
        <div class="flex flex-col relative">
          <ul class="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-8">
            <template v-if="posts.length >= 0">
              <li v-for="post in posts" :key="post.id">
                <Article :data="post" />
              </li>
            </template>
          </ul>

          <Paginator
            :pageSize="pagination.pageSize"
            :pageTotal="pagination.pageTotal"
            :page="pagination.page"
            @pageChange="pageChangeHanlder"
          />
        </div>
      </div>
      <div>
        <Sidebar>
          <!-- <CategoryBox /> -->
          <TagBox :tags="tags" />
          <RecentComment :comments="comments" />
        </Sidebar>
      </div>
    </div>
  </div>
</template>


<script>
import {
  Sidebar,
  RecentComment,
  TagBox,
  CategoryBox,
} from "@/components/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
export default {
  layout: "TagsResult",
  components: { Sidebar, RecentComment, TagBox, CategoryBox, Breadcrumbs },

  // 校验标签id
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },

  async asyncData({ params, app }) {
    //查询对象
    const query = { current: 1, size: 3, labelId: params.id };
    //1、查询文章
    const { data } = await app.$getArticleList(query);
    console.log("文章数据", data);
    //分页对象
    let pagination = {
      pageSize: data.size,
      pageTotal: data.total,
      page: data.current,
    };
    //gitalk
    const comments = await app.$getComments();

    //2、查询分类和标签
    const { data: categoryAndLabel } = await app.$getCategoryAndLabel();
    let tags = [];

    for (let i = 0; i < categoryAndLabel.length; i++) {
      if (categoryAndLabel[i].labelList[0].name != null) {
        tags = tags.concat(categoryAndLabel[i].labelList);
      }
      if (tags.length >= 10) break;
    }
    return { query, pagination, posts: data.records, comments, tags };
  },
  methods: {
    async pageChangeHanlder(current) {
      this.query.current = current;
      const { data } = await this.$getArticleList(this.query);
      this.pagination.pageSize = data.size;
      this.pagination.pageTotal = data.total;
      this.pagination.page = data.current;
      this.posts = data.records;
    },
    getDateFormat(date) {
      return dateFormat(date);
    },
  },
  computed: {
    isEmpty() {
      return this.posts.length === 0;
    },
  },
};
</script>
<style scoped>
</style>