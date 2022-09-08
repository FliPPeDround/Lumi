<script setup lang="ts">
import { readdirSync } from 'fs'
import { join } from 'path'
import { useIpcRendererInvoke, useIpcRendererOn } from '@vueuse/electron'
import { lumiVideoData } from './stores/lumiVideo.data'
import type { LumiVideoDataType } from '@/types/lumiDataType'

const lumiVideoList = ref([] as string[])
const downLoad = async (item: LumiVideoDataType) => {
  const result = useIpcRendererInvoke<string>('downloadLumiVideo', {
    url: item.video,
    path: join('/packages', item.fileName),
  })
}

const openDesktopWindow = (item: LumiVideoDataType) => {
  const result = useIpcRendererInvoke<string>('openDesktopWindow', {
    video: join('/packages', item.fileName),
    poster: item.poster,
  })
}

const downLoadProgressing = ref(-1)
useIpcRendererOn('updateProgressing', (event, data: number) => {
  downLoadProgressing.value = Number(data.toFixed(2))
  console.log('downLoadProgressing', downLoadProgressing.value)
})
useIpcRendererOn('downloadDone', (event, data: boolean) => {
  if (data)
    getPackageDir()
})

const packagesPath = join(__dirname, '../../../../../../../../../public/packages')
function getPackageDir() {
  lumiVideoList.value = readdirSync(packagesPath).map((item) => {
    return item.replace('.mp4', '')
  })
}

onMounted(() => {
  getPackageDir()
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
      hover="shadow-xl"
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
        <div flex="~ row-reverse" hover:cursor-pointer>
          <div text-sm items-center flex>
            <button
              v-if="!lumiVideoList.includes(item.fileName)"
              @click="downLoad(item)"
            >
              <el-progress
                v-if="downLoadProgressing >= 0 && downLoadProgressing < 100"
                type="circle"
                status="success"
                :width="20"
                :stroke-width="4"
                :percentage="downLoadProgressing"
              >
                <div v-if="downLoadProgressing !== 100" i-carbon-pause ml-5px text-8px />
                <div v-else i-carbon-checkmark ml-5px text-8px />
              </el-progress>
              <div v-else download-btn>
                下载
              </div>
            </button>
            <button v-if="lumiVideoList.includes(item.fileName)" download-btn @click="openDesktopWindow(item)">
              设置桌面
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
