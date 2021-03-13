<template>
  <div ref="videoControl" class="card-image waves-effect waves-block waves-light videoControl">
    <video ref="videoPlayer" class="video-js"></video>
    <audio ref="audioAutoPlay" loop="loop">
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
      player: null,
      loading: true,
      volume: 0.0,
      videoPaused: false,
      firstPlay: true,
      playing: false,
      timeUpdate: false,
      fullScreen: false,
    };
  },
  computed: {
    oldVolume() {
      return this.$store.getters.getOldVolume;
    },
    options() {
      return {
        autoplay: false,
				controls: true,
        muted: true,
        loop: true,
				sources: [
					{
						src: this.getVideoUrl(),
						type: "video/mp4"
					}
				]
      }
    },
  },
  props: {
    videoUrl: {
      type: String,
      required: true,
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
      const playVideo = this.$refs.videoPlayer|| null;
      // eslint-disable-next-line prefer-destructuring
      const videoRef = this.$refs.videoRef;
      const playAudio = this.$refs.audioAutoPlay;
      
      if (playVideo != null) {
        const slideInAt = (window.scrollY + window.innerHeight) - playVideo.offsetHeight / 2;
        const isHalfShown = slideInAt > playVideo.parentNode.parentElement.offsetParent.offsetTop;
        const videoBottom = playVideo.parentNode.parentElement.offsetParent.offsetTop + playVideo.offsetHeight;
        const isNotScrolledPast = window.scrollY < videoBottom;


        if (isHalfShown && isNotScrolledPast && playVideo.readyState === 4) {
          if (playVideo.paused && !this.playing && !this.videoPaused) {
            playVideo.play();
            playAudio.play();
            this.playing = true;
          }
        } else if (isHalfShown && isNotScrolledPast && videoRef.readyState === 4 && isNaN(playAudio.duration)) {
          if (playVideo.paused && !this.playing && !this.videoPaused) {
            playVideo.play();
            playAudio.play();
            this.playing = true;
          }
        } else if (!playVideo.paused) {
          playVideo.pause();
          playAudio.pause();
          this.playing = false;
        }
      }
    },
    handleProgress() {
      const playVideo = this.$refs.videoPlayer;
      const playAudio = this.$refs.audioAutoPlay;
      playAudio.volume = this.oldVolume;
      playVideo.volume = this.oldVolume;
      if (playAudio.duration > 0) {
        if (this.firstPlay) {
          playAudio.currentTime = playVideo.currentTime;
          this.firstPlay = false;
          playAudio.play();
        }

        if (this.timeUpdate && this.playing) {
          playAudio.currentTime = playVideo.currentTime;
          playAudio.play();
          this.timeUpdate = false;
        }
      } else {
        // Hide volume controls if video has no audio
        playVideo.parentElement.children[5].children[1].style.display = 'none';
      }
    },
    handleSeeked() {
      this.timeUpdate = true;
    },
    handlePauseVideo(event) {
      if (event.type == "click") {
        if (event.target.className !== 'vjs-control-bar') {
          this.videoPaused = true;
        }
      } else {
        const playAudio = this.$refs.audioAutoPlay;
        this.playing = false;
        playAudio.pause();
      }
    },
    handlePlayingVideo() {
      const playAudio = this.$refs.audioAutoPlay;
      this.playing = true;
      this.videoPaused = false;
      playAudio.play();
    },
    handleVolumeChange() {
      const playVideo = this.$refs.videoPlayer;
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
    handleFullScreenChange() {
      if (this.fullScreen) {
        this.$refs.videoControl.classList.remove('videoControl');
        this.fullScreen = true;
      } else {
        this.$refs.videoControl.classList.add('videoControl');
        this.fullScreen = false;
      }
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
      const videoClick = this.$refs.videoControl;
      videoClick.addEventListener('click', this.handlePauseVideo);

      const playVideo = this.$refs.videoPlayer;
      const player = videojs(playVideo, this.options);

      player.on('canplay', () => {
        window.addEventListener('scroll', this.handlePlayVideo);
        this.handleCanPlay();
      })
      player.on('timeupdate', this.handleProgress);
      player.on('seeked', this.handleSeeked);
      player.on('pause', this.handlePauseVideo);
      player.on('playing', this.handlePlayingVideo);
      player.on('volumechange', this.handleVolumeChange);
      player.on('fullscreenchange', this.handleFullScreenChange);
      player.on('loadstart', this.handleLoadStart);

      // const playVideo = this.$refs.plyr.player;
      // const videoClick = this.$refs.videoControl;
      // videoClick.addEventListener('click', this.handlePauseVideo);
      // playVideo.on('canplay', () => {
      //   window.addEventListener('scroll', this.handlePlayVideo);
      //   this.handleCanPlay();
      // });
      // playVideo.on('timeupdate', this.handleProgress);
      // playVideo.on('seeked', this.handleSeeked);
      // playVideo.on('pause', this.handlePauseVideo);
      // playVideo.on('playing', this.handlePlayingVideo);
      // playVideo.on('volumechange', this.handleVolumeChange);
      // playVideo.on('enterfullscreen', this.handleEnterFullScreen);
      // playVideo.on('exitfullscreen', this.handleExitFullScreen);
      // playVideo.on('loadstart', this.handleLoadStart);
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

  // .videoLoading {
  //   position: absolute;
  //   z-index: 99;
  //   top: 50%;
  //   right: 50%;
  //   transform: translate(-50%, -50%);
  // }

  video {
    width: 100%;
    max-width: 640px;
    max-height: 650px;
  }
}

</style>
