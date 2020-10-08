/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import firebase from "firebase";
import { mapState } from "vuex";
import * as fb from "@/firebase";

@Component({
    computed: {
        ...mapState({
            userName(state: any) {
                return state.name;
            },
            async profileUrl(state: any) {
                console.log(state.userProfile);
                let profileUrl = "";
                // Get the download URL
                await fb.STORAGE
                    .ref()
                    .child(state.userProfile.prof_src)
                    .getDownloadURL()
                    .then(url => (this.profileImage.push(url)))
                    .catch(e => console.error(`Error: ${e.message}`));
            },
        }),
    },
})
export default class Home extends Vue {
    // mapState variables
    public userprofile!: any;
    public books!: any;

    public profileImage = [];

    // public get username

    public logout(): void {
        mainEventBus.$emit("changeMainLoading", true, "Auf Wiedersehen!");
        firebase
            .auth()
            .signOut()
            .then(() => {
                this.$router.replace("Login");
                mainEventBus.$emit("changeMainLoading", false, "");
            })
            .catch(e => console.error(`${e.code} - ${e.message}`));
    }

    public mounted() {
        mainEventBus.$emit("changeMainLoading", false, "");
    }
}
