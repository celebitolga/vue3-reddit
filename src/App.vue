<template>
  <Nav />
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/common/Nav';

export default {
  components: {
    Nav,
  },
}
</script>

<style lang="scss">

</style>
