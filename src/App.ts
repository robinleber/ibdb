/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState(["userProfile"]),
  },
})
export default class App extends Vue {
  userProfile!: any;

  isLoading = false;
  isDarkMode = false;
  loadingMsg = "";

  mounted() {
    mainEventBus.$on(
      "changeMainLoading",
      (isLoading: boolean, loadingMsg: string) => {
        this.isLoading = isLoading;
        this.loadingMsg = loadingMsg;
      }
    );

    this.isDarkMode = this.userProfile.isDarkMode;

    document.body.style.backgroundImage = `linear-gradient(to top,
      ${this.isDarkMode ? "#000000bb, #000000bb" : "#fafafabb, #fafafabb"},
      url("assets/images/bg4.png")`;
  }
}
