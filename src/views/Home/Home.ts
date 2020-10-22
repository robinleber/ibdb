/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import { mapState } from "vuex";
import * as fb from "@/firebase";
import store from "@/store";
import router from "@/router";

@Component({
    computed: {
        ...mapState({
            userProfile: "userProfile",
        }),
    },
})
export default class Home extends Vue {
    // mapState variables
    public userProfile!: any;
    public books!: any;

    public showConfirm = false;

    public logout(): void {
        store.dispatch("logout");
    }

    public getDisplayImagePath(): any {
        if (this.userProfile.hasDisplayImage)
            return this.userProfile.displayImageUrl;
        let defaultDisplayImagePath = require.context(
            "@/assets/images/",
            false,
            /\.png$/
        );
        return defaultDisplayImagePath("./defaultDisplayImage.png");
    }

    public redirectRouter(route: string): void {
        if (router.currentRoute.fullPath !== route) router.replace(route);
    }

    public mounted() {
        mainEventBus.$emit("changeMainLoading", false, "");
    }
}
