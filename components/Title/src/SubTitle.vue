<template>
  <p
    class="
      relative
      flex
      items-center
      pb-2
      mb-4
      text-xl text-ob-bright
      uppercase
    "
  >
    <svg-icon
      v-if="icon && side === 'left'"
      :icon-class="icon"
      class="inline-block mr-2"
    />
    <span :class="titleClass">{{ title }}</span>
    <svg-icon
      v-if="icon && side === 'right'"
      :icon-class="icon"
      class="inline-block ml-2"
    />
    <span :class="lineClass" :style="gradientBackground" />
  </p>
</template>

<script>
export default {
  name: 'SubTitle',
  props: {
    title: {
      type: String,
      default: '',
      requried: true,
    },
    side: {
      type: String,
      default: 'left',
    },
    icon: String,
  },
  computed: {
    gradientBackground() {
      return {
        background: this.$store.state.themeConfig.theme.header_gradient_css,
      }
    },
    titleClass() {
      return {
        'w-full': true,
        block: true,
        'text-right': this.side.value === 'right' ? true : false,
      }
    },
    lineClass() {
      return {
        absolute: true,
        'bottom-0': true,
        'h-1': true,
        'w-14': true,
        'rounded-full': true,
        'right-0': this.side.value === 'right' ? true : false,
      }
    },
  },
}
</script>
