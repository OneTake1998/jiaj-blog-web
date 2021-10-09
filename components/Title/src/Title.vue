<template>
  <p
    :id="id"
    class="
      relative
      opacity-90
      flex
      items-center
      pt-12
      pb-2
      mb-8
      text-3xl text-ob-bright
      uppercase
    "
  >
    <svg-icon v-if="icon" :icon-class="icon" class="inline-block mr-2" />
    {{title}}
    <span
      class="absolute bottom-0 h-1 w-24 rounded-full"
      :style="gradientBackground"
    />
  </p>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      required: true
    },
    id: String,
    icon: String
  },
  computed:{
    gradientBackground(){
       return { background: this.$store.state.themeConfig.theme.header_gradient_css }
    }
  }
 
}
</script>
