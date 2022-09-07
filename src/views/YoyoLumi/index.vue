<script setup lang="ts">
import { useIpcRendererInvoke } from '@vueuse/electron'
import lumiVideo from '/Lumi.mp4'
import lumiImg from '/Lumi.jpeg'
const openDesktopWindow = () => {
  const result = useIpcRendererInvoke<string>('openDesktopWindow', 'Lumi.mp4')
}
</script>

<template>
  <video
    :src="lumiVideo"
    :poster="lumiImg"
    autoplay loop muted
    rounded-3xl
  />
  <div
    absolute
    top-15vh left-30vw
  >
    <h1 text="white 4xl" mb-8>
      鸢尾
    </h1>
    <div bg-white w-100 h-90 class="set-box" opacity-40 rounded-xl p-3>
      <button btn @click="openDesktopWindow">
        openDesktopWindow
      </button>
    </div>
  </div>
</template>

<style scoped>
.set-box {
  backdrop-filter: blur(6px);
}
</style>
