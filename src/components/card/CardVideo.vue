<template>
  <div class="card-image waves-effect waves-block waves-light videoControl">
    <video class="center" controls autoplay="autoplay" loop="loop">
      <source :src="videoUrl" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  props: {
    videoUrl: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>