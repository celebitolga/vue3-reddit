<template>
  <Loading v-if="posts.loading"/>
  
  <Error v-if="posts.error"/>
</template>

<script>
import usePosts from '@/hooks/usePosts';
import Loading from '@/components/common/Loading'
import Error from '@/components/common/Error'

export default {
  setup() {
    const posts = usePosts("all");

    return {
      posts,
    }
  },
  components: {
    Loading,
    Error,
  },
}
</script>

<style>

</style>