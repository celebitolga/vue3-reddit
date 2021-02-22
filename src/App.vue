<template>
  <Nav />
  <router-view class="container"/>
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
