import { Component, Vue } from "vue-property-decorator";
import AddBookDialog from "@/components/AddBookDialog/AddBookDialog.vue";

@Component({
    components: {
        AddBookDialog
    }
})

export default class Books extends Vue {
    readonly AUTH_KEY = "AIzaSyBgOAglMk-N5JQWU6BYRuo5GpyXZKOSRD8";

    isbnList = [
        "9783734162121",
        "9783734162145",
        "9783734162169",
        "9783734162190",
        "9781983699740",
        "9783551583932",
        "9783551583406",
        "9783551583413",
        "9783551583420",
        "9783551583949"
    ];

    bookList = [
        {
            "kind": "books#volume",
            "id": "Xqc5DwAAQBAJ",
            "etag": "Zme9l0UpilE",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/Xqc5DwAAQBAJ",
            "volumeInfo": {
                "title": "Über den wilden Fluss",
                "authors": [
                    "Philip Pullman"
                ],
                "publishedDate": "2017-11-17",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9783551583932"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "3551583935"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 560,
                "printType": "BOOK",
                "categories": [
                    "Juvenile Fiction"
                ],
                "averageRating": 4,
                "ratingsCount": 2,
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=Xqc5DwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=Xqc5DwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "de",
                "previewLink": "http://books.google.de/books?id=Xqc5DwAAQBAJ&dq=isbn%3D9783551583932&hl=&cd=1&source=gbs_api",
                "infoLink": "http://books.google.de/books?id=Xqc5DwAAQBAJ&dq=isbn%3D9783551583932&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/%C3%9Cber_den_wilden_Fluss.html?hl=&id=Xqc5DwAAQBAJ"
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
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=Xqc5DwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "Der 11-jährige Malcolm lebt mit seinen Eltern und seinem Dæmon Asta in Oxford und geht in dem Kloster auf der anderen Seite der Themse aus und ein."
            }
        }
    ];

    sortSelected = "";
    sort(value: string): void {
        this.sortSelected = value;
    }

    filter = [];

    getBook() {
        this.bookList = [];
        for (const isbn of this.isbnList)
            Vue.axios
                .get(`https://www.googleapis.com/books/v1/volumes?q=isbn%3D${isbn}&key=${this.AUTH_KEY}`)
                .then(async response => {
                    this.bookList.push(await response.data.items[0])
                    console.log(this.bookList)
                })
                .catch((e) =>
                    console.log(e.message));
    }

    beforeMount() {
        this.getBook();
    }

    addBookDialogVisible = false;

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

    getProgress(pages: number, atPage: number) {
        return Math.round((100 / pages) * atPage);
    }

    getAuthors(authors: [string]) {
        let authorsString = authors[0];
        for (let i = 1; i < authors.length; i++) {
            authorsString += ", " + authors[i];
        }
        return authorsString;
    }

    getGenreColor(genre: string) {
        switch (genre) {
            case "Fantasy": return "#67c23a";
            case "Science Fiction": return "#ff5252";
            case "Philosophie": return "#196fa3";
            case "Jugendliteratur": return "#f27405";
            case "Abenteuer": return "#51c07c";
            case "Action": return "#cf2217";
            case "Steampunk": return "#6e5644";
        }
    }
}