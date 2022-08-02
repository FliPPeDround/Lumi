<script setup lang="ts">
interface Props {
  title: string
  icon: string
}

const { title, icon } = defineProps<Props>()
</script>

<template>
  <div
    bg-gradient-to-r
    from="#38b9bb" to="#36daae"
    py="2.5" my3 pl5
    flex
    c-white leading-normal align-text-top
    rounded-lg
  >
    <div :class="`${icon}`" align-middle/>
    <span pl2 align-text-top>{{ title }}</span>
  </div>
</template>
