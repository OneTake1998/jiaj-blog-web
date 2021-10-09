<template>
  <div class="flex flex-col">
    <div class="post-header">
      <Breadcrumbs :current="'标签'" />
      <h1 class="post-title text-white uppercase">标签</h1>
    </div>
    <div class="bg-ob-deep-800 px-14 py-16 rounded-2xl shadow-xl block">
      <TagList>
        <TagItem
          v-for="tag in labelArr"
          :key="tag.id"
          :name="tag.name"
          :slug="tag.id"
          :count="tag.label_total"
          size="xl"
        />
      </TagList>
    </div>

  </div>
</template>

<script >
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { TagList, TagItem } from "@/components/Tag/index.js";
export default {
  name: "JjTag",
  components: { Breadcrumbs, TagList, TagItem },
  async asyncData({ app }) {
    // 查询分类和标签
    const { data } = await app.$getCategoryAndLabel();
    let labelArr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].labelList[0].name != null) {
        labelArr = labelArr.concat(data[i].labelList);
      }
    }
    return { labelArr };
  },
};
</script>

<style lang="scss" scoped></style>
