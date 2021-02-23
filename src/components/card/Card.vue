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

    <CardCarousel v-if="post.media_metadata" :images="post.media_metadata"/>

    <div v-if="isVideo()" class="card-image waves-effect waves-block waves-light videoControl">
      <video class="center" controls autoplay="autoplay" loop="loop">
        <source :src="getVideoUrl()" type="video/mp4">
      </video>
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4 titleControl"> {{post.title}} </span>
      <p><a :href="`https://reddit.com${post.permalink}`">{{post.num_comments}} Comments</a></p>
    </div>
  </div>
</template>

<script>
import CardCarousel from '@/components/card/CardCarousel';

import { ref, onMounted } from 'vue'

export default {
  setup(props) {
    const imageSize = ref(null);
    const seeFullImage = ref(false);

    const isImage = () => {
      return props.post.url.match(/bmp|webp|png|jpg|jpeg|gif$/);
    }

    const isVideo = () => {
      if(props.post.crosspost_parent_list) {
        return props.post.crosspost_parent_list[0].is_video;
      }
      if(props.post.is_video) {
        return true;
      }
      return false;
    }

    const getVideoUrl = () => {
      if(props.post.crosspost_parent_list != null && props.post.crosspost_parent_list[0].is_video) {
        return props.post.crosspost_parent_list[0].secure_media.reddit_video.fallback_url;
      }
      return props.post.secure_media.reddit_video.fallback_url;
    }

    const checkImageSize = () => {
      if(imageSize._rawValue != null) {
        if(imageSize.value.height > 520) {
          seeFullImage.value = true;
        }
      }
    }

    onMounted(() => {
      checkImageSize();
    });

    return {
      imageSize,
      seeFullImage,
      isImage,
      isVideo,
      getVideoUrl,
    }
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: {
    CardCarousel,
  },
}
</script>

<style lang="scss" scoped>
  .cardControl {
    width: 100%;
    max-width: 640px;
  }
  .imageControl {
    max-height: 512px;
    .imageControlBlock {
      width: 100%;
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
      width: 100%;
      max-width: 640px;
      max-height: 650px;
    }
  }

  .titleControl {
    word-wrap: break-word
  }
</style>>