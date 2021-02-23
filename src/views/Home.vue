<template>

  <Loading v-if="postsState.loading"/>
  
  <Error v-if="postsState.error" :error="posts.error"/>

  <Cards :posts="posts"/>

</template>

<script>
import Loading from '@/components/common/Loading'
import Error from '@/components/common/Error'
import Cards from '@/components/card/Cards'

import { computed } from 'vue'

import usePosts from '@/hooks/usePosts';

export default {
  setup() {
    const postsState = usePosts("aww");

    const posts = computed(() => postsState.data.map((child) => child.data));

    return {
      postsState,
      posts,
    }
  },
  components: {
    Loading,
    Error,
    Cards,
  },
}
</script>

<style>

</style>