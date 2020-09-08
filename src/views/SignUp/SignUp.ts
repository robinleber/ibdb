/* eslint-disable */
import { Component, Vue, Watch } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import firebase from "firebase";
import { Message } from "element-ui";
import {
    required,
    email,
    minLength,
    maxLength,
    sameAs,
} from "vuelidate/lib/validators";

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
    isSignUpDisabled = false;

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
    steps = [
        {
            step: false,
        },
        {
            step: false,
        },
    ];

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
        // Check signUp-form
        this.$v.signUp.$touch();
        if (!this.$v.signUp.$invalid) {
            // When signUp-form is valid
            this.steps[0].step = true;
            this.activeStep = "second";
            this.firstStepError = null;
        } else {
            // When signUp-form is invalid
            // Show error-message
            this.firstStepError = "Fehler!";
        }
    }

    pickImage() {
        // Focus on file-input for profile-image
        this.$refs.imageInput.click();
    }

    onImagePicked(e: any) {
        // Hide loading-screen
        this.isImageLoading = true;

        // Get selected files
        const files = e.target.files;
        if (files[0] !== undefined) {
            // Get file-name
            this.imageName = files[0].name;

            // Check file-format
            if (this.imageName.lastIndexOf(".") <= 0) {
                Message.error("Keine gültige Datei!");
                return;
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

        // Clear imageInput
        e.target.files = null;

        // Hide loading-screen
        this.isImageLoading = false;
    }

    createAccount(): void {
        this.isSignUpDisabled = true;

        // check profile-form
        this.$v.profile.$touch();

        // when profile-form is valid
        if (!this.$v.profile.$invalid) {
            // hide step-error
            this.secondStepError = null;

            // check signUp-form
            this.$v.signUp.$touch();
            if (!this.$v.signUp.$invalid) {
                // When signUp-form is valid
                // Show loading screen
                mainEventBus.$emit(
                    "changeMainLoading",
                    true,
                    "Erstelle Account!"
                );

                // Create user-account
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        this.signUp.email,
                        this.signUp.pass
                    )
                    // When user-account-creation was successfull
                    .then(() => {
                        // Update username
                        firebase
                            .auth()
                            .currentUser?.updateProfile({
                                displayName: this.profile.user,
                            })
                            // When username-update was successfull
                            .then(() => {
                                // Upload image to firebase-storage

                                // Create storage reference
                                const ref = firebase.storage().ref();

                                // Get metadata
                                const metaData = {
                                    contentType: this.imageFile.type,
                                };

                                // Set imageName => userUID _ userNAME
                                this.imageName = `${
                                    firebase.auth().currentUser.uid
                                }_${firebase
                                    .auth()
                                    .currentUser.displayName.toLowerCase()}`;

                                // Upload image to "profileImages"
                                ref.child(
                                    `profileImages/${this.imageName}`
                                ).put(this.imageFile, metaData);

                                // Hide loading screen
                                mainEventBus.$emit(
                                    "changeMainLoading",
                                    false,
                                    ""
                                );

                                // Show success message
                                Message.success(
                                    `Account erfolgreich erstellt. Herzlich Willkommen!`
                                );

                                // Go to home
                                this.$router.replace("Home");
                            })
                            // When username-update was unsuccessfull
                            .catch((e: any) => {
                                // Hide loading screen
                                mainEventBus.$emit(
                                    "changeMainLoading",
                                    false,
                                    ""
                                );
                                this.isSignUpDisabled = false;

                                // Show error message
                                Message.error(`Error: ${e.message}`);
                            });
                    })
                    // When user-account-creation was unsuccessfull
                    .catch((e: any) => {
                        // Hide loading-screen
                        mainEventBus.$emit("changeMainLoading", false, "");
                        this.isSignUpDisabled = false;

                        // Go to first step
                        this.steps[0].step = false;
                        this.activeStep = "first";

                        // Show error message
                        Message.error(`Error: ${e.message}`);
                        this.firstStepError = "Fehler!";
                    });
            } else {
                // When signUp-form is invalid
                // Go to first step
                this.steps[0].step = false;
                this.activeStep = "first";

                this.isSignUpDisabled = false;

                // Show error message
                this.firstStepError = "Fehler!";
            }
        } else {
            // Show error message
            this.secondStepError = "Fehler!";
        }
    }

    getValidationClass(form: string, fieldName: string): any {
        if (form == "signUp") {
            const field = this.$v.signUp[fieldName];

            if (field) {
                return {
                    "md-invalid": field.$invalid && field.$dirty,
                };
            }
        } else if (form == "profile") {
            const field = this.$v.profile[fieldName];

            if (field) {
                return {
                    "md-invalid": field.$invalid && field.$dirty,
                };
            }
        }
    }

    // Watch Steps
    @Watch("steps", { immediate: true })
    handler(value): void {
        if (value[0].step) this.$refs.nameInput.click();
        else this.$refs.emailInput.click();
    }
}
