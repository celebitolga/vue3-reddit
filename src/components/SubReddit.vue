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


import { computed, watch, onMounted } from 'vue';

export default {
  setup(props) {
    let postsState = usePosts(props.name, 10);

    watch(() => props.name, (value, oldValue) => {
      postsState = usePosts(props.name, 10);
    });

    watch(() => postsState.data, (value, oldValue) => {
      console.log(value);
    });

    const posts = computed(() => {
      if(props.name) {
        return postsState.data.map((child) => child.data);
      }
    });

    let i = true;
    async function control() {
      // ! Vuex kullan
      if(this.document.firstElementChild.offsetHeight - this.document.firstElementChild.scrollTop < 1500 && i) {
        window.removeEventListener('scroll', () => { });
        console.log(usePosts(props.name, 20));
        i = false;
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', control);
    })
    
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