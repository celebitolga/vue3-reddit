<template>
  <div class="card-image waves-effect waves-block waves-light videoControl">
    <video ref="videoRef" class="center videoAutoPlay" loop="loop" muted="muted" webkit-playsinline="true" playsinline="true" :mediagroup="getVideoUrl()">
      <source :src="getVideoUrl()" type="video/mp4">
    </video>
    <audio ref="audioAutoPlay" loop="loop" muted="muted" :mediagroup="getVideoUrl()" type="audio/mp4">
        <source :src="getVideoAudio()" playsinline="true">
    </audio>
    <div class="playerControls">
      <button @click="playAudio()" class="playerControls-button">{{playing ? '►' : '❚❚'}}</button>
      <div class="playerControls-progress">
        <div ref="progressFilled" class="playerControls-progress-progressFilled"></div>
      </div>
      <button class="playerControls-fullScreen">FullScreen</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      volume: 0.0,
      playing: false,
      playButton: true,
    }
  },
  methods: {
    getVideoUrl() {
      return this.videoUrl;
    },
    getVideoAudio() {
      return this.videoUrl.substring(0,32) + 'DASH_audio.mp4';
    },
    playAudio() {
      if(this.playButton) {
        this.$refs.audioAutoPlay.pause();
        this.$refs.videoRef.pause();
        this.playButton = false;
        this.playing = false;
      } else {
        this.$refs.audioAutoPlay.currentTime = this.$refs.videoRef.currentTime;
        this.$refs.audioAutoPlay.play();
        this.$refs.videoRef.play();
        this.playButton = true;
        this.playing = true;
      }
    },
    playVideo() {
      const playVideo = this.$refs.videoRef;
      const audio = this.$refs.audioAutoPlay;

      if(playVideo != null) {
          const slideInAt = (window.scrollY + window.innerHeight) - playVideo.offsetHeight / 2;
          const isHalfShown = slideInAt > playVideo.parentNode.parentElement.offsetTop;
          const videoBottom = playVideo.parentNode.parentElement.offsetTop + playVideo.offsetHeight;
          const isNotScrolledPast = window.scrollY < videoBottom;

        if (isHalfShown && isNotScrolledPast && playVideo.readyState === 4) {
          if(playVideo.paused && !this.playing && this.playButton) {
            playVideo.play();
            // if (audio.muted) {
            //   audio.play();
            // }
            this.playing = true;
          }
        } else {
          if(!playVideo.paused) {
            playVideo.pause();
            audio.pause();
            this.playing = false;
          }
        }
      }
    },
    handleProgress() {
      const percent = (this.$refs.videoRef.currentTime / this.$refs.videoRef.duration) * 100;
      this.$refs.progressFilled.style.flexBasis = `${ percent }%`;
    },
  },
  mounted() {
    setTimeout(() => {
      window.addEventListener('scroll', this.playVideo);
      this.$refs.videoRef.addEventListener('timeupdate', this.handleProgress);
    },50);
  },
  unmounted() {
    window.removeEventListener('scroll', this.playVideo);
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 100%;
    max-width: 640px;
    max-height: 650px;
  }
}

.playerControls {
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;

  &-button {
    // background-color: rgba(0,0,0,0.5);
    outline: none;
    border: none;
  }

  &-progress {
    flex: 10;
    position: relative;
    display: flex;
    flex-basis: 100%;
    height: 5px;
    transition: height 0.3s;
    background: rgba(7, 104, 214, 0.5);
    // cursor: ew-resize;
    align-self: center;
    margin: 0 10px;

    &-progressFilled {
      background: #ffc600;
    }
  }
}
</style>