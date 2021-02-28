<template>
  <div class="card-image waves-effect waves-block waves-light imageControl">
    <div ref="imageSize" class="imageControlBlock">
      <img class="activator" :src="getImageUrl()">
    </div>
    <a v-show="seeFullImage" class="seeFullImage" :href="getImageUrl()" target="_blank">
      See Full Image
    </a>
  </div>
</template>

<script>
import { ref, onUpdated, onMounted } from 'vue';

export default {
  setup(props) {
    const imageSize = ref(null);
    const seeFullImage = ref(false);
    

    const getImageUrl = () => {
      if(props.post.url.endsWith('.gifv')) {
        return props.post.url.replace('.gifv', '.gif');
      } else {
        return props.post.url;
      }
    }

    const checkImageSize = () => {
      if(imageSize.value != null) {
        if(imageSize.value.offsetHeight > 500) {
          seeFullImage.value = true;
        }
      } else {
        seeFullImage.value = false;
      }
    }

    onMounted(() => {
      setTimeout(() => {
        checkImageSize();
      }, 50)
    });

    onUpdated(() => {
      checkImageSize();
    })

    return {
      imageSize,
      seeFullImage,
      getImageUrl,
    }
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">

.imageControl {
  max-height: 512px;
  .imageControlBlock {
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
    overflow: hidden;
    max-height:512px;
  }
}

.seeFullImage {
  z-index: 999;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .5px;
  line-height: 24px;
  text-transform: uppercase;
  background-color: rgba(80,85,87,.8);
  border-radius: 4px;
  bottom: 16px;
  color: #fff;
  line-height: 32px;
  position: absolute;
  text-align: center;
  text-decoration: none;
  width: 320px;
  left: 50%;
  transform: translate(-50%);
}
</style>