<script setup lang="ts">
interface Props {
  title: string
  icon: string
  path: string
}

const { title, icon, path } = defineProps<Props>()
const route = useRoute()
const router = useRouter()
</script>

<template>
  <button
    py="2.5" my3 pl5
    flex
    leading-normal align-text-top
    rounded-lg
    from="#38b9bb" to="#36daae"
    hover="c-white"
    :class="{ 'bg-gradient-to-r c-white': route.path === path }"
    @click="() => router.push(path)"
  >
    <div :class="`${icon}`" align-middle />
    <span pl2 align-text-top>{{ title }}</span>
  </button>
</template>
