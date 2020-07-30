<template>
  <div id="app" md-theme="selection-black">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
:root {
  --primary: #323232;
}

#app {
  @font-face {
    font-family: "Roboto Regular";
    src: url("./assets/font/Roboto/Roboto-Regular.ttf");
  }

  background-image: linear-gradient(to top, #ddd8, #ddd8), url("assets/bg3.png");
  font-family: "Roboto Regular", sans-serif;
  height: 100vh;
  width: 100vw;

  img {
    -webkit-user-drag: none;
  }

  ::selection {
    background-color: #323232;
    color: #fafafa;
  }

  .md-button {
    .md-icon {
      vertical-align: middle;
    }
  }
}
</style>
