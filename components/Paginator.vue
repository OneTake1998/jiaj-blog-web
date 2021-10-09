<template>
  <div class="paginator">
    <ul>
      <li
        class="text-ob-bright"
        v-if="currentPage > 1"
        @click="pageChangeEmitter(currentPage - 1)"
      >
        <svg-icon icon-class="arrow-left" />
        以往
      </li>
      <li
        v-if="paginator.head !== 0"
        :class="{ active: currentPage === paginator.head }"
        @click="pageChangeEmitter(paginator.head)"
      >
        {{ paginator.head }}
      </li>
      <li
        v-for="(page, key) in paginator.pages"
        :key="key"
        :class="{ active: currentPage === page }"
        @click="pageChangeEmitter(page)"
      >
        {{ page }}
      </li>
      <li
        v-if="paginator.end !== 0"
        :class="{ active: currentPage === paginator.end }"
        @click="pageChangeEmitter(paginator.end)"
      >
        {{ paginator.end }}
      </li>
      <li
        class="text-ob-bright"
        v-if="currentPage < pages"
        @click="pageChangeEmitter(currentPage + 1)"
      >
        新的
        <svg-icon icon-class="arrow-right" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Paginator',
  props: {
    pageTotal: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.pageTotal / this.pageSize)
    },
    paginator() {
      if (this.pages <= 3) {
        const pageNumbers = []
        for (let i = 0; i < this.pages; i++) {
          pageNumbers.push(i + 1)
        }
        return {
          head: 0,
          pages: pageNumbers,
          end: 0,
        }
      } else if (this.page >= 1 && this.page < 3) {
        return {
          head: 1,
          pages: [2, 3, '...'],
          end: this.pages,
        }
      } else if (this.page >= 3 && this.page <= this.pages - 2) {
        return {
          head: 1,
          pages: ['...', this.page - 1, this.page, this.page + 1, '...'],
          end: this.pages,
        }
      } else {
        return {
          head: 1,
          pages: ['...', this.pages - 2, this.pages - 1],
          end: this.pages,
        }
      }
    },
    currentPage() {
      return this.page
    },
  },
  methods: {
    pageChangeEmitter(page) {
      if (page === '...') return
      this.$emit('pageChange', page)
    },
  },
}
</script>

<style lang="scss" scoped>
.paginator {
  @apply flex flex-row justify-center my-8;
  ul {
    @apply flex flex-row;
    li {
      @apply flex flex-row items-center uppercase font-extrabold cursor-pointer mr-2;
      &:hover {
        opacity: 0.5;
      }
      svg {
        @apply mx-2 font-extrabold text-ob;
      }
    }
  }
  .active {
    @apply text-ob;
  }
}
</style>
