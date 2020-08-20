/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import firebase from "firebase";
import { Message } from "element-ui";

@Component
export default class Login extends Vue {
    signUp = {
        user: "",
        email: "",
        pass: "",
        passRepeat: "",
    };

    activeStep = "first";
    firstStepError = "";
    steps = [
        {
            step: false,
        },
        {
            step: false,
        },
    ];

    createUser(): void {
        mainEventBus.$emit("changeMainLoading", true, "Erstelle Account...");
        this.steps[0].step = true;
        this.activeStep = "second";
        firebase
            .auth()
            // Create user-account with email and password
            .createUserWithEmailAndPassword(this.signUp.email, this.signUp.pass)
            // When user-account-creation was successfull
            .then(() => {
                setTimeout(
                    () => mainEventBus.$emit("changeMainLoading", false, ""),
                    1000
                );
            })
            .catch((e: any) => {
                setTimeout(
                    () => mainEventBus.$emit("changeMainLoading", false, ""),
                    1000
                );
                this.steps[0].step = false;
                this.activeStep = "first";
                Message.error(`Error: ${e.message}`);
                this.firstStepError = "Fehler!";
            });
    }

    completeSignUp(): void {
        setTimeout(
            () =>
                mainEventBus.$emit(
                    "changeMainLoading",
                    true,
                    "Herzlich Willkommen!"
                ),
            1000
        );
        firebase
            .auth()
            .currentUser?.updateProfile({
                displayName: this.signUp.user,
            })
            .then(() => {
                setTimeout(
                    () => mainEventBus.$emit("changeMainLoading", false, ""),
                    1000
                );
                this.$router.replace("Home");
                Message.success(`Account erfolgreich erstellt. Herzlich Willkommen!`);
            })
            .catch((e: any) => {
                setTimeout(
                    () => mainEventBus.$emit("changeMainLoading", false, ""),
                    1000
                );
                Message.error(e.message);
            });
    }
}
