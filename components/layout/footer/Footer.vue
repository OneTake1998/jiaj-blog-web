<template>
  <div id="footer" class="relative w-full pt-1" :style="gradientBackground">
    <span class="bg-ob-deep-900 flex justify-center">
      <div
        class="
          bg-ob-deep-900
          rounded-lg
          max-w-10/12
          lg:max-w-screen-2xl
          text-sm text-ob-normal
          w-full
          py-6
          px-6
          grid grid-rows-1
          lg:grid-rows-none lg:grid-cols-4
          justify-center
          items-center
          gap-8
        "
      >
        <div
          class="
            flex flex-col
            lg:flex-row
            gap-6
            lg:gap-12
            row-span-1
            lg:col-span-3
            text-center
            lg:text-left
          "
        >
          <ul class="flex flex-col gap-1.5">
            <li>
              Copyright © 2019 - 2021
              <b class="font-extrabold">{{$store.state.nickname}}</b>
              . All Rights Reserved.
            </li>

            <!-- <li class="flex flex-row gap-3">
              <span>
                <img
                  class="inline-block"
                  :src="require('@/static/logo.png')"
                  alt=""
                  width="15"
                />
                <b>
                  公安备案信息：
                  <a>
                    <b
                      class="font-extrabold border-b-2 border-ob hover:text-ob"
                    >
                      Wuhulalalalal~
                    </b>
                  </a>
                </b>
              </span>
              <span>
                备案信息：
                <nuxt-link to="https://hexo.io/">
                  <b class="font-extrabold border-b-2 border-ob hover:text-ob">
                    Wuhulalalalal~
                  </b>
                </nuxt-link>
              </span>
            </li> -->
          </ul>
        </div>
      </div>
    </span>
  </div>
</template>
<script >
export default {
  name: "Footer",
  computed: {
    avatarClass() {
      return {
        "footer-avatar": true,
        [this.themeConfig.theme.profile_shape]: true,
      };
    },
    currentYear() {
      return new Date().getUTCFullYear();
    },
    gradientText() {
      return this.themeConfig.theme.background_gradient_style;
    },
    gradientBackground() {
      return { background: this.themeConfig.theme.header_gradient_css };
    },
    themeConfig() {
      return this.$store.state.themeConfig;
    },
  },
};
</script>

<style lang="scss" scoped></style>
