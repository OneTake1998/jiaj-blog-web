// nuxt 声明状态，必须是function

export const state = () => ({
  openModal: false
});


export const mutations = {
  // 更新主题
  SET_OPNEMODAL(state, openModal) {
    state.openModal = openModal;
  }
};
