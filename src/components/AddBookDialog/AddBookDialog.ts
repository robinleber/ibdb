import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";

@Component
export default class AddBookDialog extends Vue {
    isAddBookDialogVisible = false;
    isbnInput = "";
    activeStep = "first";
    steps = [
        {
            step: false,
        },
        {
            step: false,
        },
    ];

    isNumber(): string {
        return this.isbnInput.replace(/\D+/g, "");
    }

    setDone(id: number, index: string): void {
        this.steps[id].step = true;

        if (index) this.activeStep = index;
    }

    cancel() {
        this.isbnInput = "";
        this.isAddBookDialogVisible = false;
    }

    mounted(): void {
        mainEventBus.$on(
            "showAddBookDialog",
            () => (this.isAddBookDialogVisible = true)
        );
    }
}
