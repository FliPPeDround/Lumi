<script setup lang="ts">
const route = useRoute()
const { video, poster } = route.query as {
  video: string
  poster: string
}
</script>

<template>
  <video
    :src="`${video}.mp4`"
    :poster="poster"
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
