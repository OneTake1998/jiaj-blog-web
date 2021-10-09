<template>
  <div class="header-container">
    <header class="site-header">
      <Logo />
      <Navigation />
      <Controls />
    </header>
  </div>
</template>

<script>
// import { Logo,Navigation,Controls } from '../index.js'
import Logo from './Logo'
import Navigation from './Navigation'
import Controls from './Controls'
export default {
  name: 'Header',
  components: {
    Logo,
    Navigation,
    Controls,
  },
  props: {
    msg: String,
  },
}
</script>

<style lang="scss" scoped>
.header-container {
  .site-header {
    max-width: var(--max-width);
    @apply relative flex z-50 my-0 mx-auto py-4;
  }
}
</style>