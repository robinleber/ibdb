/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import firebase from "firebase";

@Component
export default class Login extends Vue {
    signUp = {
        user: "",
        email: "",
        pass: "",
        passRepeat: "",
    };

    activeStep = "first";
    steps = [
        {
            step: false,
        },
        {
            step: false,
        },
    ];

    createUser(): void {
        const THIS = this;
        mainEventBus.$emit("changeMainLoading", true, "Erstelle Account...");
        firebase
            .auth()
            // Create user-account with email and password
            .createUserWithEmailAndPassword(this.signUp.email, this.signUp.pass)
            // When user-account-creation was successfull
            .then(() => {
                THIS.steps[0].step = true;
                THIS.activeStep = "second";
                console.log(`${THIS.steps[0].step} ${THIS.activeStep}`);
            })
            .catch((e) => {
                console.error(`Error: ${e.code} - ${e.message}`);
                setTimeout(
                    () => mainEventBus.$emit("changeMainLoading", false, ""),
                    1000
                );
            });
    }

    completeSignUp(): void {
        mainEventBus.$emit(
            "changeMainLoading",
            true,
            "Aktualisiere Nutzerdaten..."
        );
        firebase.auth().currentUser?.updateProfile({
            displayName: this.signUp.user
        });
    }
}
