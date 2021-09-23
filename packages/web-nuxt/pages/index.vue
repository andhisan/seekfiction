<template>
  <div class="flex flex-col gap-3 w-screen py-64 text-center items-center justify-center">
    <NuxtLink to="/">
      <NuxtLogo />
    </NuxtLink>
    <p>A next-generation anime/manga database</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NuxtLogo from '@/components/NuxtLogo.vue'

export default Vue.extend({
  components: {
    NuxtLogo
  }
})
</script>
