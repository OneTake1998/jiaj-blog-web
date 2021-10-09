export class ThemeConfig {
  /** Menu config data */
  menu = new ThemeMenu();
  /** Avatar config data */
  avatar = new Avatar();
  // /** Theme config data */
  theme = new Theme();
  // /** Site config data */
  site = new Site();
  // /** Socials config data */
  // socialsl = new Social();
  // // /** Meta data for the site */
  // site_meta = new SiteMeta();
  // // /** Plugin configs */
  // plugins = new Plugins();
  // /** Theme version */
  version = "1.0";
}

export class ThemeMenu {
  menus = [
    {
      name: "Home",
      path: "/",
      i18n: {
        cn: "首页",
        en: "Home"
      }
    },
    {
      name: "Tags",
      path: "/tags",
      i18n: {
        cn: "标签",
        en: "Tags"
      }
    },
    {
      name: "articles",
      path: "/articles",
      i18n: {
        cn: "归档",
        en: "articles"
      }
    }, {
      name: "message-board",
      path: "/message-board",
      i18n: {
        cn: "留言板",
        en: "message-board"
      }
    },
    {
      name: "about",
      path: "/about",
      i18n: {
        cn: "关于",
        en: "About"
      }
    },
  ];
}

export class Avatar {
  image_url = "";
}

export class Theme {
  dark_mode = "auto";
  profile_shape = "diamond";
  feature = true;
  gradient = {
    color_1: "#24c6dc",
    color_2: "#5433ff",
    color_3: "#ff0099"
  };
  header_gradient_css =
    "linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)";
  background_gradient_style = {
    background:
      "linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    "-webkit-box-decoration-break": "clone",
    "box-decoration-break": "clone"
  };
}

export class Site {
  /** Website subtitle (used after `-`) */
  subtitle = "";
  /** Author of the blog website */
  author = "";
  /** Author's nick name */
  nickname = "";
  /** Website description (used in the header meta tag) */
  description = "";
  /** Blog's default language */
  language = "en";
  /** Allow use to change blog's locale */
  multi_language = true;
  /** Site logo or brand logo */
  logo = "";
  /** Author avatar */
  avatar = "";
  /** China server beian info */
  beian = {
    number: "",
    link: ""
  };
  /** China server police beian info */
  police_beian = {
    number: "",
    link: ""
  };
}

// export class Social {
//   github = "";
//   twitter = "";
//   stackoverflow = "";
//   wechat = "";
//   qq = "";
//   weibo = "";
//   csdn = "";
//   juejin = "";
//   zhihu = "";
//   customs: CustomSocials = new CustomSocials();

//   /**
//    * Model class for Social media links
//    *
//    * @param raw - Config data generated from Hexo
//    */
// }

// export class CustomSocial {
//   icon = {
//     iconfont: "",
//     img_link: ""
//   };
//   link = "";

//   constructor(raw?: GeneralOptions) {
//     if (raw) {
//       for (const key of Object.keys(this)) {
//         if (Object.prototype.hasOwnProperty.call(raw, key)) {
//           if (key === "icon") {
//             if (
//               String(raw[key]).match(
//                 /([a-zA-Z0-9\s_\\.\-():])+(.svg|.png|.jpg)$/g
//               )
//             ) {
//               Object.assign(this.icon, { img_link: raw[key] });
//             } else {
//               Object.assign(this.icon, { iconfont: raw[key] });
//             }
//           } else {
//             Object.assign(this, { [key]: raw[key] });
//           }
//         }
//       }
//     }
//   }
// }

// export class CustomSocials {
//   socials: CustomSocial[] = [];

//   /**
//    * Model class for Social media links
//    *
//    * @param raw - Config data generated from Hexo
//    */
//   constructor(raw?: { [key: string]: any }) {
//     if (raw) {
//       Object.assign(
//         this.socials,
//         Object.keys(raw).map((key: string) => new CustomSocial(raw[key]))
//       );
//     }
//   }
// }
