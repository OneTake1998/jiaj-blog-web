
export const state = () => ({
  openMusicModal: false
});


export const mutations = {
  SET_MUSIC_OPNEMODAL(state, openMusicModal) {
    state.openMusicModal = openMusicModal;
  }
};
