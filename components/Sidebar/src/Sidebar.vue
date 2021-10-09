<template>
  <div v-if="!isMobile">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  computed: {
    isMobile() {
      return this.$store.state.common.isMobile;
    },
  },
};
</script>

<style lang="scss" scoped></style>
