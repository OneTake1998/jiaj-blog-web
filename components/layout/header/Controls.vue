<template>
  <div
    class="header-controls absolute top-10 right-0 flex flex-row"
    tabindex="0"
  >
    <span
      class="ob-drop-shadow"
      data-dia="search"
      @click="handleOpenModal(true)"
    >
      <svg-icon icon-class="search" />
    </span>
    <span
      class="ob-drop-shadow"
      data-dia="music"
      @click="handleOpenMusic(true)"
    >
      <svg-icon icon-class="music" />
      {{ isPlayer ? "ON" : "OFF" }}
    </span>
    <span class="ob-drop-shadow">
      <audio
        id="musicPlayer"
        class="musicPlayer"
        ref="musicPlayer"
        v-show="false"
        controls
        v-if="musicList.length > 0"
        :src="musicList[currentMusic].url"
        @ended="audioFinished"
      />
    </span>
    <span no-hover-effect class="ob-drop-shadow" data-dia="light-switch">
      <ThemeToggle />
    </span>
  </div>
</template>

<script>
import ThemeToggle from "~/components/ToggleSwitch/ThemeToggle.vue";

export default {
  name: "Controls",
  components: {
    ThemeToggle,
  },
  data() {
    return {
      currentMusic: 0,
      musicList: [],
      isPlayer: false,
    };
  },
  created() {
    this.$getMusic().then((res) => {
      this.musicList = res.data;
    });
  },
  methods: {
    handleOpenModal() {
      this.$store.commit("search/SET_OPNEMODAL", true);
    },
    handleOpenMusic() {
      console.log("handleOpenMusic:", this.$refs.musicPlayer);
      if (this.isPlayer) {
        this.$refs.musicPlayer.pause();
        this.isPlayer = false;
      } else {
        this.isPlayer = true;
        this.$refs.musicPlayer.play();
      }
    },
    audioFinished() {
      if (this.currentMusic < this.musicList.length - 1) {
        this.currentMusic++;
      } else {
        this.currentMusic = 0;
      }
    },
  },
  computed: {
    // isPlayer() {
    //   return this.$refs.musicPlayer.paused;
    // },
  },
};
</script>

<style lang="scss" scoped>
.header-controls {
  .music-player {
    height: 22px;
    width: 250px;
    color: red;
    font-size: 12px;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    transition: opacity 250ms ease;
    margin-right: 0.5rem;
    &[no-hover-effect] {
      &:hover {
        opacity: 1;
      }
    }
    &:hover {
      opacity: 0.5;
    }
    .svg-icon {
      stroke: #fff;
      height: 2rem;
      width: 2rem;
      margin-right: 0.5rem;
      pointer-events: none;
    }
  }
  .search-bar {
    @apply bg-transparent flex flex-row px-0 mr-2 rounded-full;
    opacity: 0;
    width: 0;
    transition: 300ms all ease-out;
    &.active {
      @apply bg-ob-deep-800;
      opacity: 0.95;
      width: 200px;
      imput {
        width: initial;
      }
    }
    &:focus {
      appearance: none;
      outline: none;
    }
    input {
      @apply flex flex-1 bg-transparent text-ob-normal px-6 box-border;
      width: 0;
      appearance: none;
      outline: none;
    }
    svg {
      @apply float-right;
    }
  }
}
</style>
