<template>
  <Card v-for="post in posts" :post="post" :key="'post-' + post.id" />
</template>

<script>
import Card from "@/components/card/Card";

export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  components: {
    Card,
  },
};
</script>

<style>
</style>