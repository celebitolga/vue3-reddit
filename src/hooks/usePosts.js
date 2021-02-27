import { reactive, watch } from 'vue';
import API from '@/lib/api';

export default function usePosts(subreddit) {
  const postsState = reactive({
    loading: false,
    error: '',
    data: [],
  });
  
  async function loadData() {
    try {
      postsState.loading = true;
      postsState.error = '';
      postsState.data = [];

      postsState.data = await API.getPosts(subreddit);
    } catch (error) {
      postsState.error = error.message || "Error loading posts.";
    } finally {
      postsState.loading = false;
    }
  }

  watch(() => subreddit, (value, oldValue) => {
    loadData();
  }, { immediate: true });
  //loadData(); immeditate: true


  return postsState;
}