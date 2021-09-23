<template>
  <footer
    class="border-t-8 border-primary text-white bg-gray-800 flex flex-col justify-center gap-6 flex-grow relative z-10"
    aria-label="footerHeading"
  >
    <ul class="mx-auto flex items-center space-x-4 xl:space-x-5">
      <li v-for="(social, key) in socials" :key="key">
        <a :href="social.href" target="_blank" :aria-label="social.title" :title="social.title" class="block">
          <Component :is="social.icon" class="w-6 h-6 text-gray-300 hover:text-white" />
        </a>
      </li>
    </ul>
    <div class="mx-auto">
      <gh-btns-star title="Star seekfiction" slug="sasigume/seekfiction" show-count />
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const socials = [
      {
        href: 'https://github.com/sasigume/seekfiction',
        icon: 'AtomsIconsIconGitHub',
        title: 'View repository on GitHub'
      },
      {
        href: 'https://twitter.com/seekfiction',
        icon: 'AtomsIconsIconTwitter',
        title: 'Follow us on Twitter'
      }
    ]
    return {
      socials
    }
  }
})
</script>
