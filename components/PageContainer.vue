<template>
  <div class="flex flex-col">
    <div class="post-header">
      <h1 class="post-title text-white uppercase">
        {{ pageTitle }}
      </h1>
    </div>
    <div class="main-grid">
      <div class="relative">
        <div
          v-if="post.content"
          class="post-html"
          v-html="post.content"
          v-scroll-spy="{ sectionSelector: 'h1, h2, h3, h4, h5, h6' }"
        />
        <div
          v-else
          class="
            bg-ob-deep-800
            px-14
            py-16
            rounded-2xl
            shadow-xl
            block
            min-h-screen
          "
        ></div>
        <slot />
      </div>
      <div class="col-span-1">
        <Sidebar>
          <Profile :author="author" :allTotal="allTotal" />
          <Toc :toc="post.toc" />
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import { Sidebar, Toc, Profile } from "@/components/Sidebar";

export default {
  name: "PageContainer",
  components: { Sidebar, Toc, Profile },
  props: {
    post: {
      type: Object,
      default: () => {
        return {};
      },
    },
    title: {
      type: String,
      default: "",
    },
  },
  created() {
    //获取作者信息
    const { data: author } =  this.$getAuthor();
    //获取作者信息
    const { data: allTotal } =  this.$getAllTotal();
    console.log("this",this)
    this.author = author;
    this.allTotal = allTotal;
  },
  computed: {
    pageTitle() {
      if (this.title !== "") return this.title;
      return this.post.title;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-title {
  @apply my-2;
  font-size: clamp(1.2rem, calc(1rem + 3.5vw), 4rem);
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
}
.post-stats {
  @apply w-full flex flex-row text-sm lg:text-base mb-6;
  span {
    @apply text-white stroke-current flex flex-row items-center pr-4;
  }
}
</style>
