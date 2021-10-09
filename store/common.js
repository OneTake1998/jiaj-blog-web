export const state = () => ({
  /** If current window width is for mobile */
  isMobile: false,
  /** Header image url */
  headerImage: ""
});
export const mutations = {
  RESET_HEADERIMAGE_STATE(state) {
    // 状态置空
    state.uheaderImage = null;
  },

  CHANGE_MOBILE_STATE(state, isMobile) {
    state.isMobile = isMobile;
  },
  SET_HEADER_IMAGE(state, imageUrl) {
    state.headerImage = imageUrl;
  }
};
// // 定义行为
// export const actions = {
//   /** Setting the image url for the header */
//   setHeaderImage(imageUrl) {
//     this.headerImage = imageUrl;
//   },
//   /** Resetting the header image to null */
//   resetHeaderImage() {
//     this.headerImage = "";
//   },
//   changeMobileState(isMobile) {
//     this.isMobile = isMobile;
//   }
// };
