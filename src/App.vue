<template>
  <div
    :element-loading-text="loadingMsg"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    id="app"
    md-theme="selection-black"
    v-loading="isLoading"
  >
    <router-view />
  </div>
</template>

<script lang="ts" src="./App.ts">

</script>

<style lang="scss" src="./App.scss">
</style>
