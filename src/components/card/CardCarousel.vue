<template>
  <div class="carousel carousel-slider center">
    <div class="carousel-item red white-text" href="#one!" v-for="(key) in images" :key="key">
      <img :src="getImageUrl(key)">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImageUrl(key) {
      return key.p[3].u.replace(/amp;/g, '')
    }
  },
}
</script>

<style>

</style>