import { Vue, Component } from "vue-property-decorator";
import { mapState } from "vuex";
import { Message } from "element-ui";
import {
    required,
    email,
    minLength,
    maxLength,
    sameAs,
} from "vuelidate/lib/validators";
import * as fb from "@/firebase";
import store from "@/store";
import CropperDialog from "@/components/CropperDialog/CropperDialog.vue";

@Component({
    components: {
        CropperDialog,
    },
    computed: {
        ...mapState(["userProfile"]),
    },
    validations: {
        settingsForm: {
            name: {
                value: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(32),
                },
            },
            email: {
                value: {
                    required,
                    email,
                },
                pass: {
                    required,
                },
            },
            newPassword: {
                oldPass: {
                    required,
                },
                newPass: {
                    required,
                    minLength: minLength(8),
                },
                newPassRepeat: {
                    required,
                    sameAsNewPass: sameAs("newPass"),
                },
            },
        },
    },
})
export default class Settings extends Vue {
    public userProfile!: any;
    public settingsForm = {
        name: { value: "", isDisabled: true },
        email: { value: "", isDisabled: true, pass: "" },
        password: { value: "••••••••••", isDisabled: true },
        newPassword: {
            oldPass: "",
            newPass: "",
            newPassRepeat: "",
            isDisabled: true,
        },
        isDarkMode: { value: false },
    };
    public isUploadImageDialog = false;
    public isDeleteDisplayImage = false;
    public isImageLoading = false;
    public imageUrl: any = null;
    public imageUrlCropped: any = null;
    public imageFile: any = null;

    public selectedPalette = "blue";
    public palettes = [
        { color1: "blue", color2: "red", hue: "A200" },
        { color1: "blue", color2: "lime", hue: "A200" },
    ];

    $refs: {
        nameInput: any;
        emailInput: any;
        emailLabel: any;
        oldPasswordInput: any;
        imageInput: any;
        imageInputForm: any;
    };

    public getValidationClass(form: string, fieldName: string): any {
        const field =
            fieldName !== ""
                ? this.$v.settingsForm[form][fieldName]
                : this.$v.settingsForm[form];
        if (field) return { "md-invalid": field.$invalid && field.$dirty };
    }

    public getDisplayImagePath(): any {
        if (this.userProfile.hasDisplayImage)
            return this.userProfile.displayImageUrl;
        let defaultDisplayImagePath = require.context(
            "@/assets/images/",
            false,
            /\.png$/
        );
        return defaultDisplayImagePath("./defaultDisplayImage.png");
    }

    public pickImage(): void {
        this.$refs.imageInput.click();
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
                return; // if image type is invalid
            }
            this.isUploadImageDialog = true;
            // Get image-url
            const fr = new FileReader();
            fr.onload = e => {
                this.imageUrl = e.target.result;
            };
            // Get image-file
            fr.readAsDataURL(files[0]);
            this.imageFile = files[0];
        }
        this.$refs.imageInputForm.reset();
    }

    public onImageCropped(): void {
        this.isUploadImageDialog = false;
        this.isImageLoading = false;
        this.updateDisplayImage();
    }

    public onCropCanceled(): void {
        this.isUploadImageDialog = false;
        this.isImageLoading = false;
    }

    public async updateDisplayImage(): Promise<void> {
        let imageBlob = await fetch(this.imageUrlCropped).then(r => r.blob());
        if (this.userProfile.hasDisplayImage)
            store.dispatch("updateDisplayImage", imageBlob);
        else store.dispatch("addDisplayImage", imageBlob);
    }

    public deleteDisplayImage(): void {
        this.isImageLoading = true;
        store.dispatch("deleteDisplayImage");
        this.isImageLoading = false;
    }

    public abortChange(field: string): void {
        switch (field) {
            case "name":
                alert("sad");
                this.$v.settingsForm.name.$reset();
                this.settingsForm.name = {
                    value: this.userProfile.displayName,
                    isDisabled: true,
                };
                break;
            case "email":
                this.$v.settingsForm.email.$reset();
                this.settingsForm.email = {
                    value: fb.AUTH.currentUser.email,
                    isDisabled: true,
                    pass: "",
                };
                this.$refs.emailLabel.innerHTML = "E-Mail-Adresse";
                break;
            case "pass":
                this.$v.settingsForm.newPassword.$reset();
                this.settingsForm.newPassword = {
                    oldPass: "",
                    newPass: "",
                    newPassRepeat: "",
                    isDisabled: true,
                };
        }
    }

    public abortAllChangeExcept(field: string): void {
        switch (field) {
            case "name":
                this.abortChange("email");
                this.abortChange("pass");
                break;
            case "email":
                this.abortChange("name");
                this.abortChange("pass");
                break;
            case "pass":
                this.abortChange("name");
                this.abortChange("email");
                break;
        }
    }

    public changeName(): void {
        this.abortAllChangeExcept("name");
        this.settingsForm.name.isDisabled = false;
        this.$nextTick(() => {
            this.$refs.nameInput.$el.focus();
        });
    }

    public updateName(): void {
        this.$v.settingsForm.name.$touch();
        if (!this.$v.settingsForm.name.$invalid) {
            if (this.settingsForm.name !== this.userProfile.displayName) {
                this.settingsForm.name.isDisabled = true;
                store.dispatch("updateName", this.settingsForm.name.value);
            }
        }
    }

    public changeEmail(): void {
        this.abortAllChangeExcept("email");
        this.settingsForm.email.isDisabled = false;
        this.settingsForm.email.value = "";
        this.$refs.emailLabel.innerHTML = "Neue E-Mail-Adresse";
        this.$nextTick(() => {
            this.$refs.emailInput.$el.focus();
        });
    }

    public updateEmail(): void {
        this.$v.settingsForm.email.$touch();
        if (!this.$v.settingsForm.email.$invalid) {
            store.dispatch("updateEmail", {
                email: this.settingsForm.email.value,
                pass: this.settingsForm.email.pass,
            });
            this.settingsForm.email.isDisabled = true;
            this.settingsForm.email.pass = "";
        }
    }

    public changePassword(): void {
        this.abortAllChangeExcept("pass");
        this.settingsForm.newPassword.isDisabled = false;
        this.$nextTick(() => {
            this.$refs.oldPasswordInput.$el.focus();
            this.$refs.oldPasswordInput.$el.select();
        });
    }

    public updatePassword(): void {
        this.$v.settingsForm.newPassword.$touch();
        if (!this.$v.settingsForm.newPassword.$invalid) {
            store.dispatch("updatePassword", this.settingsForm.newPassword);
            this.settingsForm.newPassword = {
                oldPass: "",
                newPass: "",
                newPassRepeat: "",
                isDisabled: true,
            };
        }
    }

    public switchDarkMode(): void {
        store.dispatch("switchDarkMode", this.settingsForm.isDarkMode.value);
    }

    get name(): string {
        return this.userProfile.displayName;
    }

    get isDarkMode(): boolean {
        return this.userProfile.isDarkMode;
    }

    get isGoogleEmail(): boolean {
        return fb.AUTH.currentUser.providerData[0].providerId === "google.com";
    }

    //
    // ▼ LIFECYCLE HOOKS ▼
    //

    public mounted(): void {
        document.title = "IBDb: Einstellungen";

        this.settingsForm.name.value = this.name;
        this.settingsForm.email.value = fb.AUTH.currentUser.email;
        this.settingsForm.isDarkMode.value = this.isDarkMode;
    }
}
