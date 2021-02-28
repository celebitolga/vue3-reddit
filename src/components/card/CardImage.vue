<template>
  <div class="card-image waves-effect waves-block waves-light imageControl">
    <div ref="imageSize" class="imageControlBlock">
      <img class="activator" :src="getImageUrl()">
    </div>
    <a v-if="seeFullImage" class="seeFullImage" :href="getImageUrl()" target="_blank">
      See Full Image
    </a>
  </div>
</template>

<script>

export default {
  data() {
    return {
      seeFullImage: false,
    }
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImageUrl() {
      if(this.post.url.endsWith('.gifv')) {
        return this.post.url.replace('.gifv', '.gif');
      } else {
        return this.post.url;
      }
    },
    checkImageSize() {
      if(this.$refs.imageSize != null) {
        if(this.$refs.imageSize.offsetHeight > 500) {
          this.seeFullImage = true;
        }
      } else {
        this.seeFullImage = false;
      }
    },
  },
  mounted () {
    setTimeout(() => {
      this.checkImageSize();
    }, 50)
  },
  updated () {
    setTimeout(() => {
      this.checkImageSize();
    }, 50)
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