/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";

@Component
export default class Home extends Vue {
    username = "Robin";
    isDarkMode = true;

    navBar = {
        search: "",
    };

    switchDarkMode() {
        mainEventBus.$emit("switchDarkMode", this.isDarkMode);
    }

    mounted() {
        mainEventBus.$emit("changeMainLoading", false, "");
    }
}
