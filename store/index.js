// nuxt 声明状态，必须是function
import { ThemeConfig } from "@/models/ThemeConfig";
import { Statistic } from "@/models/Statistic";
const state = () => ({
  avatar:"",
  nickname:"",
  //默认夜间模式
  // theme-dark theme-light
  theme: "theme-dark",
  statistic: new Statistic(),
  themeConfig:new ThemeConfig()
});

// 改变状态值
const mutations = {
    // 更新主题
    SET_THEME(state, theme) {
      state.theme = theme;
    },
    SET_AVATAR(state,avatar){
      state.avatar = avatar
    },
    SET_NICKNAME(state,nickname){
      state.nickname = nickname
    }
  };
// 不要忘记
export default {
    state,
    mutations,
    // actions
  };
  