<template>
  <div class="sidebar-box">
    <SubTitle :title="'最近评论'" icon="quote" />
    <ul>
      <template v-if="comments.length > 0">
        <li
          class="
            bg-ob-deep-900
            px-2
            py-3
            mb-1.5
            rounded-lg
            flex flex-row
            justify-items-center
            items-center
            shadow-sm
            hover:shadow-ob
            transition-shadow
          "
          v-for="comment in comments"
          :key="comment.id"
        >
          <img
            class="col-span-1 mr-2 rounded-full p-1"
            :src="comment.user.avatar_url"
            alt="comment-avatar"
            height="40"
            width="40"
          />
          <div class="flex-1 text-xs">
            <div class="text-xs">
              <span class="text-ob pr-2">
                {{ comment.user.login }}
                <b
                  class="
                    text-ob-secondary
                    bg-ob-deep-800
                    py-0.5
                    px-1.5
                    rounded-md
                    opacity-75
                  "
                  v-if="comment.is_admin"
                >
                </b>
              </span>
              <p class="text-gray-500">
                {{ getDateFormat(comment.created_at) }}
              </p>
            </div>
            <div class="text-xs text-ob-bright">
              {{ comment.body }}
            </div>
          </div>
        </li>
      </template>
      <template v-else>
        <li
          class="
            bg-ob-deep-900
            px-2
            py-3
            mb-1.5
            rounded-lg
            flex flex-row
            justify-items-center
            items-center
            shadow-sm
            hover:shadow-ob
            transition-shadow
          "
          v-for="n in 7"
          :key="n"
        >
          <div class="flex-1 text-xs">
            <div class="text-xs">
              <span class="text-ob pr-2">
                <ob-skeleton
                  tag="b"
                  class="
                    text-ob-secondary
                    bg-ob-deep-800
                    py-0.5
                    px-1.5
                    rounded-md
                  "
                  height="10px"
                  width="66px"
                />
              </span>
              <br />
            </div>
            <div class="text-xs text-ob-bright"></div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script >
import { SubTitle } from "@/components/Title";
import { dateFormat } from "@/utils/date";
export default {
  name: "RecentComment",
  components: { SubTitle },
  props: {
    comments: {
      type: Array,
      default: [],
    },
  },
  methods: {
    getDateFormat(date) {
      return dateFormat(date);
    },
  },
};
</script>

<style lang="scss" scoped></style>
