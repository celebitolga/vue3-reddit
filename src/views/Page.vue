<template>

  <SubReddit :name="$route.params.text"/>
  
</template>

<script>
import SubReddit from '@/components/page/SubReddit';

export default {
  setup() {
  },
  components: {
    SubReddit,
  },
}
</script>

<style>

</style>