<template>
  <div
    flex="~ col"
    h-100vh
    w-100vw
    text-base
  >
    <div
      flex
      w-full h-91vh
    >
      <Menu w25vw bg="#d9dfe7" />
      <div flex="~ col" bg="#eef0f5">
        <div h-10vh w-full />
        <main
          class="main-box"
          w75vw h-81vh
          px5
          overflow="x-hidden y-auto"
        >
          <router-view />
        </main>
      </div>
    </div>
    <Footer
      h-9vh
      w-full
      bg="#f6f7fa"
      border="t-0.5 gray-50"
    />
  </div>
</template>

<style>
.main-box::-webkit-scrollbar {
    display: none;
}
</style>
