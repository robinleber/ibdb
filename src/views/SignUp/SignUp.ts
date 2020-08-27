/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
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
    // SignUp-Form
    signUp = {
        email: "",
        pass: "",
        passRepeat: "",
    };

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
        this.$refs.imageInput.$el.click();
        this.isImageLoading = true;
    }

    onImagePicked(e: any) {
        const files = e.target.files;
        if (files[0] !== undefined) {
            this.imageName = files[0].name;
            if (this.imageName.lastIndexOf(".") <= 0) {
                Message.error("Keine gültige Datei!");
                return;
            }
            const fr = new FileReader();
            fr.addEventListener("load", () => {
                this.imageUrl = fr.result;
            });
            fr.readAsDataURL(files[0]);
            this.imageFile = files[0];
        }

        this.isImageLoading = false;
    }

    mounted() {
        console.log(this.$refs);
    }

    createAccount(): void {
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
                                const ref = firebase.storage().ref();
                                const metaData = {
                                    contentType: this.imageFile.type,
                                };
                                // Set imageName => userUID + userNAME + profileImage
                                this.imageName = `${
                                    firebase.auth().currentUser.uid
                                }_${
                                    firebase.auth().currentUser.displayName.toLowerCase()
                                    }-profileImage`;
                                const task = ref
                                    .child(this.imageName)
                                    .put(this.imageFile, metaData);

                                task.then((snapshot) =>
                                    snapshot.ref.getDownloadURL()
                                ).then((url) => {
                                    console.log(url);
                                });

                                // Hide loading screen
                                mainEventBus.$emit(
                                    "changeMainLoading",
                                    false,
                                    ""
                                );

                                // Go to home
                                this.$router.replace("Home");

                                // Show success message
                                Message.success(
                                    `Account erfolgreich erstellt. Herzlich Willkommen!`
                                );
                            })
                            // When username-update was unsuccessfull
                            .catch((e: any) => {
                                // Hide loading screen
                                mainEventBus.$emit(
                                    "changeMainLoading",
                                    false,
                                    ""
                                );

                                // Show error message
                                Message.error(e.message);
                            });
                    })
                    // When user-account-creation was unsuccessfull
                    .catch((e: any) => {
                        // Hide loading-screen
                        mainEventBus.$emit("changeMainLoading", false, "");
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

                // Show error message
                this.firstStepError = "Fehler!";
                console.log("Bla");
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
}
