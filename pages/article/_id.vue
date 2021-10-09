<template>
  <div class="flex flex-col">
    <div class="main-grid">
      <div class="post-header">
        <span class="post-labels">
          <b v-if="data.categoryList.length > 0">
            <span>{{ data.categoryList[0].name }}</span>
          </b>
          <ul v-if="data.labelList.length > 0">
            <template>
              <li v-for="tag in data.labelList" :key="tag.id">
                <em class="opacity-50">#</em>
                {{ tag.name }}
              </li>
            </template>
          </ul>
        </span>

        <h1 v-if="data.title" class="post-title text-white">
          {{ data.title }}
        </h1>
        <div class="flex flex-row items-center justify-start mt-8 mb-4">
          <div class="post-footer">
            <img
              class="hover:opacity-50 cursor-pointer"
              :src="data.userImage || ''"
              alt="author avatar"
              @click="handleAuthorClick(data.userId)"
            />
            <span class="text-white opacity-80">
              <strong
                class="text-white pr-1.5 hover:opacity-50 cursor-pointer"
                @click="handleAuthorClick(data.userId)"
              >
                {{ data.nickName }}
              </strong>
              <span class="opacity-70">
                发布于

                {{ getDateFormat(data.updateDate) }}
                <svg-icon icon-class="clock-outline" style="stroke: white" />
              </span>
              <span class="pl-2">
                <svg-icon icon-class="read" style="stroke: white" />
                <span class="opacity-70"> {{ data.viewCount }} </span>
              </span>
            </span>
          </div>
          <!-- <div class="post-stats">
            <span>
              <svg-icon icon-class="eye" style="stroke: white" />
              <span class="pl-2 opacity-70"> {{ data.viewCount }} </span>
            </span>
          </div> -->
        </div>
      </div>
    </div>
    <div class="main-grid">
      <div>
        <div class="article-content">
          <div
            class="post-html"
            v-html="data.htmlContent"
            v-scroll-spy="{ sectionSelector: 'h1, h2, h3, h4, h5, h6' }"
          ></div>
        </div>
        <div id="comments">
          <Comment :title="'评论区'" :uid="pathname" />
        </div>
      </div>

      <div>
        <Sidebar>
          <Profile :author="author" :allTotal="allTotal" />
          <Toc :parentClass="'article-content'" />
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "@/utils/date.js";
import { SubTitle } from "@/components/Title";
import { Article } from "@/components/ArticleCard";
import Comment from "@/components/Comment";
import { Sidebar, Toc, Profile } from "@/components/Sidebar";
export default {
  layout: "Article",
  components: { SubTitle, Article, Comment, Sidebar, Toc, Profile },
  // 校验id为数值才可访问此组件
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },

  head() {
    return {
      title: this.data.title, // 浏览器中的标题
    };
  },
  data() {
    return {
      // 是否点赞
      isThumb:
        this.$cookies.get(`article-thumb-${this.$route.params.id}`) || false,
      //    当前登录用户id
      nickName: this.$store.state.nickName,
      //    当前登录用户头像url
      avatar: this.$store.state.avatar,
    };
  },
  async asyncData({ params, app }) {
    // 1. 查询文章详情
    const { data } = await app.$getArticleById(params.id);

    //2.获取作者信息
    const { data: author } = await app.$getAuthor();
    //3.获取各分类信息
    const { data: allTotal } = await app.$getAllTotal();
    //4.更新浏览数
    const isView = app.$cookies.get(`aritcle-view-${params.id}`);
    if (!isView) {
      // 没有值 ，可以更新浏览数
      const { code } = await app.$updateArticleViewCount(params.id);
      if (code === 20000) {
        // 将此文章浏览数+1
        data.viewCount++;
        // 保存cookie中, 关闭浏览器后会被删除
        app.$cookies.set(`aritcle-view-${params.id}`, true);
      }
    }

    return { data, author, allTotal };
  },
  methods: {
    getDateFormat(date) {
      return dateFormat(date);
    },
  },
  mounted() {
    // this.$store.commit('common/CHANGE_MOBILE_STATE', true)
    this.$store.commit("common/SET_HEADER_IMAGE", this.data.imageUrl);
  },
  computed: {
    pathname() {
      return window.location.pathname;
    },
  },
};
</script>
