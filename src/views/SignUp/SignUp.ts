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
import { Cropper } from "vue-advanced-cropper";

@Component({
    components: {
        Cropper,
    },
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
            user: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(32),
            },
        },
    },
})
export default class SignUp extends Vue {
    /**
     * Data
     */

    // SignUp-Form
    public signUp = {
        email: "robin.leber@itacsoftware.com",
        pass: "zh5#c2S3^jLa",
        passRepeat: "zh5#c2S3^jLa",
        user: "Robin",
    };
    public isSignUpDisabled = true;

    // Image upload
    public isUploadImageDialog = false;
    public isImageLoading = false;
    public imageUrl: any = null;
    public imageUrlCropped: any = null;
    public imageFile: any = null;

    public zoom = 0;

    // Stepper
    public activeStep = "first";
    public firstStepError = "";
    public secondStepError = "";
    public steps = [{ step: false }, { step: false }];

    // Cast imageInput as HTML-Element !IMPORTANT!
    public $refs!: {
        imageInputForm: HTMLFormElement;
        imageInput: HTMLFormElement;
        nameInput: HTMLFormElement;
        emailInput: HTMLFormElement;
        cropper: HTMLFormElement;
    };

    /**
     * Methods
     */

    public nextStep(): void {
        this.$v.signUp.email.$touch(); // Check signUp-form
        this.$v.signUp.pass.$touch(); // Check signUp-form
        this.$v.signUp.passRepeat.$touch(); // Check signUp-form
        if (
            !this.$v.signUp.email.$invalid ||
            !this.$v.signUp.pass.$invalid ||
            !this.$v.signUp.passRepeat.$invalid
        ) {
            // When signUp-form is valid
            this.steps[0].step = true;
            this.activeStep = "second";
            this.firstStepError = null;
        } else {
            // When signUp-form is invalid
            this.firstStepError = "Fehler!";
        }
    }

    public pickImage(): void {
        this.$refs.imageInput.click(); // Focus on file-input for profile-image
        this.isImageLoading = true;
    }

    public onImagePicked(e: any): void {
        // Get selected files
        const files = e.target.files;
        if (files[0] !== undefined) {
            let imageName = files[0].name; // Get file-name
            // Check file-format
            if (imageName.lastIndexOf(".") <= 0) {
                Message.error("Keine gültige Datei!");
                this.isImageLoading = false;
                return; // if image type is invalid
            }
            this.isUploadImageDialog = true;
            // Get image-url
            const fr = new FileReader();
            fr.onload = e => {
                this.imageUrl = e.target.result;
            };
            // Get image-fileTURTLE 34rw1g CRICKET cru5h3d
            fr.readAsDataURL(files[0]);
            this.imageFile = files[0];
        }
        this.$refs.imageInputForm.reset();
    }

    public zoomImage(): void {
        this.$refs.cropper.zoom(this.zoomValue);
    }

    public cancelCrop(): void {
        this.isImageLoading = false;
        this.isUploadImageDialog = false;
    }

    public editImage(): void {
        this.isUploadImageDialog = true;
        this.isImageLoading = true;
    }

    public cropImage(): void {
        const { coordinates, canvas } = this.$refs.cropper.getResult();
        this.imageUrlCropped = canvas.toDataURL();
        this.isUploadImageDialog = false;
        this.isImageLoading = false; // Hide loading-screen
    }

    public createAccount(): void {
        this.isSignUpDisabled = true;
        // check profile-form
        this.$v.signUp.user.$touch();
        // when profile-form is valid
        if (!this.$v.signUp.user.$invalid) {
            this.secondStepError = null; // hide step-error
            this.$v.signUp.$touch(); // check signUp-form
            if (!this.$v.signUp.$invalid) {
                // When signUp-form is valid
                mainEventBus.$emit(
                    "changeMainLoading",
                    true,
                    "Erstelle Account!"
                ); // Show loading screen
                this.$store.dispatch("signUp", [this.signUp, this.imageFile]); // Create user-account
            } else {
                // When signUp-form is invalid
                this.steps[0].step = false; // Go to first step
                this.activeStep = "first";

                this.isSignUpDisabled = false;
                this.firstStepError = "Fehler!";
            }
        } else this.secondStepError = "Fehler!";
    }

    public getValidationClass(form: string, fieldName: string): any {
        const field = this.$v.signUp[fieldName];
        if (field) return { "md-invalid": field.$invalid && field.$dirty };
    }

    public get zoomValue(): number {
        return this.zoom / 100;
    }

    // Watch Steps
    @Watch("steps", { immediate: true })
    handler(value): void {
        if (value[0].step) this.$nextTick(() => this.$refs.emailInput.focus());
        else this.$nextTick(() => this.$refs.nameInput.focus());
    }
}
