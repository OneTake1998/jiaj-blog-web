<template>
  <div class="toggler" @click="changeStatus">
    <div class="toggle-track"></div>
    <div
      class="slider"
      :style="{
        transform: toggleStyle.transform,
        backgroundColor: toggleStyle.background,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  props: {
    status: Boolean,
  },
  data() {
    return {
      toggleStyle: {
        transform: '18px',
        backgroundColor: '#6e40c9',
      },
    }
  },
  created() {
    this.changeTransform(this.status)
  },
  methods: {
    changeStatus() {
      let newStatus = !this.status
      this.changeTransform(newStatus)
      this.$emit('changeStatus', newStatus)
    },
    changeTransform(status) {
      const transform = status ? '18px' : '0'
      this.toggleStyle.transform = `translateX(${transform})`
      const backgroundColor = status ? '#6e40c9' : '#100E16'
      this.toggleStyle.background = backgroundColor
    },
  },
}
</script>

<style lang="scss" scoped>
.toggler {
  @apply relative;
  width: 40px;
  height: 22px;
  background-color: var(--background-primary);
  border-radius: 24px;
  border: 3px solid rgba(110, 64, 201, 0.35);
  box-sizing: border-box;
  transition: background-color 250ms ease;
}
.slider {
  top: -6px;
  left: -6px;
  width: 28px;
  height: 28px;
  background-color: #6e40c9;
  border-radius: 50%;
  transition: all 250ms cubic-bezier(0.4, 0.03, 0, 1) 0s;
  @apply absolute shadow-lg;
}
</style>
