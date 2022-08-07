<script setup lang="ts">
const menuList = [
  {
    title: 'Yoyo鹿鸣',
    icon: 'i-carbon-favorite-filled',
    path: '/YoyoLumi',
  },
  {
    title: '鹿鸣练习室',
    icon: 'i-carbon-boot',
    path: '/LumiVideo',
  },
]
</script>

<template>
  <div
    flex="~ col"
    justify-between
    pt10 px6 pb5
  >
    <div>
      <div mt10 mb18 text-3xl>
        YoyoLumi
      </div>
      <div flex="~ col" justify-self-start>
        <MenuButton
          v-for="item in menuList"
          :key="item.title"
          :title="item.title"
          :icon="item.icon"
          :path="item.path"
        />
      </div>
    </div>
  </div>
</template>
