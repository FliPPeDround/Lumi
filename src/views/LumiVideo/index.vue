<script setup lang="ts">
import { useIpcRendererInvoke } from '@vueuse/electron'
import { downloadLumiVideo } from '@/utils/downloadLumi'

const downTestLumi = async () => {
  const res = await downloadLumiVideo('https://n0va-static.mihoyo.com/desk-portal/2021/06/22/1624340712782_679.ndf', 'test.mp4')
}

const openDesktopWindow = () => {
  const result = useIpcRendererInvoke<string>('openDesktopWindow', 'desktop')
}
</script>

<template>
  <img src="https://n0va-static.mihoyo.com/desk-portal/2021/06/22/1624357991428_244.ndf" alt="">
  <button btn @click="downTestLumi">
    下载
  </button>
  <button btn @click="openDesktopWindow">
    设置
  </button>
</template>
