<script setup lang="ts">
const menuList = [
  {
    title: 'yoyo鹿鸣',
    icon: 'i-carbon-favorite-filled',
  },
  {
    title: '鹿鸣练习室',
    icon: 'i-carbon-boot',
  },
]
</script>

<template>
  <div
    flex="~ col"
    justify-between
    pt10 px6 pb5
    w-100vw
  >
    <div>
      <div mb20>
        YoyoLumi
      </div>
      <div flex="~ col" justify-self-start>
        <MenuButton
          v-for="item in menuList"
          :key="item.title"
          :title="item.title"
          :icon="item.icon"
        />
      </div>
    </div>
  </div>
</template>
