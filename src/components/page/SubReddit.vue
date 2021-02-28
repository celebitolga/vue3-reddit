<template>
  <Loading v-if="postsState.loading"/>
  
  <Error v-if="postsState.error" :error="postsState.error"/>

  <Cards :posts="posts"/>

  <div v-if="posts.length == 0 && !postsState.error && !postsState.loading">
    No Posts
  </div>
</template>

<script>
import Loading from '@/components/common/Loading';
import Error from '@/components/common/Error';
import Cards from '@/components/card/Cards';

export default {
  data() {
    return {
      page: 1,
    }
  },
  watch: {
    name(newValue, oldValue) {
      this.$store.dispatch('getPosts', {subreddit: newValue, limit: 10});
    }
  },
  computed: {
    postsState() {
      if(this.$store.getters.getPosts){
        return this.$store.getters.getPosts;
      } else {
        return {
          loading: true,
          error: '',
          data: [],
        }
      }
    },
    posts() {
      return this.postsState.data.map((child) => child.data);
    },
  },
  methods: {
    async updatePosts(limit, page) {
      await this.$store.dispatch('updatePosts', {subreddit: this.name, limit});
      this.page = page;
    },
    async control() {
      if (window.document.firstElementChild.offsetHeight - window.document.firstElementChild.scrollTop < 1500 && this.page == 1) {
        let req = false;
        if(!req) {
          req = true;
          this.updatePosts(20, 2);
        }
      } else if(window.document.firstElementChild.offsetHeight - window.document.firstElementChild.scrollTop < 1500 && this.page == 2) {
          let req = false;
          if(!req) {
            req = true;
            this.updatePosts(30, 3);
          }
      } else if(window.document.firstElementChild.offsetHeight - window.document.firstElementChild.scrollTop < 1500 && this.page == 3) {
          let req = false;
          if(!req) {
            req = true;
            this.updatePosts(40, 4);
          }
      } else if(window.document.firstElementChild.offsetHeight - window.document.firstElementChild.scrollTop < 1500 && this.page == 4) {
          let req = false;
          if(!req) {
            req = true;
            this.updatePosts(50, 5);
          }
      } else if(window.document.firstElementChild.offsetHeight - window.document.firstElementChild.scrollTop < 1500 && this.page == 5) {
          let req = false;
          if(!req) {
            req = true;
            this.updatePosts(60, 6);
          }
      } else if (window.document.firstElementChild.offsetHeight - window.document.firstElementChild.scrollTop < 1500 && this.page == 6) {
          let req = false;
          if(!req) {
            req = true;
            this.updatePosts(70, 7);
          }
      } else if (window.document.firstElementChild.offsetHeight - window.document.firstElementChild.scrollTop < 1500 && this.page == 7) {
          let req = false;
          if(!req) {
            req = true;
            this.updatePosts(80, 8);
          }
      } else if (window.document.firstElementChild.offsetHeight - window.document.firstElementChild.scrollTop < 1500 && this.page == 8) {
          let req = false;
          if(!req) {
            req = true;
            this.updatePosts(90, 9);
          }
      } else if (window.document.firstElementChild.offsetHeight - window.document.firstElementChild.scrollTop < 1500 && this.page == 9) {
          let req = false;
          if(!req) {
            req = true;
            this.updatePosts(100, 10);
            window.removeEventListener('scroll', () => { });
          }
      }
    },
    debounce(func, wait = 20, immediate = true) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },
  },
  async created() {
    await this.$store.dispatch('getPosts', {subreddit: this.name, limit: 10});
  },
  mounted() {
    window.addEventListener('scroll', this.debounce(this.control));
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