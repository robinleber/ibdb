import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";

@Component
export default class AddBookDialog extends Vue {
    isAddBookDialogVisible = false;
    isbnInput = "9783608939811";
    activeStep = "first";
    steps = [
        {
            step: false,
        },
        {
            step: false,
        },
        {
            step: false,
        },
    ];

    bookInfo = {
        kind: "books#volume",
        id: "FCPSvQEACAAJ",
        etag: "I8t98GatYmk",
        selfLink: "https://www.googleapis.com/books/v1/volumes/FCPSvQEACAAJ",
        volumeInfo: {
            title: "Eragon - Der Auftrag des Ältesten",
            authors: ["Christopher Paolini"],
            publishedDate: "2019-01-21",
            industryIdentifiers: [
                {
                    type: "ISBN_10",
                    identifier: "3734162149",
                },
                {
                    type: "ISBN_13",
                    identifier: "9783734162145",
                },
            ],
            readingModes: {
                text: false,
                image: false,
            },
            pageCount: 800,
            printType: "BOOK",
            maturityRating: "NOT_MATURE",
            allowAnonLogging: false,
            contentVersion: "preview-1.0.0",
            panelizationSummary: {
                containsEpubBubbles: false,
                containsImageBubbles: false,
            },
            language: "de",
            previewLink:
                "http://books.google.de/books?id=FCPSvQEACAAJ&dq=isbn%3D9783734162145&hl=&cd=1&source=gbs_api",
            infoLink:
                "http://books.google.de/books?id=FCPSvQEACAAJ&dq=isbn%3D9783734162145&hl=&source=gbs_api",
            canonicalVolumeLink:
                "https://books.google.com/books/about/Eragon_Der_Auftrag_des_%C3%84ltesten.html?hl=&id=FCPSvQEACAAJ",
        },
        saleInfo: {
            country: "DE",
            saleability: "NOT_FOR_SALE",
            isEbook: false,
        },
        accessInfo: {
            country: "DE",
            viewability: "NO_PAGES",
            embeddable: false,
            publicDomain: false,
            textToSpeechPermission: "ALLOWED",
            epub: {
                isAvailable: false,
            },
            pdf: {
                isAvailable: false,
            },
            webReaderLink:
                "http://play.google.com/books/reader?id=FCPSvQEACAAJ&hl=&printsec=frontcover&source=gbs_api",
            accessViewStatus: "NONE",
            quoteSharingAllowed: false,
        },
    };

    bookInfoStructure = this.bookInfo;

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
        this.steps[id].step = true;

        if (index) this.activeStep = index;
    }

    cancel(): void {
        this.isbnInput = "";
        this.isAddBookDialogVisible = false;
    }

    mounted(): void {
        mainEventBus.$on("showAddBookDialog", () => {
            this.isAddBookDialogVisible = true;
            this.clearDialog();
        });
    }

    clearDialog(): void {
        this.isbnInput = "";
        this.activeStep = "first";
        this.steps = [
            {
                step: false,
            },
            {
                step: false,
            },
        ];
        this.bookInfo = this.bookInfoStructure;
    }
}
