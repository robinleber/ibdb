import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";

@Component
export default class AddBookDialog extends Vue {
    isAddBookDialogVisible = true;
    isbnInput = "";
    activeStep = "first";

    bookInfo: any | null;

    isNumber(): string {
        return this.isbnInput.replace(/\D+/g, "");
    }

    getAuthors(authors: [string]): string {
        let authorsString = authors[0];
        for (let i = 1; i < authors.length; i++)
            authorsString += ", " + authors[i];
        return authorsString;
    }

    setDone(id: number, index: string): void {
        if (index) this.activeStep = index;
    }

    cancel(): void {
        this.isAddBookDialogVisible = false;
    }

    clearDialog(): void {
        this.activeStep = "first";
        this.bookInfo = [];
        this.isbnInput = "";
    }

    onConfirm(): void {
        return;
    }

    mounted(): void {
        mainEventBus.$on("showAddBookDialog", () => {
            this.clearDialog();
            this.isAddBookDialogVisible = true;
        });
    }
}
