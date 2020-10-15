import { Vue, Component } from "vue-property-decorator";
import * as fb from "@/firebase";
import store from "@/store";
import { mapState } from "vuex";
import CropperDialog from "@/components/CropperDialog/CropperDialog.vue";
import { Message } from 'element-ui';

@Component({
    components: {
        CropperDialog,
    },
    computed: {
        ...mapState(["userProfile"]),
    },
})
export default class Settings extends Vue {
    public userProfile!: any;
    public form = {
        name: { value: "", isDisabled: true },
        email: { value: "", isDisabled: true },
        password: { value: "placeholder", isDisabled: true },
        newPassword: {
            oldPass: "",
            newPass: "",
            newPassRepeat: "",
            isDisabled: true,
        },
        isDarkMode: { value: false },
    };
    public isUploadImageDialog = false;
    public imageUrl: any;

    $refs: {
        nameInput: any;
        emailInput: any;
        oldPasswordInput: any;
        imageInput: any;
        imageInputForm: any;
    };

    changeDisplayImage(): void {
        this.$refs.imageInput.click();
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
        }
        this.$refs.imageInputForm.reset();
    }

    public changeName(): void {
        this.form.name.isDisabled = false;
        this.$nextTick(() => {
            this.$refs.nameInput.$el.focus();
        });
    }

    public updateName(): void {
        this.form.name.isDisabled = true;
        store.dispatch("updateName", this.form.name.value);
    }

    public changeEmail(): void {
        this.form.email.isDisabled = false;
        this.$nextTick(() => {
            this.$refs.emailInput.$el.focus();
        });
    }

    public updateEmail(): void {
        this.form.email.isDisabled = true;
        store.dispatch("updateEmail", this.form.email.value);
    }

    public changePassword(): void {
        this.form.newPassword.isDisabled = false;
        this.$nextTick(() => {
            this.$refs.oldPasswordInput.$el.focus();
            this.$refs.oldPasswordInput.select();
        });
    }

    public cancelChangePassword(): void {
        this.form.newPassword = {
            oldPass: "",
            newPass: "",
            newPassRepeat: "",
            isDisabled: true,
        };
    }

    public updatePassword(): void {
        store.dispatch("updatePassword", this.form.newPassword);
        this.form.newPassword = {
            oldPass: "",
            newPass: "",
            newPassRepeat: "",
            isDisabled: true,
        };
    }

    public changeField(field: string): void {
        this.form[field].isDisabled;
    }

    public switchDarkMode(): void {
        store.dispatch("switchDarkMode", this.form.isDarkMode.value);
    }

    public beforeMount(): void {
        document.title = "IBDb: Einstellungen";

        console.log(this.userProfile);

        this.form.name.value = this.userProfile.name;
        this.form.email.value = fb.AUTH.currentUser.email;
        this.form.isDarkMode.value = this.userProfile.isDarkMode;
    }
}
