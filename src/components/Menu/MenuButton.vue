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
    hover="bg-#DCE3EB shadow-sm"
    :class="{ 'bg-gradient-to-r text-white': route.path === path }"
    @click="() => router.push(path)"
  >
    <div
      :class="`${icon}`"
      text-sm
      :text="route.path === path ? 'white' : '#38b9bb'"
    />
    <span pl2>{{ title }}</span>
  </button>
</template>
