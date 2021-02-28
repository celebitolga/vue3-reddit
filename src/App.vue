<template>
  <Nav />
  <AppSearch />
  
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/common/Nav';
import AppSearch from '@/components/common/AppSearch.vue';

export default {
  components: {
    Nav,
    AppSearch,
  },
}
</script>

<style lang="scss">

</style>
