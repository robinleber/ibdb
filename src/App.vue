<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component

export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  @font-face {
    font-family: "Roboto Regular";
    src: url("./assets/font/Roboto/Roboto-Regular.ttf");
  }

  background-image: url("./assets/bg.png");
  font-family: "Roboto Regular", sans-serif;
  height: 100vh;
  width: 100vw;

  img {
      -webkit-user-drag: none;
  }
}
</style>
