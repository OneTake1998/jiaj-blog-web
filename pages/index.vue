<template>
  <div class="block">
    <Feature :data="recommendArticle[0]">
      <FeatureList :data="secondArticle" />
    </Feature>
    <span>
      <Title id="article-list" :title="'文章列表'" icon="article" />
    </span>
    <div class="main-grid">
      <div class="flex flex-col relative">
        <!-- <div class="flex flex-col relative"> -->
        <ul :class="tabClass">
          <li
            :class="{ active: activeTab === '' }"
            @click="handleTabChange('')"
          >
            <nuxt-link to="/">
              <span class="first-tab" :style="activeTabStyle('')"> 全部 </span>
            </nuxt-link>
          </li>
          <template>
            <li
              v-for="category in categoryList"
              :key="category.id"
              :class="{ active: activeTab === category.id }"
              @click="handleTabChange(category.id)"
            >
              <nuxt-link :to="'/' + category.id">
                <span :style="activeTabStyle(category.id)">
                  {{ category.name }}
                </span>
                <b>
                  {{ category.total }}
                </b>
              </nuxt-link>
            </li>
          </template>
        </ul>

        <span :class="expanderClass" @click="expandHandler">
          <svg-icon icon-class="chevron" />
        </span>

        <nuxt-child :key="$route.params.id" />
      </div>
      <div>
        <Sidebar>
          <Profile :author="author" :allTotal="allTotal" />
          <RecentComment :comments="comments" />
          <TagBox :tags="tags" />
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import { Feature, FeatureList } from "@/components/Feature";
import { HorizontalArticle } from "@/components/ArticleCard";
import { Title } from "@/components/Title";
import { Sidebar, Profile, RecentComment, TagBox } from "@/components/Sidebar";
import Gitalk from "gitalk";
import GitalkModels from "@/models/GitalkModels.js";
export default {
  components: {
    HorizontalArticle,
    FeatureList,
    Feature,
    Title,
    Sidebar,
    Profile,
    RecentComment,
    TagBox,
  },
  async asyncData({ app }) {
    // 查询第一推荐

    const query = { categoryId: null, current: 1, size: 3 };
    const { data: records } = await app.$getArticleList(query);
    let recommendArticle = null;
    records != null
      ? (recommendArticle = records.records)
      : (recommendArticle = null);
    // 第二推荐
    let secondArticle = new Array();
    for (let i = 0; i < recommendArticle.length; i++) {
      if (i != 0) {
        secondArticle.push(recommendArticle[i]);
      }
    }
    //查询分类
    const { data: categoryList } = await app.$getCategoryList();

    //获取作者信息
    const { data: author } = await app.$getAuthor();
    //各分类信息
    const { data: allTotal } = await app.$getAllTotal();

    //gitalk
    const comments = await app.$getComments();
    // 查询分类和标签
    const { data } = await app.$getCategoryAndLabel();
    let tags = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].labelList[0].name != null) {
        tags = tags.concat(data[i].labelList);
      }
      if (tags.length >= 10) break;
    }
    return {
      recommendArticle,
      secondArticle,
      categoryList,
      author,
      allTotal,
      comments,
      tags,
    };
  },
  created() {
    this.$store.commit("SET_AVATAR", this.author.imageUrl);
    this.$store.commit("SET_NICKNAME", this.author.nickName);
  },

  data() {
    return {
      expanderClass: {
        "tab-expander": true,
        expanded: false,
      },
      tabClass: {
        tab: true,
        "expanded-tab": false,
      },
      activeTab: "",
      articleOffset: 0,
    };
  },

  methods: {
    expandHandler() {
      this.expanderClass.expanded = !this.expanderClass.expanded;
      this.tabClass["expanded-tab"] = !this.tabClass["expanded-tab"];
    },
    activeTabStyle(slug) {
      if (slug === this.activeTab)
        return {
          background: this.$store.state.themeConfig.theme.header_gradient_css,
        };
      return {};
    },
    handleTabChange(newTab) {
      this.activeTab = newTab;
    },
  },
  computed: {
    themeConfig() {
      return this.$store.state.themeConfig;
    },
    gradientText() {
      return this.themeConfig.theme.background_gradient_style;
    },
    gradientBackground() {
      return { background: this.themeConfig.theme.header_gradient_css };
    },
  },
};
</script>
