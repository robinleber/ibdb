/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";

@Component
export default class App extends Vue {
  isLoading = false;
  loadingMsg = "";

  mounted() {
    mainEventBus.$on("changeMainLoading", (isLoading: boolean, loadingMsg: string) => {
      this.isLoading = isLoading;
      this.loadingMsg = loadingMsg;
    });
  }
}