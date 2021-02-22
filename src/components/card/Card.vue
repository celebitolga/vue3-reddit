<template>
  <div class="card cardControl">
    <div v-if="isImage() && !post.is_video" class="card-image waves-effect waves-block waves-light imageControl">
      <div class="imageControlBlock">
        <img ref="imageSize" class="activator" :src="post.url">
      </div>
      <a v-if="seeFullImage" class="seeFullImage" :href="post.url" target="_blank">
        See Full Image
      </a>
    </div>
    <div v-if="isVideo()" class="card-image waves-effect waves-block waves-light videoControl">
      <video class="center" controls autoplay="autoplay">
        <source :src="getVideoUrl()" type="video/mp4">
      </video>
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4"> {{post.title}} </span>
      <p><a :href="`https://reddit.com${post.permalink}`">{{post.num_comments}} Comments</a></p>
    </div>
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
    isImage() {
      return this.post.url.match(/bmp|webp|png|jpg|jpeg|gif$/);
    },
    isVideo() {
      if(this.post.crosspost_parent_list) {
        return this.post.crosspost_parent_list[0].is_video;
      }
      if(this.post.is_video) {
        return true;
      }
      return false;
    },
    getVideoUrl() {
      if(this.post.crosspost_parent_list != null && this.post.crosspost_parent_list[0].is_video) {
        return this.post.crosspost_parent_list[0].secure_media.reddit_video.fallback_url;
      }
      return this.post.secure_media.reddit_video.fallback_url;
    },
  },
  mounted() {
    if(this.$refs.imageSize) {
      if(this.$refs.imageSize.height > 520) {
        this.seeFullImage = true;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .cardControl {
    width: 640px;
  }
  .imageControl {
    max-height: 512px;
    .imageControlBlock {
      max-width: 380px;
      margin: 0 auto;
      overflow: hidden;
      max-height:512px
      img {

      }
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

  .videoControl {
    display: flex;
    justify-content: center;
    align-items: center;

    video {
      max-width: 640px;
      max-height: 650px;
    }
  }
</style>>