<script setup lang="ts">
import { useIpcRendererInvoke } from '@vueuse/electron'
import { useRoute } from 'vue-router'

const route = useRoute()

const openDesktopWindow = () => {
  const result = useIpcRendererInvoke<string>('openDesktopWindow', 'desktop')
}
</script>

<template>
  <div
    flex="~ col"
    h-100vh
    w-100vw
    text-base
  >
    <div
      flex
      w-full h-91vh
    >
      <Menu
        w-full
        bg="#d9dfe7"
      />
      <main w-full bg="#eef0f5">
        <router-view />
      </main>
    </div>
    <Footer
      h-9vh
      w-full
      bg="#f6f7fa"
      border="t-0.5 gray-50"
    />
  </div>
</template>
