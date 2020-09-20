/* eslint-disable */
import { Component, Vue, Watch } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import firebase from "firebase";
import { Message } from "element-ui";
import { required, email, minLength, maxLength, sameAs } from "vuelidate/lib/validators";

@Component({
    validations: {
        signUp: {
            email: {
                required,
                email,
            },
            pass: {
                required,
                minLength: minLength(8),
            },
            passRepeat: {
                required,
                sameAsPass: sameAs("pass"),
            },
        },
        profile: {
            user: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(32),
            },
        },
    },
})
export default class Login extends Vue {
    /**
     * Data
     */

    // SignUp-Form
    signUp = {
        email: "",
        pass: "",
        passRepeat: "",
    };
    isSignUpDisabled = true;

    // Profile-Form
    profile = {
        user: "",
    };

    // Image upload
    isImageLoading = false;
    imageName: any = null;
    imageUrl: any = null;
    imageFile: any = null;

    // Stepper
    activeStep = "first";
    firstStepError = "";
    secondStepError = "";
    steps = [{ step: false }, { step: false }];

    // Cast imageInput as HTML-Element !IMPORTANT!
    $refs!: {
        imageInput: HTMLFormElement;
        nameInput: HTMLFormElement;
        emailInput: HTMLFormElement;
    };

    /**
     * Methods
     */

    nextStep(): void {
        this.$v.signUp.$touch(); // Check signUp-form
        if (!this.$v.signUp.$invalid) {
            // When signUp-form is valid
            this.steps[0].step = true;
            this.activeStep = "second";
            this.firstStepError = null;
        } else {
            // When signUp-form is invalid
            this.firstStepError = "Fehler!";
        }
    }

    pickImage() {
        this.$refs.imageInput.click(); // Focus on file-input for profile-image
    }

    onImagePicked(e: any) {
        // Hide loading-screen
        this.isImageLoading = true;

        // Get selected files
        const files = e.target.files;
        if (files[0] !== undefined) {
            this.imageName = files[0].name; // Get file-name
            // Check file-format
            if (this.imageName.lastIndexOf(".") <= 0) {
                Message.error("Keine gültige Datei!");
                return; // if image type is invalid
            }
            // Get image-url
            const fr = new FileReader();
            fr.addEventListener("load", () => {
                this.imageUrl = fr.result;
            });
            // Get image-file
            fr.readAsDataURL(files[0]);
            this.imageFile = files[0];
        }
        e.target.files = null; // Clear imageInput
        this.isImageLoading = false; // Hide loading-screen
    }

    createAccount(): void {
        this.isSignUpDisabled = true;
        // check profile-form
        this.$v.profile.$touch();
        // when profile-form is valid
        if (!this.$v.profile.$invalid) {
            this.secondStepError = null; // hide step-error
            this.$v.signUp.$touch(); // check signUp-form
            if (!this.$v.signUp.$invalid) {
                // When signUp-form is valid
                mainEventBus.$emit("changeMainLoading", true, "Erstelle Account!"); // Show loading screen
                this.$store.dispatch("signUp", this.signUp, this.profile); // Create user-account
            } else {
                // When signUp-form is invalid
                this.steps[0].step = false; // Go to first step
                this.activeStep = "first";

                this.isSignUpDisabled = false;
                this.firstStepError = "Fehler!";
            }
        } else this.secondStepError = "Fehler!";
    }

    getValidationClass(form: string, fieldName: string): any {
        if (form == "signUp") {
            // Set signUp field error, when field is invalid
            const field = this.$v.signUp[fieldName];
            if (field) return { "md-invalid": field.$invalid && field.$dirty };
        } else if (form == "profile") {
            // Set profile field error, when field is invalid
            const field = this.$v.profile[fieldName];
            if (field) return { "md-invalid": field.$invalid && field.$dirty };
        }
    }

    // Watch Steps
    @Watch("steps", { immediate: true })
    handler(value): void {
        if (value[0].step) this.$refs.nameInput.click();
        else this.$refs.emailInput.click();
    }
}
