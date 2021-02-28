import API from "@/lib/api";
import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      posts: {
        loading: false,
        error: "",
        data: []
      },
      search: [],
    };
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
    setSearch(state, payload) {
      state.search = payload;
    },
  },
  actions: {
    async getPosts({ commit }, payload) {
      let loading = true;
      let error = "";
      let data = [];
      commit("setPosts", { loading, error, data });

      try {
        data = await API.getPosts(payload.subreddit, payload.limit);
      } catch (err) {
        error = err.message || "Error loading posts.";
      } finally {
        loading = false;
        commit("setPosts", { loading, error, data });
      }
    },
    async updatePosts({ commit, state }, payload) {
      let loading = state.posts.loading;
      let error = state.posts.error;
      let data = state.posts.data;

      try {
        data = await API.getPosts(payload.subreddit, payload.limit);
      } catch (err) {
        error = err.message || "Error loading posts.";
      } finally {
        loading = false;
        commit("setPosts", { loading, error, data });
      }
    },
    async getSearch({ commit }, payload) {
      let data = [];
      try {
        data = await API.getSearch(payload);
      } catch (error) {
        
      } finally {
        commit("setSearch", data);
      }
    },
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
    getSearch(state) {
      return state.search;
    },
  },
  modules: {}
});
