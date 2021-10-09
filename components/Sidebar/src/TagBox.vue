<template>
  <div class="sidebar-box">
    <SubTitle :title="'标签目录'" icon="tag" />
    <TagList>
      <template v-if="tags && tags.length > 0">
        <TagItem
          v-for="tag in tags"
          :key="tag.id"
          :name="tag.name"
          :slug="tag.id"
          :count="tag.label_total"
          size="xs"
        />
        <div
          class="
            flex flex-row
            items-center
            hover:opacity-50
            mr-2
            mb-2
            cursor-pointer
            transition-all
          "
        >
          <span class="text-center px-3 py-1 rounded-md text-sm">
            <b class="border-b-2 border-ob hover:text-ob">
              <nuxt-link to="/tags"> 查看更多 ... </nuxt-link>
            </b>
          </span>
        </div>
      </template>
    </TagList>
  </div>
</template>

<script >
import { SubTitle } from "@/components/Title";

import { TagList, TagItem } from "@/components/Tag";

export default {
  name: "ObTag",
  components: { SubTitle, TagList, TagItem },
  props: {
    tags: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="scss">
.sidebar-box li.ob-skeleton {
  @apply mr-2 mb-2;
}
</style>
