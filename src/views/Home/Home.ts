/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import firebase from "firebase";

@Component
export default class Home extends Vue {
    username: any;
    profileSrc: any = null;

    mounted() {
        mainEventBus.$emit("changeMainLoading", false, "");
        this.getProfileImage();
        this.username = firebase.auth().currentUser.displayName;
    }

    getProfileImage(): void {
        const user = firebase.auth().currentUser;

        // Create a reference with an initial file path and name
        let storage = firebase.storage();
        let pathRef = storage.ref(`profileImages/${user.uid}_${user.displayName.toLowerCase()}-profileImage`);

        // Get the download URL
        pathRef.getDownloadURL()
        .then(url => this.profileSrc = url)
        .catch(function(e) {
            console.error(`Error: ${e.message}`);
        })
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
