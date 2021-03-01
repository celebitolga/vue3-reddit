<template>

  <AppPage :name="$route.params.text"/>
  
</template>

<script>
import AppPage from '@/components/page/AppPage';

export default {
  setup() {
  },
  components: {
    AppPage,
  },
}
</script>

<style>

</style>