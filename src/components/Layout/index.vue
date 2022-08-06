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
      <Menu w25vw bg="#d9dfe7"/>
      <main w75vw bg="#eef0f5">
        <router-view />
      </main>
    </div>
    <Footer
      h-9vh
      w-full
      bg="#f6f7fa"
      border="t-0.5 gray-50"
    />
  </div>
</template>
