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
    flex items-center
    rounded-lg
    from="#38b9bb" to="#36daae"
    border="1 #d9dfe7 opacity-100"
    hover="c-white border-white"
    :class="{ 'bg-gradient-to-r c-white border-#d9dfe7': route.path === path }"
    @click="() => router.push(path)"
  >
    <div :class="`${icon}`" text-sm />
    <span
      pl2
    >{{ title }}</span>
  </button>
</template>
