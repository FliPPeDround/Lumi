<script setup lang="ts">
// import LumiVideo from '/Lumi.mp4'
import LumiPoster from '/Lumi.jpeg'
const route = useRoute()
</script>

<template>
  <video
    :src="$route.params.video as string"
    :poster="LumiPoster"
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
