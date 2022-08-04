<script setup lang="ts">
import LumiVideo from '/Lumi.mp4'
import LumiPoster from '/Lumi.jpeg'
const width = window.screen.width
const height = window.screen.height
</script>

<template>
  <video :src="LumiVideo" :poster="LumiPoster" autoplay loop :width="width" :height="height" />
</template>

<style>
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
