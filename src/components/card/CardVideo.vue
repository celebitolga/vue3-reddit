<template>
  <div class="card-image waves-effect waves-block waves-light videoControl">
    <video class="center videoAutoPlay" controls loop="loop" muted="muted">
      <source :src="videoUrl" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoPlay: false,
    }
  },
  methods: {
    checkSlide() {
      const playVideos = document.querySelectorAll(".videoAutoPlay");
      if(playVideos != null) {
        playVideos.forEach(playVideo => {
          const slideInAt = (window.scrollY + window.innerHeight) - playVideo.offsetHeight / 2;
          const isHalfShown = slideInAt > playVideo.parentNode.parentElement.offsetTop;
          const videoBottom = playVideo.parentNode.parentElement.offsetTop + playVideo.offsetHeight;
          const isNotScrolledPast = window.scrollY < videoBottom;

          if (isHalfShown && isNotScrolledPast) {
            if(playVideo.paused && !this.autoPlay) {
              playVideo.play();
              this.autoPlay = true;
            }
          } else {
            playVideo.pause();
            this.autoPlay = false;
          }
          
        });
      }
    }
  },
  mounted() {
    setTimeout(() => {
      window.addEventListener('scroll', this.checkSlide);
    },50);
  },
  unmounted() {
    window.removeEventListener('scroll', this.checkSlide);
  },
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