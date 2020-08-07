/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import AddBookDialog from "@/components/AddBookDialog/AddBookDialog.vue";
import { mainEventBus } from "@/components/mainEventBus.ts";

@Component({
    components: {
        AddBookDialog
    }
})

export default class Books extends Vue {
    // Google API Authentification Key
    readonly AUTH_KEY = "AIzaSyBgOAglMk-N5JQWU6BYRuo5GpyXZKOSRD8";

    isbnList: [string] | undefined;

    // Set Booklist array structure
    bookList = [
        {
            "kind": "books#volume",
            "id": "FCPSvQEACAAJ",
            "etag": "I8t98GatYmk",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/FCPSvQEACAAJ",
            "volumeInfo": {
                "title": "Eragon - Der Auftrag des Ältesten",
                "authors": ["Christopher Paolini"],
                "publishedDate": "2019-01-21",
                "industryIdentifiers": [{
                    "type": "ISBN_10",
                    "identifier": "3734162149"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9783734162145"
                }],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 800,
                "printType": "BOOK",
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "language": "de",
                "previewLink": "http://books.google.de/books?id=FCPSvQEACAAJ&dq=isbn%3D9783734162145&hl=&cd=1&source=gbs_api",
                "infoLink": "http://books.google.de/books?id=FCPSvQEACAAJ&dq=isbn%3D9783734162145&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Eragon_Der_Auftrag_des_%C3%84ltesten.html?hl=&id=FCPSvQEACAAJ"
            },
            "saleInfo": {
                "country": "DE",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "DE",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission":
                    "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=FCPSvQEACAAJ&hl=&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            }
        }];

    // List of selected sorting conditions
    sortSelected = "";
    sort(value: string): void {
        this.sortSelected = value;
    }

    filters = [
        {
            label: "Genre",
            type: "check",
            options: [
                {
                    value: false,
                    label: "Fantasy",
                },
                {
                    value: false,
                    label: "Science Fiction",
                }
            ]
        },
        {
            label: "Autor",
            type: "check",
            options: [
                {
                    value: false,
                    label: "Christopher Paolini",
                },
                {
                    value: false,
                    label: "Philip Pullman",
                }
            ]
        },
        {
            label: "Seitenzahl",
            type: "input",
            options: [
                {
                    value: "",
                    label: "MIN",
                },
                {
                    value: "",
                    label: "MAX",
                }
            ]
        }
    ]

    async getBook() {
        // Show loading screen
        mainEventBus.$emit("changeMainLoading", true, "Lade Bibliothek");

        // Clear Booklist while keeping array structure
        this.bookList = [];

        // Check if isbnList is empty
        if (this.isbnList) {
            // Fetch Book data for every ISBN in isbnList
            for (const ISBN of this.isbnList) {
                await Vue.axios(`https://www.googleapis.com/books/v1/volumes?q=isbn%3D${ISBN}&key=${this.AUTH_KEY}`)
                    .then(response => {
                        // Add book to bookList
                        this.bookList.push(response.data.items[0].volumeInfo)
                        // Log response status
                        console.info(response.data.status)
                    })
                    .catch(e => console.error(console.trace(e)));
            }
        }

        // Hide loading screen
        mainEventBus.$emit("changeMainLoading", false, "");
    }

    beforeMount(): void {
        this.getBook();
    }


    getProgress(pages: number, atPage: number): number {
        return Math.round((100 / pages) * atPage);
    }

    getAuthors(authors: [string]): string {
        let authorsString = authors[0];
        for (let i = 1; i < authors.length; i++) {
            authorsString += ", " + authors[i];
        }
        return authorsString;
    }

    getGenreColor(genre: string): string {
        switch (genre) {
            case "Fantasy": return "#67c23a";
            case "Science Fiction": return "#ff5252";
            case "Philosophie": return "#196fa3";
            case "Jugendliteratur": return "#f27405";
            case "Abenteuer": return "#51c07c";
            case "Action": return "#cf2217";
            case "Steampunk": return "#6e5644";
            default: return "#286aab";
        }
    }

    showAddBookDialog(): void {
        mainEventBus.$emit("showAddBookDialog");
    }
}