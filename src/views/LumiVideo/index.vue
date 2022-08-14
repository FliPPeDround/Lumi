<script setup lang="ts">
import { useIpcRendererInvoke } from '@vueuse/electron'
import { lumiVideoData } from './stores/lumiVideo.data'
import { downloadLumiVideo } from '@/utils/downloadLumi'
import type { LumiVideoDataType } from '@/types/lumiDataType'

const downLoad = async (item: LumiVideoDataType) => {
  await downloadLumiVideo(
    item.video,
    item.fileName,
  )
}

const openDesktopWindow = (item: LumiVideoDataType) => {
  const result = useIpcRendererInvoke<string>('openDesktopWindow', `${item.fileName}/poster/asd`)
}
</script>

<template>
  <div v-for="item in lumiVideoData" :key="item.id">
    <img :src="item.img" :alt="`${item.description} img`">
    <button btn @click="downLoad(item)">
      下载
    </button>
    <button btn @click="openDesktopWindow(item)">
      设置
    </button>
  </div>
</template>
