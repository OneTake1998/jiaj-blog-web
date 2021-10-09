<template>
  <div>
    <div class="flex flex-col justify-center items-center">
      <img
        v-if="author || author.imageUrl !== ''"
        class="diamond-avatar h-28 w-28 shadow-xl m-0"
        :src="author.imageUrl"
        alt="avatar"
      />
      <h2 class="text-center pt-4 text-4xl font-semibold text-ob-bright">
        <template v-if="author.nickName">
          {{ author.nickName }}
        </template>
      </h2>

      <span class="h-1 w-14 rounded-full mt-2" :style="gradientBackground" />

      <p
        v-if="author || author.intro"
        class="pt-6 px-2 w-full text-sm text-center text-ob-dim"
        v-html="author.intro"
      />
      <Social :socials="author" />
      <ul class="grid grid-cols-3 pt-4 w-full px-2 text-lg">
        <li class="col-span-1 text-center">
          <span class="text-ob-bright">文章</span>
          <p class="text-base text-ob-dim">{{ allTotal.articleTotal }}</p>
        </li>
        <li class="col-span-1 text-center">
          <span class="text-ob-bright">分类</span>
          <p class="text-base text-ob-dim">{{ allTotal.categoryTotal }}</p>
        </li>
        <li class="col-span-1 text-center">
          <span class="text-ob-bright">标签</span>
          <p class="text-base text-ob-dim">{{ allTotal.labelTotal }}</p>
        </li>
      </ul>
    </div>
    <ul
      class="
        flex flex-col
        justify-center
        items-center
        mt-8
        w-full
        list-none
        text-ob-bright
      "
    >
      <li class="pb-2 cursor-pointer" v-for="route in routes" :key="route.path">
        <div
          class="text-sm block px-1.5 py-0.5 rounded-md relative uppercase"
          v-if="route.length !== 0"
          @click="pushPage"
        >
          <nuxt-link :to="route.path">
            <span class="relative z-50">
              {{ route.i18n.cn }}
            </span>
          </nuxt-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Social from "@/components/Social.vue";

export default {
  name: "ObMobileMenu",
  components: { Social },
  data() {
    return {
      author: {},
      allTotal: {},
    };
  },
  async created() {
    //获取作者信息
    const { data: author } = await this.$getAuthor();
    this.author = author;
    const { data: allTotal } = await this.$getAllTotal();
    this.allTotal = allTotal;
  },
  methods: {
    pushPage(path) {
      if (!path) return;
      this.$store.dispatch("navigator/toggleMobileMenu");
      this.$store.commit("navigator/SET_OPEN_NAVIGATOR", false);
    },
  },
  computed: {
    routes() {
      return this.$store.state.themeConfig.menu.menus;
    },
    gradientBackground() {
      return {
        background: this.$store.state.themeConfig.theme.header_gradient_css,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
