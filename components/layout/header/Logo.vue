<template>
  <div class="flex items-start self-stretch relative">
    <div
      class="
        flex flex-col
        relative
        py-4
        z-10
        text-white
        font-medium
        ob-drop-shadow
        cursor-pointer
      "
      @click="handleLogoClick"
    >
      <span class="flex text-4xl"> 雎山月 </span>
      <span class="font-extrabold text-xs uppercase">
        <!-- {{ themeConfig.site.nick || 'BLOG' }} -->
        BLOG
      </span>
    </div>
    <img
      class="logo-image"
      :src="userInfo ? userInfo.imageUrl : ''"
      alt="site-logo"
    />
  </div>
</template>

<script>
export default {
  name: 'Logo',
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
  },
  methods: {
    handleLogoClick() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.logo-image {
  height: 200px;
  width: 200px;
  max-width: 200px;
  top: -60px;
  left: -60px;
  opacity: 0.05;
  @apply absolute mr-2 rounded-full;
}
</style>
