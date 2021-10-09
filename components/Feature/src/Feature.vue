<template>
  <div id="feature">
    <horizontal-article :data="data" />
    <!-- Feature sub-component -->
    <slot />
  </div>
</template>

<script >
import HorizontalArticle from '@/components/ArticleCard/src/HorizontalArticle.vue'

export default {
  name: 'Feature',
  props: {
    data: Object,
  },
  components: { HorizontalArticle },
}
</script>

<style lang="scss" scoped></style>
