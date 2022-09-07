<script setup lang="ts">
interface LumiDataType {
  video: string
  poster: string
}
const lumiData = ref({
  video: '',
  poster: '',
})

const route = useRoute()
lumiData.value = route.query as unknown as LumiDataType
watch(
  () => route.query as unknown as LumiDataType,
  (val) => {
    lumiData.value = val
  },
)
</script>

<template>
  <video
    :src="`${lumiData.video}.mp4`"
    :poster="lumiData.poster"
    w-full h-full object-fill
    autoplay loop
  />
</template>

<style>
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
