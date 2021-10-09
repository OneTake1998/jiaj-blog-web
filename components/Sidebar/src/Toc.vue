<template>
  <Sticky :stickyTop="32" endingElId="footer" dynamicElClass="#sticky-sidebar">
    <div id="sticky-sidebar">
      <transition name="fade-slide-y" mode="out-in">
        <div v-if="isShow" class="sidebar-box mb-4">
          <SubTitle :title="title" icon="toc" />
          <div
            v-html="directories.innerHTML"
            v-scroll-spy-active="{ selector: '.toc-item' }"
            v-scroll-spy-link
            :style="sideBoxStyle"
          />
        </div>
      </transition>
      <Navigator />
    </div>
  </Sticky>
</template>

<script >
import { SubTitle } from "@/components/Title";
import Sticky from "@/components/Sticky.vue";
import Navigator from "./Navigator.vue";

export default {
  name: "ObTOC",
  components: { SubTitle, Sticky, Navigator },
  props: {
    toc: {
      type: String,
      default: null,
    },
    parentClass: {
      // 文章标题的父元素类名
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "文章目录",
    },
  },
  data() {
    return {
      directories: Object, // 所有h1 h2标题
      isShow: false,
      testDoc: `<ol class="toc"><li class="toc-item toc-level-1 active"><a class="toc-link" href="#Custom-Container-Example"><span class="">Custom Container Example.</span></a><ol class="toc-child"><li class="toc-item toc-level-2"><a class="toc-link" href="#Block-quote"><span class="toc-text">Block quote</span></a></li><li class="toc-item toc-level-2"><a class="toc-link" href="#Custom-Containers"><span class="toc-text">Custom Containers</span></a><ol class="toc-child"><li class="toc-item toc-level-3"><a class="toc-link" href="#Tip-Container"><span class="toc-text">Tip Container</span></a></li><li class="toc-item toc-level-3"><a class="toc-link" href="#Warning-Container"><span class="toc-text">Warning Container</span></a></li><li class="toc-item toc-level-3"><a class="toc-link" href="#Danger-Container"><span class="toc-text">Danger Container</span></a></li><li class="toc-item toc-level-3"><a class="toc-link" href="#Detail-container"><span class="toc-text">Detail container</span></a></li></ol></li></ol></li></ol>`,
    };
  },
  mounted() {
    this.getDirectories();
  },
  methods: {
    getDirectories() {
      const domDiv = document.createElement("div");
      const templateDir = document.createElement("ol");
      domDiv.appendChild(templateDir);
      templateDir.setAttribute("class", "toc");
      const titleDomAll = document.querySelectorAll(
        `.${this.parentClass} h1, .${this.parentClass} h2, .${this.parentClass} h3`
      );
      titleDomAll.length == 0 ? (this.isShow = false) : (this.isShow = true);
      //上一个标签
      let preFlag = null;
      //当前标签
      let curFlag = null;
      //上一个dom
      let preDom = null;
      for (let i = 0, len = titleDomAll.length; i < len; i++) {
        let el = titleDomAll[i]; // 每个元素对象

        //当前li标签模板
        const templateLi = document.createElement("li");
        const levelNum = el.tagName.charAt(1);
        templateLi.setAttribute("class", `toc-item toc-level-${levelNum}`);
        let adom = el.firstChild;
        adom.setAttribute("class", "toc-link");
        adom.innerText = el.innerText;
        templateLi.append(adom);
        //当前标签
        curFlag = el.tagName;
        //如果当前是h1标签
        if (curFlag === "H1") {
          templateDir.appendChild(templateLi);
          preDom = templateLi;
          preFlag = el.tagName;
        } else if (curFlag === "H2" && preFlag === "H1") {
          if (preFlag != curFlag) {
            var childrenH2 = document.createElement("ol");
            childrenH2.setAttribute("class", "toc-child");
            childrenH2.appendChild(templateLi);
            preDom.appendChild(childrenH2);
            preDom = templateLi;
            preFlag = el.tagName;
          } else {
            childrenH2.appendChild(templateLi);
            preDom = templateLi;
            preFlag = el.tagName;
          }
        } else if (curFlag === "H3" && preFlag === "H2") {
          if (preFlag != curFlag) {
            var childrenH3 = document.createElement("ol");
            childrenH3.setAttribute("class", "toc-child");
            childrenH3.appendChild(templateLi);
            preDom.appendChild(childrenH3);
            preDom = templateLi;
            preFlag = el.tagName;
          } else if (preFlag == curFlag) {
            childrenH3.appendChild(templateLi);
            preDom = templateLi;
            preFlag = el.tagName;
          }
        }
      }
      this.directories = domDiv;
    },
  },
  computed: {
    showToc() {
      return this.toc !== undefined && this.toc !== "" ? true : false;
    },
    sideBoxStyle() {
      return {
        maxHeight: `${window.innerHeight - 64 - 64 - 52 - 74}px`,
        overflowY: "scroll",
        overflowX: "hidden",
      };
    },
  },
};
</script>
<style lang="scss">
.toc {
  list-style: none;
  counter-reset: li;
  padding-left: 1.5rem;

  > li {
    @apply text-ob-bright font-extrabold pb-1;
    &.active {
      @apply text-ob;
    }
  }

  ol li {
    @apply text-ob-normal font-normal;
    padding-left: 1.5rem;
    &.active {
      @apply text-ob;
    }
  }

  ol,
  ol ol {
    position: relative;
  }

  > li::before,
  ol > li::before,
  ol ol > li::before,
  ol ol ol > li::before,
  ol ol ol ol > li::before {
    content: "•";
    color: var(--text-accent);
    display: inline-block;
    width: 1em;
    margin-left: -1.15em;
    padding: 0;
    font-weight: bold;
    text-shadow: 0 0 0.5em var(--accent-2);
  }

  > li::before {
    @apply text-xl;
  }

  > li > ol::before,
  > li > ol > li > ol::before {
    content: "";
    border-left: 1px solid var(--text-accent);
    position: absolute;
    opacity: 0.35;
    left: -1em;
    top: 0;
    bottom: 0;
  }

  > li > ol::before {
    left: -1.25em;
    border-left: 2px solid var(--text-accent);
  }
}
</style>
