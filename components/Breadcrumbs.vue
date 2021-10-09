<template>
  <ul class="breadcrumbs flex flex-row gap-6 text-white">
    <li>{{ '首页' }}</li>
    <li>{{ current }}</li>
  </ul>
</template>

<script >
export default {
  name: 'Breadcrumb',
  props: {
    current: String,
  },
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  position: relative;
  z-index: 20;
  li {
    position: relative;
    z-index: 20;
    &:after {
      content: '>';
      position: absolute;
      top: 0.05rem;
      right: -0.95rem;
      opacity: 0.65;
    }
    &:last-of-type {
      &:after {
        content: '';
      }
    }
  }
}
</style>
