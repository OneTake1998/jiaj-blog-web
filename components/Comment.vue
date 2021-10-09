<template>
  <div
    class="
      bg-ob-deep-800
      p-4
      mt-8
      lg:px-14
      lg:py-10
      rounded-2xl
      shadow-xl
      mb-8
      lg:mb-0
    "
  >
    <SubTitle :title="title" />
    <div id="gitalk-container"></div>
  </div>
</template>

<script >
import { SubTitle } from "@/components/Title";
import GitalkModels from "@/models/GitalkModels.js";
import Gitalk from "gitalk";
export default {
  name: "ObComment",
  props: {
    /** Used for create issue title by Gitalk */
    title: {
      type: String,
      default: "",
    },

    /** Unique ID used by Gitalk and Valine */
    uid: {
      type: String,
      default: "",
    },
  },
  mounted() {
    const gitalkAttr = GitalkModels.GithubAttributes;

    gitalkAttr.id = this.uid;
    gitalkAttr.distractionFreeMode = true;
    const gitalk = new Gitalk(gitalkAttr);
    gitalk.render("gitalk-container");
  },
  components: { SubTitle },
};
</script>

<style lang="scss">
#vcomments {
  .vwrap {
    @apply rounded-xl bg-ob-deep-900;
    border: none;
    border-color: transparent;
    .vheader {
      @apply grid gap-2;
      &.item2 {
        @apply grid-cols-2;
      }
      &.item3 {
        @apply grid-cols-3;
      }
      .vinput {
        @apply bg-ob-deep-800 border-none w-full rounded-lg px-3;
      }
    }
  }
  .vcards {
    & > .vcard {
      @apply px-4 pt-6 pb-2 bg-ob-deep-900 mb-6 rounded-lg;
      transition: var(--trans-ease);
      &:hover {
        box-shadow: var(--accent-shadow);
      }
    }
    .vcard {
      .vimg {
        border: 2px solid var(--text-accent);
      }
      .vh {
        border: none;
        .vmeta .vat {
          color: var(--text-accent);
          opacity: 0.6;
          transition: var(--trans-ease);
          &:hover {
            opacity: 0.3;
          }
        }
      }
      .vquote {
        border: none;
      }
      .vhead {
        .vnick {
          color: var(--text-accent);
          font-weight: 700;
        }
      }
    }
  }
  .vbtn {
    background: var(--main-gradient);
    border: none;
    color: #fff;
    &:hover {
      color: #fff;
      opacity: 0.5;
    }
  }
  .vcount .vnum {
    color: var(--text-accent);
  }
  .veditor,
  .vinput {
    color: var(--text-normal);
  }
  .vicon {
    transition: var(--trans-ease);
    &:hover {
      opacity: 0.5;
    }
  }
  a {
    color: var(--text-sub-accent);
    transition: var(--trans-ease);
    &:hover {
      opacity: 0.5;
    }
  }
  blockquote {
    border-left: 0.25rem solid var(--bg-accent-55);
  }
  p {
    color: var(--text-normal);
  }
}

#gitalk-container {
  .gt-container {
    .gt-meta {
      border-bottom: 1px solid var(--background-primary);
    }
    .gt-header-textarea {
      background-color: var(--background-primary);
    }
    .gt-btn {
      border: none;
      background: var(--main-gradient);
      transition: var(--trans-ease);
      &:hover {
        opacity: 0.5;
      }
    }
    .gt-btn-preview {
      background: var(--background-secondary);
      color: var(--text-bright);
      opacity: 0.7;
    }
    .gt-header-controls-tip {
      color: var(--text-bright);
      opacity: 0.7;
      transition: var(--trans-ease);
      &:hover {
        opacity: 0.5;
      }
    }
    .gt-svg svg {
      fill: var(--text-bright);
    }
    .gt-popup {
      background: var(--background-secondary);
      border: 1px solid var(--background-primary);
      border-radius: 0.25rem;
    }
    .gt-copyright {
      border-top: 1px solid var(--background-primary);
    }
    .gt-link {
      border-bottom: 2px solid var(--text-accent);
    }
    a {
      color: var(--text-accent);
      transition: var(--trans-ease);
      &.is--active {
        color: var(--text-bright);
        &:before {
          background: var(--text-accent);
        }
      }
      &:hover {
        opacity: 0.5;
      }
    }
    .gt-comment-admin .gt-comment-content {
      background-color: var(--background-primary);
      box-shadow: var(--accent-shadow);
      &:hover {
        box-shadow: var(--accent-shadow);
      }
      a {
        color: var(--text-accent);
      }
      .gt-comment-body {
        &.markdown-body {
          blockquote {
            border-left: 0.25em solid var(--bg-accent-55);
          }
          pre {
            background-color: var(--background-secondary);
          }
        }
      }
    }
    .gt-comment-content {
      background-color: var(--background-primary);
      border-radius: 5px;
      &:hover {
        box-shadow: var(--sub-accent-shadow);
      }
      a {
        color: var(--text-sub-accent);
      }
    }
    .gt-comment-body {
      color: var(--text-normal) !important;
      &.markdown-body {
        blockquote {
          border-left: 0.25em solid var(--bg-sub-accent-55);
        }
      }
    }
  }
}
</style>
