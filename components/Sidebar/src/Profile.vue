<template>
  <div
    class="h-98 w-full rounded-2xl relative shadow-xl mb-8"
    :style="gradientBackground"
  >
    <div
      class="
        ob-gradient-cut-plate
        absolute
        bg-ob-deep-900
        rounded-xl
        opacity-90
        flex
        justify-center
        items-center
        pt-4
        px-6
        shadow-lg
        hover:shadow-2xl
        duration-300
      "
      data-dia="author"
    >
      <div
        class="
          profile
          absolute
          w-full
          flex flex-col
          justify-center
          items-center
        "
      >
        <div class="flex flex-col justify-center items-center">
          <img
            class="diamond-clip-path"
            v-if="author.avatar !== ''"
            :class="avatarClass"
            :src="author.imageUrl"
            alt="avatar"
          />

          <h2 class="text-center pt-4 text-4xl font-semibold text-ob-bright">
            <template v-if="author.nickName">
              {{ author.nickName }}
            </template>
          </h2>

          <span
            class="h-1 w-14 rounded-full mt-2"
            :style="gradientBackground"
          />

          <p
            v-if="author.intro"
            class="pt-6 px-10 w-full text-sm text-center"
            v-html="author.intro"
          />
        </div>
        <div class="h-full w-full flex flex-col flex-1 justify-end items-end">
          <Social :socials="author" />
          <ul class="grid grid-cols-4 pt-4 w-full px-2 text-lg">
            <li class="col-span-1 text-center">
              <span class="text-ob-bright">{{ allTotal.articleTotal }}</span>
              <p class="text-base">文章</p>
            </li>
            <li class="col-span-1 text-center">
              <span class="text-ob-bright">
                {{ allTotal.categoryTotal }}
              </span>
              <p class="text-base">分类</p>
            </li>
            <li class="col-span-1 text-center">
              <span class="text-ob-bright">{{ allTotal.labelTotal }}</span>
              <p class="text-base">标签</p>
            </li>
            <li class="col-span-1 text-center">
              <span class="text-ob-bright">{{ allTotal.musicTotal }}</span>
              <p class="text-base">音乐</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Social from "@/components/Social.vue";
export default {
  name: "ObProfile",
  components: { Social },
  props: {
    author: {
      type: Object,
      default: {},
    },
    allTotal: {
      type: Object,
      default: {},
    },
  },
  computed: {
    avatarClass() {
      return {
        "ob-avatar": true,
        diamond: true,
      };
    },
    gradientBackground() {
      return {
        background: this.$store.state.themeConfig.theme.header_gradient_css,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  top: -7%;
  height: 100%;
  max-height: 100%;
}
</style>
