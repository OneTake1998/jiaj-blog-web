<template>
  <div class="flex flex-col">
    <div class="post-header">
      <Breadcrumbs :current="'归档'" />
      <h1 class="post-title text-white uppercase">归档</h1>
    </div>
    <div
      class="
        bg-ob-deep-800
        px-14
        py-16
        rounded-2xl
        shadow-xl
        block
        min-h-screen
      "
    >
      <ul class="timeline timeline-centered">
        <!-- 去索引 -->
        <template v-for="(nPosts, nIndex) in archives" v-key="nIndex">
          <!-- 遍历年 -->
          <template v-for="(yPosts, yIndex) in nPosts" v-key="yIndex">
            <!-- 遍历月 -->
            <template
              v-for="(mPosts, mIndex) in yPosts"
              v-key="`${yIndex} + ${mIndex}`"
            >
              <li class="timeline-item period">
                <div class="timeline-info"></div>
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h2 class="timeline-title">{{ mIndex }}月 {{ yIndex }}年</h2>
                </div>
              </li>
              <li class="timeline-item" v-for="post in mPosts" :key="post.id">
                <div class="timeline-info">
                  <span>
                    {{ getDateFormat(post.createDate) }}
                  </span>
                </div>
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <nuxt-link v-if="post.id" :to="`/article/${post.id}`">
                    <h3 class="timeline-title">{{ post.title }}</h3>
                  </nuxt-link>
                  <p class="article-content">
                    {{ post.content }}
                  </p>
                </div>
              </li>
            </template>
          </template>
        </template>
      </ul>

      <Paginator
        :pageSize="pagination.pageSize"
        :pageTotal="pagination.pageTotal"
        :page="pagination.page"
        @pageChange="pageChangeHanlder"
      />
    </div>
  </div>
</template>

<script >
import { dateFormat } from "@/utils/date.js";
import Breadcrumbs from "@/components/Breadcrumbs";
import Paginator from "@/components/Paginator";
export default {
  name: "Articles",
  components: { Breadcrumbs, Paginator },
  async asyncData({ app }) {
    // 查询分类和标签
    let query = { categoryId: null, current: 1, size: 10 };
    const { data } = await app.$getArticles(query);
    //分页
    let pagination = {
      pageSize: data.size,
      pageTotal: data.total,
      page: data.current,
    };
    return { query, pagination, archives: data.records };
  },
  methods: {
    async pageChangeHanlder(current) {
      this.query.current = current;
      const { data } = await this.$getArticles(this.query);
      this.pagination.pageSize = data.size;
      this.pagination.pageTotal = data.total;
      this.pagination.page = data.current;
      this.archives = data.records;
    },
    getDateFormat(date) {
      return dateFormat(date);
    },
  },
};
</script>
<style lang="scss" scoped>
.article-content {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  // text-align: justify;
}
.timeline {
  position: relative;
  z-index: 2;
  line-height: 1.4em;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
  }
}

/*----- TIMELINE ITEM -----*/

.timeline-item {
  padding-left: 40px;
  position: relative;
  &:last-child {
    padding-bottom: 0;
  }
}

/*----- TIMELINE INFO -----*/

.timeline-info {
  color: var(--text-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  margin: 0 0 0.5em 0;
  text-transform: uppercase;
  white-space: nowrap;
}
/*----- TIMELINE MARKER -----*/

.timeline-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 15px;
  &:before {
    background: var(--text-accent);
    border: 3px solid transparent;
    border-radius: 100%;
    content: "";
    display: block;
    height: 15px;
    position: absolute;
    top: 4px;
    left: 0;
    width: 15px;
    transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
  }
  &:after {
    content: "";
    width: 3px;
    background: var(--text-normal);
    display: block;
    position: absolute;
    top: 24px;
    bottom: 0;
    left: 6px;
  }
  .timeline-item:last-child &:after {
    content: none;
  }
}
.timeline-item:not(.period):hover .timeline-marker:before {
  background: transparent;
  border: 3px solid var(--text-accent);
}

/*----- TIMELINE CONTENT -----*/

.timeline-content {
  padding-bottom: 40px;
  p:last-child {
    margin-bottom: 0;
  }
}

.timeline-title {
  @apply pb-2 mb-4 text-ob-bright relative text-2xl;
  font-weight: 600;
  &:after {
    @apply absolute bottom-0 h-1 w-24 rounded-full;
    content: "";
    background: var(--main-gradient);
    left: 0;
  }
}

/*----- TIMELINE PERIOD -----*/

.period {
  padding: 0;
  .timeline-info {
    display: none;
  }
  .timeline-marker {
    &:before {
      background: transparent;
      content: "";
      width: 15px;
      height: auto;
      border: none;
      border-radius: 0;
      top: 0;
      bottom: 30px;
      position: absolute;
      border-top: 3px solid var(--text-normal);
      border-bottom: 3px solid var(--text-normal);
    }
    &:after {
      content: "";
      height: 32px;
      top: auto;
    }
  }
  .timeline-content {
    padding: 40px 0 70px;
  }
  .timeline-title {
    margin: 0;
    &:after {
      content: none;
    }
  }
}

/*----------------------------------------------
    MOD: TIMELINE SPLIT
----------------------------------------------*/

.timeline-split {
  @media (min-width: 768px) {
    .timeline {
      display: table;
    }
    .timeline-item {
      display: table-row;
      padding: 0;
    }
    .timeline-info,
    .timeline-marker,
    .timeline-content,
    .period .timeline-info {
      display: table-cell;
      vertical-align: top;
    }
    .timeline-marker {
      position: relative;
    }
    .timeline-content {
      padding-left: 30px;
    }
    .timeline-info {
      padding-right: 30px;
    }
    .period .timeline-title {
      position: relative;
      left: -45px;
    }
  }
}

/*----------------------------------------------
  MOD: TIMELINE CENTERED
----------------------------------------------*/

.timeline-centered {
  @extend .timeline-split;
  @media (min-width: 992px) {
    &,
    .timeline-item,
    .timeline-info,
    .timeline-marker,
    .timeline-content {
      display: block;
      margin: 0;
      padding: 0;
    }
    .timeline-item {
      padding-bottom: 40px;
      overflow: hidden;
    }
    .timeline-marker {
      position: absolute;
      left: 50%;
      margin-left: -7.5px;
    }
    .timeline-info,
    .timeline-content {
      width: 50%;
    }
    > .timeline-item:nth-child(odd) .timeline-info {
      float: left;
      text-align: right;
      padding-right: 30px;
    }
    > .timeline-item:nth-child(odd) .timeline-content {
      float: right;
      text-align: left;
      padding-left: 30px;
      .timeline-title {
        &:after {
          left: 0;
          right: initial;
        }
      }
    }
    > .timeline-item:nth-child(even) .timeline-info {
      float: right;
      text-align: left;
      padding-left: 30px;
    }
    > .timeline-item:nth-child(even) .timeline-content {
      float: left;
      text-align: right;
      padding-right: 30px;
      .timeline-title {
        &:after {
          right: 0;
          left: initial;
        }
      }
    }
    > .timeline-item.period .timeline-content {
      float: none;
      padding: 0;
      width: 100%;
      text-align: center;
    }
    .timeline-item.period {
      padding: 50px 0 90px;
    }
    .period .timeline-marker:after {
      height: 30px;
      bottom: 0;
      top: auto;
    }
    .period .timeline-title {
      left: auto;
    }
  }
}
</style>
