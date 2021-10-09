<template>
  <div
    id="Ob-Navigator"
    :class="{
      'Ob-Navigator--open': openNavigator,
      'Ob-Navigator--scrolling': scrolling,
    }"
  >
    <transition name="fade-bounce-y" mode="out-in">
      <div
        v-if="!openNavigator && showProgress"
        @click.stop.prevent="handleBackToTop"
        class="Ob-Navigator-btt"
      >
        <div>
          <svg-icon
            class="text-ob-bright stroke-current"
            icon-class="nav-top"
          />
        </div>
        <span class="Ob-Navigator-tips"> 这是啥？ </span>
      </div>
    </transition>

    <div class="Ob-Navigator-ball" @click.stop.prevent="handleNavigatorToggle">
      <div :style="gradient">
        <transition name="fade-bounce-y" mode="out-in">
          <svg-icon
            v-if="openNavigator"
            class="text-base stroke-2"
            icon-class="close"
          />
          <svg-icon v-else-if="!showProgress" icon-class="dots" />
          <span class="text-sm" v-else>{{ progress }}%</span>
        </transition>
      </div>
    </div>

    <ul class="Ob-Navigator-submenu">
      <li
        id="Ob-Navigator-top"
        :style="gradient"
        @click.stop.prevent="handleBackToTop"
      >
        <div>
          <svg-icon
            class="text-ob-bright stroke-current"
            icon-class="nav-top"
          />
        </div>
        <span class="Ob-Navigator-tips"> 返回顶部 </span>
      </li>
      <li
        id="Ob-Navigator-menu"
        :style="gradient"
        @click.stop.prevent="handleOpenMenu"
        v-if="isMobile"
      >
        <div>
          <svg-icon
            class="text-ob-bright stroke-current"
            icon-class="nav-menu"
          />
        </div>
        <span class="Ob-Navigator-tips"> 打开菜单 </span>
      </li>
      <li
        id="Ob-Navigator-home"
        :style="gradient"
        @click.stop.prevent="handleGoHome"
      >
        <div>
          <svg-icon
            class="text-ob-bright stroke-current"
            icon-class="nav-home"
          />
        </div>
        <span class="Ob-Navigator-tips"> 回到首页 </span>
      </li>
      <li
        id="Ob-Navigator-search"
        :style="gradient"
        @click.stop.prevent="handleSearch"
      >
        <div>
          <svg-icon class="text-ob-bright stroke-current" icon-class="search" />
        </div>
        <span class="Ob-Navigator-tips"> 打开搜索 </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ObNavigator",
  data() {
    return {
      progress: 0,
      scrolling: false,
      time: 0,
      scrollingHandler: 0,
      menuReopenHandler: 0,
      needReopen: false,
    };
  },
  mounted() {
    document.addEventListener("scroll", this.scrollHandler);
  },
  onMounted() {
    document.removeEventListener("scroll", this.scrollHandler);
  },
  methods: {
    scrollHandler() {
      clearTimeout(this.scrollingHandler);
      clearTimeout(this.menuReopenHandler);
      this.scrolling = true;
      this.scrollingHandler = setTimeout(() => {
        this.scrolling = false;
      }, 700);

      if (this.needReopen || this.openNavigator === true) {
        if (this.openNavigator === true)
          this.$store.commit("navigator/SET_OPEN_NAVIGATOR", false);
        this.needReopen = true;
        this.menuReopenHandler = setTimeout(() => {
          this.$store.commit("navigator/SET_OPEN_NAVIGATOR", true);
          this.needReopen = false;
        }, 700);
      }
      setTimeout(() => {
        this.progress = Number(
          (
            (window.pageYOffset /
              (document.documentElement.scrollHeight - window.innerHeight)) *
            100
          ).toFixed(0)
        );
      }, 0);
    },
    handleNavigatorToggle() {
      const timeNow = new Date().getTime();
      if (timeNow - this.time < 10) return;
      this.time = timeNow;
      if (this.openNavigator === true && this.needReopen === true)
        this.needReopen = false;
      setTimeout(() => {
        this.$store.dispatch("navigator/toggleOpenNavigator");
      }, 10);
    },
    handleBackToTop() {
      this.$store.commit("navigator/SET_OPEN_NAVIGATOR", false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    handleOpenMenu() {
      this.$store.dispatch("navigator/toggleMobileMenu");
    },
    handleGoHome() {
      this.$store.commit("navigator/SET_OPEN_NAVIGATOR", false);
      this.$router.push("/");
    },
    handleSearch() {
      this.$store.commit("navigator/SET_OPEN_NAVIGATOR", false);
      this.$store.commit("search/SET_OPNEMODAL", true);
    },
  },
  computed: {
    openNavigator() {
      return this.$store.state.navigator.openNavigator;
    },
    gradient() {
      return {
        background: this.$store.state.themeConfig.theme.header_gradient_css,
      };
    },
    showProgress() {
      return this.progress > 5;
    },
    isMobile() {
      return this.$store.state.common.isMobile;
    },
  },
};
</script>

<style lang="scss" scoped>
#Ob-Navigator {
  @apply fixed flex justify-center items-center bottom-4 right-4 w-12 h-12 rounded-full z-40 shadow-lg text-white text-2xl stroke-0 border-2 border-ob-deep-900 cursor-pointer;
  transition: all 0.55s cubic-bezier(0, 1.8, 1, 1.2);
  opacity: 1;
  svg {
    pointer-events: none;
    stroke: currentColor !important;
  }
  .Ob-Navigator-submenu {
    @apply absolute top-0 left-0 m-0 p-0 list-none;
    li {
      @apply flex justify-center items-center bg-ob-deep-900 absolute rounded-full w-12 h-12 p-0.5;
      opacity: 0;
      transition: all 0.55s cubic-bezier(0, 1.8, 1, 1.2);
      &:hover {
        .Ob-Navigator-tips {
          opacity: 1;
          transform: translateX(-15%);
        }
      }
      div {
        @apply flex justify-center items-center bg-ob-deep-800 w-full h-full rounded-full;
      }
    }
  }
  &.Ob-Navigator--open .Ob-Navigator-submenu {
    li {
      opacity: 1;
      &:first-of-type {
        transform: translateX(calc(3rem * -1.6));
      }
      &:nth-of-type(2) {
        transform: translate(calc(3rem * -1.2), calc(3rem * -1.2));
      }
      &:nth-of-type(3) {
        transform: translateY(calc(3rem * -1.6));
      }
      &:nth-of-type(4) {
        transform: translateY(calc(3rem * -2.8));
      }
    }
  }
  &.Ob-Navigator--scrolling {
    transform: translateX(calc(3rem * 0.8));
    opacity: 0.6;
  }
  .Ob-Navigator-tips {
    @apply absolute bg-ob-deep-800 py-1 px-1.5 z-50 text-xs text-ob-bright whitespace-nowrap rounded-md shadow;
    pointer-events: none;
    opacity: 0;
    right: 60%;
    transition: all 0.55s cubic-bezier(0, 1.8, 1, 1.2);
  }
  .Ob-Navigator-ball {
    @apply relative flex justify-center items-center bg-ob-deep-800 w-full h-full p-0.5 rounded-full;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 12px 28px rgba(0, 0, 0, 0.2);
    z-index: 200;
    div {
      @apply flex justify-center items-center w-full h-full rounded-full;
    }
  }
  .Ob-Navigator-btt {
    @apply absolute flex justify-center items-center bg-ob-deep-800 w-full h-full p-0.5 rounded-full;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 12px 28px rgba(0, 0, 0, 0.2);
    top: calc(3rem * -1.1);
    left: 0;
    div {
      @apply flex justify-center items-center w-full h-full rounded-full;
    }
  }
}
</style>
