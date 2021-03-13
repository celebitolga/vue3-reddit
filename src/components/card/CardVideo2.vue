<template>
  <div ref="videoControl" class="card-image waves-effect waves-block waves-light videoControl">
    <CircularLoading v-if="loading" class="videoLoading"/>
    <vue-plyr ref="plyr">
      <video
        ref="videoRef"
        controls
        crossorigin
        playsinline
        muted="muted"
        loop="loop"
      >
        <source
          :src="getVideoUrl()"
          type="video/mp4"
        />
      </video>
    </vue-plyr>
    <audio crossorigin playsinline ref="audioAutoPlay" loop="loop">
      <source
          :src="getVideoAudio()"
          type="audio/mp3"
      />
    </audio>
  </div>
</template>

<script>
import CircularLoading from '@/components/common/CircularLoading';

export default {
  components: {
    CircularLoading,
  },
  data() {
    return {
      loading: true,
      volume: 0.0,
      firstPlay: true,
    };
  },
  computed: {
    oldVolume() {
      return this.$store.getters.getOldVolume;
    }
  },
  props: {
    videoUrl: {
      type: String,
      required: true,
      playing: false,
    },
  },
  methods: {
    getVideoUrl() {
      return this.videoUrl;
    },
    getVideoAudio() {
      return `${this.videoUrl.substring(0, 32)}DASH_audio.mp4`;
    },
    handlePlayVideo() {
      const playVideo = this.$refs.plyr.player || null;
      // eslint-disable-next-line prefer-destructuring
      const videoRef = this.$refs.videoRef;
      const audio = this.$refs.audioAutoPlay;

      if (playVideo != null) {
        const slideInAt = (window.scrollY + window.innerHeight) - playVideo.elements.container.offsetHeight / 2;
        const isHalfShown = slideInAt > playVideo.elements.container.parentNode.parentElement.offsetTop;
        const videoBottom = playVideo.elements.container.parentNode.parentElement.offsetTop + playVideo.elements.container.offsetHeight;
        const isNotScrolledPast = window.scrollY < videoBottom;


        if (isHalfShown && isNotScrolledPast && videoRef.readyState === 4 && audio.readyState === 4) {
          if (playVideo.paused && !this.playing) {
            playVideo.play();
            audio.play();
            this.playing = true;
          }
        } else if (isHalfShown && isNotScrolledPast && videoRef.readyState === 4 && isNaN(audio.duration)) {
          if (playVideo.paused && !this.playing) {
            playVideo.play();
            audio.play();
            this.playing = true;
          }
        } else if (!playVideo.paused) {
          playVideo.pause();
          audio.pause();
          this.playing = false;
        }
      }
    },
    handleProgress() {
      const playVideo = this.$refs.plyr.player;
      const playAudio = this.$refs.audioAutoPlay;
      if (this.$refs.audioAutoPlay.duration > 0) {
        playAudio.currentTime = playVideo.currentTime;
        playAudio.volume = this.oldVolume;
        playVideo.volume = this.oldVolume;
        playAudio.play();
      } else {
        // Hide volume controls if video has no audio
        playVideo.elements.controls.children[3].style.display = 'none';
      }
    },
    handlePauseVideo() {
      const playAudio = this.$refs.audioAutoPlay;
      playAudio.pause();
    },
    handleVolumeChange() {
      const playVideo = this.$refs.plyr.player;
      const playAudio = this.$refs.audioAutoPlay;

      this.volume = playVideo.volume;
      this.$store.commit('setOldVolume', this.volume);

      if (playVideo.muted) {
        playAudio.volume = 0;
        playVideo.volume = 0;
      } else {
        playAudio.volume = playVideo.volume;
      }
    },
    handleEnterFullScreen() {
      this.$refs.videoControl.classList.remove('videoControl');
    },
    handleExitFullScreen() {
      this.$refs.videoControl.classList.add('videoControl');
    },
    handleLoadStart() {
      this.loading = true;
    },
    handleCanPlay() {
      this.loading = false;
    },
  },
  mounted() {
    setTimeout(() => {
      const playVideo = this.$refs.plyr.player;
      playVideo.on('canplay', () => {
        window.addEventListener('scroll', this.handlePlayVideo);
        this.handleCanPlay();
      });
      playVideo.on('timeupdate', this.handleProgress);
      playVideo.on('pause', this.handlePauseVideo);
      playVideo.on('volumechange', this.handleVolumeChange);
      playVideo.on('enterfullscreen', this.handleEnterFullScreen);
      playVideo.on('exitfullscreen', this.handleExitFullScreen);
      playVideo.on('loadstart', this.handleLoadStart);
    }, 50);
  },
};
</script>

<style lang="scss">
.videoControl {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .videoLoading {
    position: absolute;
    z-index: 99;
    top: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
  }

  video {
    width: 100%;
    max-width: 640px;
    max-height: 650px;
  }
}

</style>
