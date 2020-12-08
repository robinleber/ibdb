<template>
  <div id="app" md-theme="selection-black">
    <router-view />
    <div v-if="isLoading" class="loading-screen">
      <md-progress-spinner md-mode="indeterminate" />
      <span class="loading-message">{{ loadingMsg }}</span>
    </div>
  </div>
</template>

<script lang="ts" src="./App.ts"></script>

<style lang="scss" src="./themes/light.scss"></style>

<style lang="scss" src="./App.scss"></style>
