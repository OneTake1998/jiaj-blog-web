<template>
  <div class="article-container">
    <!-- <span v-if="post.pinned" class="article-tag">
      <b>
        <svg-icon icon-class="pin" />
        {{ t('settings.pinned') }}
      </b>
    </span> -->
    <span class="article-tag">
      <b>
        <svg-icon icon-class="hot" />
        <!-- {{ t('settings.featured') }} -->
        推荐
      </b>
    </span>
    <div class="feature-article">
      <div class="feature-thumbnail">
        <!-- <img v-if="post.cover" class="ob-hz-thumbnail" v-lazy="post.cover" /> -->
        <img class="ob-hz-thumbnail" :src="data.imageUrl" />
        <span class="thumbnail-screen" :style="bannerHoverGradient" />
      </div>
      <div class="feature-content">
        <span class="flex">
          <b v-if="data.categoryList && data.categoryList.length > 0">
            {{ data.categoryList[0].name }}
          </b>
          <b v-else> 一个分类 </b>
          <ul>
            <template v-if="data.labelList && data.labelList.length > 0">
              <li
                v-for="(item, index) in data.labelList"
                :key="data.labelList.name"
              >
                <em># {{ item.name }}</em>
              </li>
            </template>
            <template v-else>
              <li>
                <em># 一个标签</em>
              </li>
            </template>
          </ul>
        </span>

        <!-- <router-link
          v-if="post.title"
          :to="{ name: 'post', params: { slug: post.slug } }"
        > -->
        <nuxt-link :to="`/article/${data.id}`" >
          <h1 data-dia="article-link">{{ data.title }}</h1>
        </nuxt-link>
        <!-- </router-link> -->
        <p class="article-content-p">
          {{ data.content.substring(0,400)  }}
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
                {{ data.nickName }}
              </strong>
              发布于 {{ getDateFormat(data.updateDate) }}
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
  name: "HorizontalArticle",
  props: {
    data: {
      type: Object,
    },
  },
  computed: {
    bannerHoverGradient() {
      return {
        background: this.$store.state.themeConfig.theme.header_gradient_css,
      };
    },
  },
  methods: {
    getDateFormat(date) {
      return dateFormat(date);
    },
  },
};
</script>

<style lang="scss" scoped>
.article-content-p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  text-align: justify;
  max-height: 6 * 1.5em ;
}
</style>
