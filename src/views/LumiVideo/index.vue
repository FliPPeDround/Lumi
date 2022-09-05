<script setup lang="ts">
import { useIpcRendererInvoke } from '@vueuse/electron'
import { lumiVideoData } from './stores/lumiVideo.data'
import type { LumiVideoDataType } from '@/types/lumiDataType'

const downLoad = async (item: LumiVideoDataType) => {
  const result = useIpcRendererInvoke<string>('downloadLumiVideo', {
    url: item.video,
    path: item.fileName,
  })
}

const openDesktopWindow = (item: LumiVideoDataType) => {
  const result = useIpcRendererInvoke<string>('openDesktopWindow', {
    video: item.fileName,
    poster: item.poster,
  })
}
</script>

<template>
  <h1 text="4xl #424f6b" mt-10vh font-black>鹿鸣练习室</h1>
  <div grid="~ cols-3" gap-4 mt-5>
    <div
      v-for="item in lumiVideoData"
      :key="item.id"
      border="white 5"
      rounded-xl
      hover:shadow-xl
      bg-white
    >
      <img rounded-md :src="item.img" :alt="`${item.description} img`">
      <div>
        <div flex item-center my-1>
          <div
            border="#a58dff 2"
            rounded-lg
            scale-70
            mr-1
          >
            <div
              i-carbon-volume-up-filled
              c="#a58dff"
            />
          </div>
          {{ item.title }}
        </div>
        <div>
          <button btn @click="downLoad(item)">
            下载
          </button>
          <button btn @click="openDesktopWindow(item)">
            设置
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
