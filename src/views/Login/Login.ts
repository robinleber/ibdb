/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import { required, email } from "vuelidate/lib/validators";
import { Message } from "element-ui";
import store from "@/store";

@Component({
    validations: {
        signIn: {
            email: { required, email },
            pass: { required },
        },
    },
})
export default class Login extends Vue {
    public rememberMe = false;
    public stayLoggedIn = false;
    public isLoginDisabled = false;

    public signIn = {
        email: "",
        pass: "",
        rememberMe: false,
        remainLoggedIn: false,
    };

    public login(): void {
        this.$v.$touch();
        if (!this.$v.$invalid) {
            mainEventBus.$emit("changeMainLoading", true, "Anmelden...");
            this.isLoginDisabled = true;
            // Remember Me
            if (typeof Storage !== "undefined") {
                // Check if local storage is supported
                localStorage.setItem("email", this.signIn.email);
                if (this.signIn.rememberMe)
                    // Check if user wants to save email
                    localStorage.setItem("email", this.signIn.email);
                // Save email to local storage
                else {
                    if (localStorage.getItem("email"))
                        localStorage.removeItem("email");
                }
            } else {
                // When local storage is not supported
                this.signIn.rememberMe = false; // Uncheck remember-me

                Message.error(
                    "Fehler! - E-Mail-Adresse konnte nicht gespeichert werden!"
                );
            }
            store.dispatch("login", {
                email: this.signIn.email,
                pass: this.signIn.pass,
                rememberMe: this.signIn.rememberMe,
                remainLoggedIn: this.signIn.remainLoggedIn,
            });
        }
    }

    public getValidationClass(fieldName: string): any {
        const field = this.$v.signIn[fieldName];

        if (field) return { "md-invalid": field.$invalid && field.$dirty };
    }

    public getEmailFromLocalStorage(): void {
        if (localStorage.getItem("email")) {
            // Does email exist in local storage
            // Get email from local storage
            this.signIn.email = localStorage.getItem("email");

            // Check remember me
            this.signIn.rememberMe = true;
        }
    }

    public mounted(): void {
        this.getEmailFromLocalStorage();
        mainEventBus.$on("enableLoginButton", isLoginDisabled => {
            this.isLoginDisabled = isLoginDisabled;
        })
    }

    public signInWithGoogle(): void {
        store.dispatch("signInWithGoogle");
    }
}
