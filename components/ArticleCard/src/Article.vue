<template>
  <div class="article-container">
    <span class="article-tag" v-show="showTab">
      <b>
        <svg-icon icon-class="hot" />
        推荐
      </b>
    </span>
    <div class="article">
      <div class="article-thumbnail">
        <img :src="data.imageUrl" />
        <span class="thumbnail-screen" :style="gradientBackground" />
      </div>
      <div class="article-content">
        <span>
          <b v-if="data.categoryList && data.categoryList.length > 0">
            {{ data.categoryList[0].name }}
          </b>

          <b v-else-if="data.labelList && data.labelList.length <= 0"> 标签 </b>

          <ul v-if="data.labelList && data.labelList.length > 0">
            <li v-for="item in data.labelList" :key="item.name">
              <em># {{ item.name }}</em>
            </li>
          </ul>
          <ul v-if="data.labelList && data.labelList.length <= 0">
            <li>
              <em># 标签</em>
            </li>
          </ul>
        </span>

        <nuxt-link :to="`/article/${data.id}`">
          <h1 data-dia="article-link">{{ data.title }}</h1>
        </nuxt-link>

        <p v-if="data.content" class="article-content-p">
          {{ data.content.substring(0, 200) }}
        </p>

        <div class="article-footer">
          <div class="flex flex-row items-center">
            <img
              class="hover:opacity-50 cursor-pointer"
              :src="data.userImage"
            />
            <span class="text-ob-dim">
              <strong
                class="
                  text-ob-normal
                  pr-1.5
                  hover:text-ob
                  hover:opacity-50
                  cursor-pointer
                "
              >
                <!-- todo:: -->
                <!-- @click="handleAuthorClick(post.author.link)" -->
                {{ data.nickName }}
              </strong>

              {{ getDateFormat(data.updateDate) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { dateFormat } from "@/utils/date.js";
export default {
  name: "Article",
  props: {
    data: {
      type: Object,
      required: true,
    },
    showTab: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    // console.log("aaa:", this.data);
  },
  data() {
    return {
      gradientBackground: {
        background: this.$store.state.themeConfig.theme.header_gradient_css,
      },
    };
  },
  methods: {
    getDateFormat(date) {
      return dateFormat(date);
    },
  },
};
</script>

<style lang="scss" scoped>
.feature-sign {
  width: calc(100% - 0.5rem);
  height: calc(100% - 0.5rem);
  margin: 0.25rem;
}
.article-content-p {
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: 3 * 1.5em ;
}
</style>
