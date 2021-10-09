<template>
  <div>
    <Breadcrumbs :current="'留言板'" />
    <div class="post-header">
      <h1 class="post-title text-white uppercase">留言板</h1>
    </div>
    <div class="main-grid">
      <div class="relative">
        <div class="post-html article-content"  v-scroll-spy="{ sectionSelector: 'h1, h2, h3, h4, h5, h6' }" v-html="'只是一个留言板罢了。'" />
        <div id="comments">
          <Comment :title="'评论区'" :uid="pathname" />
        </div>
      </div>
      <div class="col-span-1">
        <Sidebar>
          <Profile :author="author" :allTotal="allTotal" />
          <Toc :parentClass="'article-content'"/>
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<script >
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import Navigator from "@/components/Sidebar/src/Navigator.vue";
import { Sidebar, Profile, TagBox ,Toc} from "@/components/Sidebar";
import Comment from "@/components/Comment.vue";
export default {
  name: "JjMessageBoard",

  components: { Breadcrumbs, Sidebar, Profile, TagBox, Comment,Toc,Navigator },
  async asyncData({ app }) {
    //获取作者信息
    const { data: author } = await app.$getAuthor();
    //获取各分类信息
    const { data: allTotal } = await app.$getAllTotal();
    // 查询分类和标签
    const { data } = await app.$getCategoryAndLabel();
    let tags = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].labelList[0].name != null) {
        tags = tags.concat(data[i].labelList);
      }
      if (tags.length >= 10) break;
    }
    return {
      author,
      allTotal,
      tags,
    };
  },
  computed: {
    pathname() {
      return window.location.pathname;
    },
  },
};
</script>

<style lang="scss" scoped></style>
