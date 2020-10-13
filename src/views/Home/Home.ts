/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import firebase from "firebase";
import { mapState } from "vuex";
import * as fb from "@/firebase";
import store from "@/store";

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

    public logout(): void {
        this.$store.dispatch("logout");
    }

    public mounted() {
        mainEventBus.$emit("changeMainLoading", false, "");
    }
}
