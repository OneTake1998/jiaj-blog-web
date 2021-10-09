<template>
  <nav class="items-center flex-1 hidden lg:flex">
    <ul class="flex flex-row list-none px-6 text-white">
      <li
        class="
          not-italic
          font-medium
          text-xs
          h-full
          relative
          flex flex-col
          items-center
          justify-center
          cursor-pointer
          text-center
          py-4
          px-2
        "
        v-for="route in menus"
        :key="route.path"
      >
        <nuxt-link :to="route.path">
          <div
            class="
              nav-link
              text-sm
              block
              px-1.5
              py-0.5
              rounded-md
              relative
              uppercase
              cursor-pointer
            "
          >
            <span class="relative z-50"> {{ route.i18n.cn }} </span>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  computed: {
    menus() {
      return this.$store.state.themeConfig.menu.menus
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-link {
  @apply hover:text-ob-bright;
  &:hover {
    &:before {
      @apply opacity-60;
    }
  }
  &:before {
    @apply absolute rounded-lg opacity-0 transition bg-ob-deep-800 z-40;
    content: '';
    top: -4px;
    left: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
  }
}
</style>
