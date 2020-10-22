import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { Cropper } from "vue-advanced-cropper";
import { Message } from "element-ui";

@Component({
    components: {
        Cropper,
    },
})
export default class CropperDialog extends Vue {
    @Prop({ required: true, default: false })
    isVisible!: boolean;

    @Prop({ required: true })
    imageUrl!: string;

    @Model("image-cropped", { type: String })
    imageUrlCropped!: string;

    // Cast imageInput as HTML-Element !IMPORTANT!
    public $refs!: {
        imageInputForm: any;
        imageInput: any;
        nameInput: any;
        emailInput: any;
        cropper: any;
    };

    public pickImage(): void {
        this.$emit("pick-image");
    }

    public cancelCrop(): void {
        this.$emit("crop-canceled");
    }

    public cropImage(): void {
        const { canvas } = this.$refs.cropper.getResult();
        this.$emit("image-cropped", canvas.toDataURL());
    }
}
