<template>
  <ul
    id="sidebar-navigator"
    class="
      flex flex-row
      bg-ob-deep-800
      rounded-xl
      shadow-2xl
      justify-items-center
      overflow-hidden
    "
  >
    <li
      class="
        border-r-4 border-ob-deep-900
        flex
        justify-center
        py-3
        w-full
        hover:opacity-50
        hover:text-ob
        transition-all
        cursor-pointer
      "
      @click="goBack"
    >
      <svg-icon class="inline-block text-3xl" icon-class="go-back" />
    </li>
    <li
      class="
        border-r-4 border-ob-deep-900
        flex
        justify-center
        py-3
        w-full
        hover:opacity-50
        hover:text-ob
        transition-all
        cursor-pointer
      "
      @click="backToTop"
    >
      <svg-icon class="inline-block text-3xl" icon-class="back-to-top" />
    </li>
    <li
      class="
        flex
        justify-center
        py-3
        w-full
        hover:opacity-50
        hover:text-ob
        transition-all
        cursor-pointer
      "
      @click="jumpToComments"
      data-dia="jump-to-comment"
    >
      <svg-icon class="inline-block text-3xl" icon-class="quote" />
    </li>
  </ul>
</template>

<script >
export default {
  name: "JjNavigator",
  data() {
    return {
      commentOffset: 0,
      commentEl: 0,
    };
  },
  methods: {
    backToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    goBack() {
      this.$router.back();
    },
    jumpToComments() {
      const comments = document.getElementById("comments");
      this.commentOffset = comments ? comments.offsetTop + 120 - 30 : 0;
      window.scrollTo({
        top: this.commentOffset,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#sidebar-navigator {
  svg {
    pointer-events: none;
  }
}
</style>
