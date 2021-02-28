<template>
  <div class="carousel carousel-slider center">
    <div class="carousel-item deneme" v-for="(key) in images" :key="key">
      <img :src="getImageUrl(key)">
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  setup() {

    const getImageUrl = (key) => {
      if(key.p[3]) {
        return key.p[3].u.replace(/amp;/g, '')
      }
    }
    onMounted(() => {
      var elems = document.querySelectorAll('.carousel');
      var instances = M.Carousel.init(elems);
    })

    return {
      getImageUrl,
    }
  },
  props: {
    images: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
.carousel {
  max-height: 300px;
}

.deneme {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.deneme img {
  /* height: 100%; */
}

</style>