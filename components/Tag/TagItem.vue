<template>
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
    <nuxt-link
      class="
        bg-ob-deep-900
        text-center
        px-3
        py-1
        rounded-tl-md rounded-bl-md
        text-sm
      "
      :to="{ path: `/tags/${slug}`, query: { name: name } }"
      :style="stylingTag"
    >
      <em class="opacity-50">#</em>
      {{ name }}
    </nuxt-link>
    <span
      class="
        bg-ob-deep-900
        text-ob-secondary text-center
        px-2
        py-1
        rounded-tr-md rounded-br-md
        text-sm
        opacity-70
      "
      :style="stylingTag"
    >
      {{ count }}
    </span>
  </div>
</template>

<script >
export default {
  name: 'TagItem',
  props: {
    name: String,
    slug: String,
    count: {
      type: String,
      default: "0",
    },
    size: {
      type: String,
      default: 'base',
    },
  },
  computed: {
    stylingTag() {
      if (this.size === 'xs') {
        return {
          fontSize: '0.75rem',
          lineHeight: '1rem',
        }
      }

      if (this.size === 'sm') {
        return {
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
        }
      }

      if (this.size === 'lg') {
        return {
          fontSize: '1.125rem',
          lineHeight: '1.75rem',
        }
      }

      if (this.size === 'xl') {
        return {
          fontSize: '1.25rem',
          lineHeight: '1.75rem',
        }
      }

      if (this.size === '2xl') {
        return {
          fontSize: '1.5rem',
          lineHeight: '2rem',
        }
      }

      return {
        fontSize: '1rem',
        lineHeight: '1.5rem',
      }
    },
  },
}
</script>
