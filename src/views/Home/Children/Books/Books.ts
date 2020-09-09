/* eslint-disable */
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import AddBookDialog from "@/components/AddBookDialog/AddBookDialog.vue";
import { mainEventBus } from "@/components/mainEventBus.ts";
import { validationMixin } from "vuelidate";
import { between } from "vuelidate/lib/validators";

@Component({
    components: {
        AddBookDialog,
    },
})
export default class Books extends Vue {
    isLoading = false;

    // Google API Authentification Key
    readonly AUTH_KEY = "AIzaSyBgOAglMk-N5JQWU6BYRuo5GpyXZKOSRD8";

    isbnList = [
        "9783734162121",
        "9783734162145",
        "9783734162169",
        // "9783734162190",
        // "3551551677",
        // "3551354022",
        // "3551551693",
        // "3551551936",
        // "9783551354051",
        // "9783551354068",
        // "9783551354075",
        // "9781983699748",
        // "1983699748",
        // "9783608939811",
        // "9783608939828",
        // "9783608939835",
    ];

    bookList: any | null;

    // List of selected sorting conditions
    sortSelected = "added";
    sort(value: string): void {
        this.sortSelected = value;
    }

    filter = "";
    filters = [
        {
            label: "Genre",
            value: "",
            children: [
                {
                    label: "Action",
                },
                {
                    label: "Fantasy",
                },
                {
                    label: "Novel",
                },
            ],
        },
        {
            label: "Autor",
            value: "",
            children: [
                {
                    label: "Christopher Paolini",
                },
                {
                    label: "Joanne K. Rowling",
                },
                {
                    label: "J. R. R. Tolkien",
                },
                {
                    label: "exurb1a",
                },
            ],
        },
        {
            label: "Verlag",
            value: "",
            children: [
                {
                    label: "Cosmia Press",
                },
                {
                    label: "Carlsen",
                },
                {
                    label: "Klett Cotta",
                },
                {
                    label: "cbj-Verlag",
                },
            ],
        },
        {
            label: "Länge",
            maxValue: "",
            minValue: "",
        },
        {
            label: "Franchise",
            value: "",
            children: [
                {
                    label: "Tolkien's Welt",
                },
                {
                    label: "Harry Potter",
                },
                {
                    label: "Eragon",
                },
                {
                    label: "His dark Materials",
                },
            ],
        },
    ];

    clearFilters = this.filters;

    async getBook() {
        // Show loading screen
        this.isLoading = true;

        // Clear Booklist while keeping array structure
        this.bookList = [];

        // Check if isbnList is empty
        if (this.isbnList) {
            // Fetch Book data for every ISBN in isbnList
            for (const ISBN of this.isbnList) {
                await Vue.axios(
                    `https://www.googleapis.com/books/v1/volumes?q=isbn%3D${ISBN}&key=${this.AUTH_KEY}`
                )
                    .then((response) => {
                        // Add book to bookList
                        this.bookList.push(response.data.items[0].volumeInfo);
                    })
                    .catch((e) => console.error(`Error: ${e.message}`));
            }
        }

        // Hide loading screen
        this.isLoading = false;
    }

    getProgress(pages: number, atPage: number): number {
        return Math.round((100 / pages) * atPage);
    }

    getAuthors(authors: [string]): string {
        let authorsString = authors[0];
        for (let i = 1; i < authors.length; i++)
            authorsString += ", " + authors[i];
        return authorsString;
    }

    getGenreColor(genre: string): string {
        switch (genre) {
            case "Fantasy":
                return "#67c23a";
            case "Science Fiction":
                return "#ff5252";
            case "Philosophie":
                return "#196fa3";
            case "Jugendliteratur":
                return "#f27405";
            case "Abenteuer":
                return "#51c07c";
            case "Action":
                return "#cf2217";
            case "Steampunk":
                return "#6e5644";
            default:
                return "#286aab";
        }
    }

    showAddBookDialog(): void {
        mainEventBus.$emit("showAddBookDialog");
    }

    $refs!: {
        inputRef: HTMLInputElement;
    };

    validateInput(input: string): void {
        const minValue = parseInt(this.filters[3].minValue);
        const maxValue = parseInt(this.filters[3].maxValue);

        switch (input) {
            case "minValue":
                this.filters[3].minValue = this.filters[3].minValue.replace(
                    /[\D]/g,
                    (u) => u.replace(u, "")
                );

                if (minValue > maxValue && minValue != 0)
                    this.filters[3].maxValue = this.filters[3].minValue;
            case "maxValue":
                this.filters[3].maxValue = this.filters[3].maxValue.replace(
                    /[\D]/g,
                    (u) => u.replace(u, "")
                );
        }
    }

    checkBookLength(): void {
        const minValue = parseInt(this.filters[3].minValue);
        const maxValue = parseInt(this.filters[3].maxValue);
        if (minValue > maxValue && minValue != 0)
            this.filters[3].maxValue = this.filters[3].minValue;
    }

    resetFilter(): void {
        this.filters = this.clearFilters;
    }

    beforeMount(): void {
        this.getBook();
    }
}
