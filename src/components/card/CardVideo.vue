<template>
  <div class="card-image waves-effect waves-block waves-light videoControl">
    <video @click="toggleVideo()" ref="videoRef" class="center videoAutoPlay" loop="loop" muted="muted" webkit-playsinline="true" playsinline="true" :mediagroup="getVideoUrl()">
      <source :src="getVideoUrl()" type="video/mp4">
    </video>
    <audio ref="audioAutoPlay" loop="loop" muted="muted" :mediagroup="getVideoUrl()" type="audio/mp4">
        <source :src="getVideoAudio()" playsinline="true">
    </audio>

    <!-- Video controllers -->
    <div class="playerControls">
      <!-- Play - Pause button -->
      <div @click="toggleVideo()" class="playerControls-button" v-if="playing">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 298.667 298.667" style="enable-background:new 0 0 298.667 298.667;" xml:space="preserve">
          <g>
            <g>
              <polygon points="32,0 32,298.667 266.667,149.333 		"/>
            </g>
          </g>
        </svg>
      </div>
      <div @click="toggleVideo()" class="playerControls-button" v-else>
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 298.667 298.667" style="enable-background:new 0 0 298.667 298.667;" xml:space="preserve">
          <g>
            <g>
              <g>
                <rect x="192" y="0" width="85.333" height="298.667"/>
                <rect x="21.333" y="0" width="85.333" height="298.667"/>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <!-- <button @click="toggleVideo()" class="playerControls-button">{{playing ? '►' : '❚❚'}}</button> -->

      <!-- Change video/audio time and progress bar -->
      <div @click="changeVideoTime($event)" ref="playerControlsProgress" class="playerControls-progress">
        <div ref="progressFilled" class="playerControls-progress-progressFilled"></div>
      </div>

      <!-- Change video/audio volume -->
      <div v-if="hasSound" class="playerControls-volume">
        <div @click="toggleAudio()" class="playerControls-volume-volumeButton" v-if="sound">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve">
            <g>
              <g>
                <g>
                  <path d="M288,192c0-37.653-21.76-70.187-53.333-85.867v171.84C266.24,262.187,288,229.653,288,192z"/>
                  <polygon points="0,128 0,256 85.333,256 192,362.667 192,21.333 85.333,128 			"/>
                  <path d="M234.667,4.907V48.96C296.32,67.307,341.333,124.373,341.333,192S296.32,316.693,234.667,335.04v44.053
                    C320.107,359.68,384,283.413,384,192S320.107,24.32,234.667,4.907z"/>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div @click="toggleAudio()" class="playerControls-volume-volumeButton" v-else>
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve">
            <g>
              <g>
                <g>
                  <path d="M288,192c0-37.653-21.76-70.187-53.333-85.867v47.147l52.373,52.373C287.68,201.173,288,196.587,288,192z"/>
                  <path d="M341.333,192c0,20.053-4.373,38.933-11.52,56.32l32.32,32.32C376,254.08,384,224,384,192
                    c0-91.307-63.893-167.68-149.333-187.093V48.96C296.32,67.307,341.333,124.373,341.333,192z"/>
                  <polygon points="192,21.333 147.413,65.92 192,110.507 			"/>
                  <path d="M27.2,0L0,27.2L100.8,128H0v128h85.333L192,362.667V219.2l90.773,90.773c-14.293,10.987-30.4,19.84-48.107,25.173V379.2
                    c29.333-6.72,56.107-20.16,78.613-38.613L356.8,384l27.2-27.2l-192-192L27.2,0z"/>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <!-- <button @click="toggleAudio()" class="playerControls-volume-volumeButton"> {{sound ? '+' : '-'}} </button> -->
        <input @change="volumeChange($event)" type="range" class="playerControls-volume-volumeRange" min="0" max="1" step="0.05" :value="volume">
      </div>

      <!-- Fullscreen button -->
      <!-- <button @click="openFullscreen()" class="playerControls-fullScreen">FullScreen</button> -->
      <div @click="openFullscreen()" class="playerControls-fullScreen">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 298.667 298.667" style="enable-background:new 0 0 298.667 298.667;" xml:space="preserve">
          <g>
            <g>
              <g>
                <polygon points="42.667,192 0,192 0,298.667 106.667,298.667 106.667,256 42.667,256 			"/>
                <polygon points="0,106.667 42.667,106.667 42.667,42.667 106.667,42.667 106.667,0 0,0 			"/>
                <polygon points="192,0 192,42.667 256,42.667 256,106.667 298.667,106.667 298.667,0 			"/>
                <polygon points="256,256 192,256 192,298.667 298.667,298.667 298.667,192 256,192 			"/>
              </g>
            </g>
          </g>
        </svg>
      </div>

    </div>
    <!-- /// Video controllers -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      volume: 0.0,
      hasSound: false,
      sound: false,
      playing: false,
      playButton: true,
    }
  },
  computed: {
    oldVolume() {
      return this.$store.getters.getOldVolume;
    }
  },
  methods: {
    getVideoUrl() {
      return this.videoUrl;
    },
    getVideoAudio() {
      return this.videoUrl.substring(0,32) + 'DASH_audio.mp4';
    },
    changeVideoTime($event) {
      const video = this.$refs.videoRef;
      const audio = this.$refs.audioAutoPlay;
      const scrubTime = ($event.offsetX / this.$refs.playerControlsProgress.offsetWidth) * video.duration;
      video.currentTime = scrubTime;
      audio.currentTime = scrubTime;
    },
    openFullscreen() {
      const elem = this.$refs.videoRef;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    },
    toggleVideo() {
      if(this.playButton) {
        this.$refs.videoRef.pause();
        this.$refs.audioAutoPlay.pause();
        this.playButton = false;
        this.playing = false;
      } else {
        this.$refs.videoRef.play();
        this.$refs.audioAutoPlay.play();
        this.playButton = true;
        this.playing = true;
      }
    },
    volumeChange($event) {
      this.volume = $event.target.value;
      this.$store.commit('setOldVolume', this.volume);
      this.$refs.audioAutoPlay.volume = this.volume;
      if(!this.sound && this.playing && this.volume > 0) {
        this.$refs.audioAutoPlay.play();
        this.$refs.audioAutoPlay.muted = false;
        this.sound = true;
      } else if(this.volume == 0) {
        this.$refs.audioAutoPlay.pause();
        this.$refs.audioAutoPlay.muted = true;
        this.sound = false;
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

        if (isHalfShown && isNotScrolledPast && playVideo.readyState === 4 && audio.readyState === 4) {
          if(playVideo.paused && !this.playing && this.playButton) {
            playVideo.play();
            this.playing = true;
          }
        } else if(isHalfShown && isNotScrolledPast && playVideo.readyState === 4 && isNaN(audio.duration)) {
          if(playVideo.paused && !this.playing && this.playButton) {
            playVideo.play();
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
    toggleAudio() {
      if(!this.sound && this.volume == 0 && this.oldVolume == 0) {
        this.volume = 0.5;
        this.$refs.audioAutoPlay.volume = this.volume;
      } else if(!this.sound && this.volume == 0 && this.oldVolume != 0) {
        this.volume = this.oldVolume;
        this.$refs.audioAutoPlay.volume = this.volume;
      } else if(!this.sound && this.volume != 0) {
        this.$refs.audioAutoPlay.volume = this.volume;
      } else {
        this.$store.commit('setOldVolume', this.volume);
        this.volume = 0.0;
      }

      if(!this.$refs.videoRef.paused && this.volume != 0) {
        this.$refs.audioAutoPlay.play();
        this.$refs.audioAutoPlay.muted = false;
        this.sound = true;
      } else {
        this.$refs.audioAutoPlay.pause();
        this.$refs.audioAutoPlay.muted = true;
        this.sound = false;
      }
    },
    handleProgress() {
      if (this.$refs.audioAutoPlay.duration > 0) {
        this.hasSound = true;
        this.$refs.audioAutoPlay.currentTime = this.$refs.videoRef.currentTime;
      }
      const percent = (this.$refs.videoRef.currentTime / this.$refs.videoRef.duration) * 100;
      this.$refs.progressFilled.style.flexBasis = `${ percent }%`;
    },
  },
  mounted() {
    setTimeout(() => {
      window.addEventListener('scroll', this.playVideo);
      this.$refs.videoRef.addEventListener('timeupdate', this.handleProgress);
    }, 50);
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

  &:hover .playerControls{
    opacity: 1;
    transition: all .3s;
  }
}

.playerControls {
  position: absolute;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  padding: 10px;
  opacity: 0;
  width: 100%;
  transition: all .3s;

  &-button {
    outline: none;
    border: none;
    width: 32.5px;
    height: 24px;
    
    &:hover {
      svg {
        fill: rgba(255, 255, 255, 0.5);
      }
    }
  }

  &-progress {
    flex: 10;
    position: relative;
    display: flex;
    flex-basis: 100%;
    height: 10px;
    transition: height 0.3s;
    background: rgba(7, 104, 214, 0.5);
    align-self: center;
    margin: 0 10px;
    cursor: cursor;

    &-progressFilled {
      background: #ffc600;
    }
  }

  &-volume {
    position: relative;
    width: 50px;

    &-volumeRange {
      border: none;
      outline: none;
      opacity: 0;
      padding: 10px 0;
      position: absolute;
      right: 50%;
      width: 50px;
      height: 30px;
      transform: rotateZ(-90deg) translateX(170%) translateY(50%);

      &:hover {
        opacity: 1;
      }
    }

    &-volumeButton {
      width: 24px;
      height: 24px;

      &:hover + .playerControls-volume-volumeRange {
        opacity: 1;
      }
      &:hover {
        svg {
          fill: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }

  &-fullScreen {
    width: 29.3px;
    height:22px;

    &:hover {
      svg {
        fill: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>