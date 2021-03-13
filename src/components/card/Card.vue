<template>
  <div class="card cardControl" v-if="!post.over_18">

    <CardImage v-if="isImage && !post.is_video" :post="post"/>

    <CardCarousel v-if="post.media_metadata" :images="post.media_metadata"/>

    <!-- <CardVideo v-if="isVideo" :videoUrl="videoUrl"/> -->

    <!-- <CardVideo2 v-if="isVideo" :videoUrl="videoUrl"/> -->

    <CardVideo3 v-if="isVideo" :videoUrl="videoUrl"/>

    <div class="card-content">
      <div v-if="post.media_metadata" class="sliderControl">Slider</div>
      <span class="card-title activator grey-text text-darken-4 titleControl"> {{post.title}} </span>
      <p><a :href="`https://reddit.com${post.permalink}`">{{post.num_comments}} Comments</a></p>
    </div>

  </div>
</template>

<script>
import CardCarousel from '@/components/card/CardCarousel';
import CardImage from '@/components/card/CardImage';
import CardVideo from '@/components/card/CardVideo';
import CardVideo2 from '@/components/card/CardVideo2';
import CardVideo3 from '@/components/card/CardVideo3';

import { computed } from 'vue';

export default {
  setup(props) {

    const isImage = computed(() => props.post.url.match(/bmp|webp|png|jpg|jpeg|gif|gifv$/));

    const isVideo = computed(() => {
      if (props.post.crosspost_parent_list) {
        return props.post.crosspost_parent_list[0].is_video;
      }
      if (props.post.is_video) {
        return true;
      }
      return false;
    });

    const videoUrl = computed(() => {
      if (props.post.crosspost_parent_list != null && props.post.crosspost_parent_list[0].is_video) {
        return props.post.crosspost_parent_list[0].secure_media.reddit_video.fallback_url;
      }
      return props.post.secure_media.reddit_video.fallback_url;
    });

    return {
      isImage,
      isVideo,
      videoUrl,
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
    CardImage,
    CardVideo,
    CardVideo2,
    CardVideo3,
  },
}
</script>

<style lang="scss" scoped>
  .cardControl {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
  }

  .titleControl {
    word-wrap: break-word
  }

  .sliderControl {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
  }
</style>>