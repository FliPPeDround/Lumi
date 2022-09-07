<script setup lang="ts">
import { useIpcRendererInvoke, useIpcRendererOn } from '@vueuse/electron'
import { usePrecision } from '@vueuse/math'
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

const downLoadProgressing = ref(0)
useIpcRendererOn('updateProgressing', (event, data: number) => {
  downLoadProgressing.value = Number(data.toFixed(2))
})
</script>

<template>
  <h1 text="4xl #424f6b" font-black>
    鹿鸣练习室
  </h1>
  <div grid="~ cols-3" gap-4 mt-5>
    <div
      v-for="item in lumiVideoData"
      :key="item.id"
      border="white 5"
      rounded-xl
      hover="shadow-xl cursor-pointer"
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
              scale-90
            />
          </div>
          {{ item.title }}
        </div>
        <div flex="~ row-reverse">
          <div bg="#e7f7f7" px-2 py="0.5" rounded-full>
            <button v-if="true" @click="downLoad(item)">
              下载: {{ downLoadProgressing }}%
            </button>
            <button v-else @click="openDesktopWindow(item)">
              设置桌面
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
