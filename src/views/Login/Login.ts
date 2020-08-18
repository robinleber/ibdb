/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import firebase from "firebase";

@Component
export default class Login extends Vue {
    rememberMe = false;
    stayLoggedIn = false;

    signIn = {
        email: "",
        pass: "",
        rememberMe: false,
        remainLoggedIn: false,
    };

    login(): void {
        mainEventBus.$emit("changeMainLoading", true, "Anmelden...");
        console.log(this.signIn);
        firebase
            .auth()
            .signInWithEmailAndPassword(this.signIn.email, this.signIn.pass)
            .then(() => {
                mainEventBus.$emit("changeMainLoading", false, "");
                this.$router.replace("Home");
            })
            .catch((e) => {
                console.log(`Error: ${e.code} - ${e.message}`);
                setTimeout(
                    () => mainEventBus.$emit("changeMainLoading", false, ""),
                    1000
                );
            });
    }
}
