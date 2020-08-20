/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import firebase from "firebase";

@Component
export default class Home extends Vue {
    username = firebase.auth().currentUser?.displayName;

    navBar = {
        search: "",
        profileSrc: "@/assets/avatar.png",
    };

    mounted() {
        mainEventBus.$emit("changeMainLoading", false, "");
    }

    logout(): void {
        mainEventBus.$emit("changeMainLoading", true, "Auf Wiedersehen!");
        firebase
            .auth()
            .signOut()
            .then(() => {
                this.$router.replace("Login");
                mainEventBus.$emit("changeMainLoading", false, "");
            })
            .catch((e) => console.error(`${e.code} - ${e.message}`));
    }
}
