import { Vue, Component } from "vue-property-decorator";
import * as fb from "@/firebase";
import { mapState } from "vuex";

@Component({
    computed: {
        ...mapState({
            userProfile: "userProfile",
        }),
    },
})
export default class Settings extends Vue {
    public userProfile!: any;
    public form = {
        name: { value: "", isDisabled: true },
        email: { value: "", isDisabled: true },
        password: { value: "placeholder" },
    };

    public checkChange(field: string): void {
        if (this.form[field].value === this.userProfile.name)
            this.form[field].isDisabled = true;
        else this.form[field].isDisabled = false;
    }

    public mounted(): void {
        this.form.name.value = this.userProfile.name;
        this.form.email.value = fb.AUTH.currentUser.email;
    }
}
