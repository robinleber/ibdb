/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import firebase from "firebase";
import { Message } from "element-ui";
import { required, email } from "vuelidate/lib/validators";

@Component({
    validations: {
        signIn: {
            email: { required, email },
            pass: { required },
        },
    },
})
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
        this.$v.$touch();
        if (!this.$v.$invalid) {
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
                        () =>
                            mainEventBus.$emit("changeMainLoading", false, ""),
                        1000
                    );
                });
        } else {
            mainEventBus.$emit("changeMainLoading", false, "");
        }
    }

    getValidationClass(fieldName: string): any {
        const field = this.$v.signIn[fieldName];

        if (field) {
            return {
                "md-invalid": field.$invalid && field.$dirty,
            };
        }
    }
}
