<template>
  <div class="inverted-main-grid py-8 gap-8 box-border">
    <div
      class="
        relative
        overflow-hidden
        h-56
        lg:h-auto
        rounded-2xl
        bg-ob-deep-800
        shadow-lg
      "
    >
      <div
        class="
          ob-gradient-plate
          opacity-90
          relative
          z-10
          bg-ob-deep-900
          rounded-2xl
          flex
          justify-start
          items-end
          px-8
          pb-10
          shadow-md
        "
      >
        <h2 class="text-3xl pb-8 lg:pb-16">
          <p :style="gradientText">EDITOR'S SELECTION</p>
          <span class="relative text-2xl text-ob-bright font-semibold">
            <svg-icon class="inline-block" icon-class="hot" />
            推荐文章
          </span>
        </h2>
      </div>
      <span
        class="absolute top-0 w-full h-full z-0"
        :style="gradientBackground"
      />
    </div>

    <ul class="grid lg:grid-cols-2 gap-8">
      <template v-if="featurePosts.length > 0">
        <li v-for="post in featurePosts" :key="post.id">
          <Article :data="post" />
        </li>
      </template>
    </ul>
  </div>
</template>

<script >
import { Article } from '@/components/ArticleCard'

export default {
  name: 'FeatureList',
  components: {
    Article,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    gradientBackground() {
      return {
        background: this.$store.state.themeConfig.theme.header_gradient_css,
      }
    },
    gradientText() {
      return this.$store.state.themeConfig.theme.background_gradient_style
    },
    featurePosts(){
      return this.data;
    }
  },
}
</script>

<style lang="scss" scoped></style>
