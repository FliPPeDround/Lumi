<script setup lang="ts">
import { useIpcRendererInvoke } from '@vueuse/electron'

const route = useRoute()

const openDesktopWindow = () => {
  const result = useIpcRendererInvoke<string>('openDesktopWindow', 'desktop')
}
</script>

<template>
  <button btn @click="openDesktopWindow">
    openDesktopWindow
  </button>
</template>
