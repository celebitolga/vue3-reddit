<template>
  <Loading v-if="postsState.loading"/>
  
  <Error v-if="postsState.error" :error="postsState.error"/>

  <Cards :posts="posts"/>

  <div v-if="posts.length == 0 && !postsState.error && !postsState.loading">
    No Posts
  </div>
</template>

<script>
import Loading from '@/components/common/Loading'
import Error from '@/components/common/Error'
import Cards from '@/components/card/Cards'

import usePosts from '@/hooks/usePosts';


import { computed, watch } from 'vue';

export default {
  setup(props) {
    let postsState = usePosts(props.name);

    watch(() => props.name, (value, oldValue) => {
      postsState = usePosts(props.name);
    });

    watch(() => postsState, (value, oldValue) => {
      console.log(value);
    });

    const posts = computed(() => {
      if(props.name) {
        return postsState.data.map((child) => child.data);
      }
    });
    
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
  props: {
    name: String,
  },
}
</script>

<style>

</style>