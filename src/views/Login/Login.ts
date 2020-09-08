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
    isLoginDisabled = false;

    signIn = {
        email: "",
        pass: "",
        rememberMe: false,
        remainLoggedIn: false,
    };

    login(): void {
        mainEventBus.$emit("changeMainLoading", true, "Anmelden...");
        this.isLoginDisabled = true;

        this.$v.$touch();
        if (!this.$v.$invalid) {
            // Remember Me
            if (typeof Storage !== "undefined") {
                // Check if local storage is supported
                localStorage.setItem("email", this.signIn.email);
                if (this.signIn.rememberMe)
                    // Check if user wants to save email
                    // Save email to local storage
                    localStorage.setItem("email", this.signIn.email);
                else {
                    if (localStorage.getItem("email"))
                        localStorage.removeItem("email");
                }
            } else {
                // When local storage is not supported
                // Uncheck remember-me
                this.signIn.rememberMe = false;

                // Show error message
                Message.error(
                    "Fehler! - E-Mail-Adresse konnte nicht gespeichert werden!"
                );
            }

            let authPersistance = this.signIn.remainLoggedIn
                ? firebase.auth.Auth.Persistence.SESSION
                : firebase.auth.Auth.Persistence.LOCAL;

            // Set Authentication State Persistance
            firebase
                .auth()
                .setPersistence(authPersistance)
                .then(() => {
                    // Login
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(
                            this.signIn.email,
                            this.signIn.pass
                        )
                        // When sign-in was successfull
                        .then(() => {
                            // Hide loading-screen
                            mainEventBus.$emit("changeMainLoading", false, "");

                            // Go to home
                            this.$router.replace("Home");
                        })
                        // When sign-in was unsuccessfull
                        .catch((e) => {
                            console.log(`Error: ${e.code} - ${e.message}`);

                            // Hide loading-screen
                            mainEventBus.$emit("changeMainLoading", false, "");
                            this.isLoginDisabled = false;
                        });
                })
                .catch((e) => {
                    // Hide loading-screen
                    mainEventBus.$emit("changeMainLoading", false, "");
                    this.isLoginDisabled = false;

                    // Show error message
                    Message.error(`Fehler! - ${e.message}`);
                });
        } else {
            // Hide loading-screen
            mainEventBus.$emit("changeMainLoading", false, "");
            this.isLoginDisabled = false;
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

    getEmailFromLocalStorage(): void {
        if (localStorage.getItem("email")) {
            // Does email exist in local storage
            // Get email from local storage
            this.signIn.email = localStorage.getItem("email");

            // Check remember me
            this.signIn.rememberMe = true;
        }
    }

    mounted(): void {
        this.getEmailFromLocalStorage();
    }
}
