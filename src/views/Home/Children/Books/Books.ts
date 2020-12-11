/* eslint-disable */
import { Component, Vue, Watch } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";
import { required, between } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import * as fb from "@/firebase";
import store from "@/store";

// custom validation
const isbnFormat = (value, vm) => value.length === 10 || value.length === 13;

@Component({
    validations: {
        isbn: {
            input: {
                required,
                isbnFormat,
            },
        },
    },
    computed: {
        ...mapState(["userProfile", "books", "coverUrls"]),
    },
})
export default class Books extends Vue {
    //
    // ▼ DATA ▼
    //

    public isLoading = false;

    // MapState variables
    public userProfile!: any;
    public books!: any;

    // Filter
    public searchInput = "";
    public filters = [
        {
            label: "Genre",
            value: [""],
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
            value: [""],
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
            value: [""],
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
            label: "Min. Seiten",
            value: "",
        },
        {
            label: "Max. Seiten",
            value: "",
        },
        {
            label: "Franchise",
            value: [""],
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
    public clearFilters = this.filters;

    // Function Bar
    public isbn = { input: "" };
    public isIsbnInput = false;
    public readingState = "read";
    public sortConditions = [
        { value: "title", label: "Titel" },
        { value: "author", label: "Autor" },
        { value: "pages", label: "Seiten" },
        { value: "published", label: "Veröffentlichung" },
        { value: "added", label: "Buch hinzugefügt" },
    ];
    public sortSelected = "added";
    public sort(value: string): void {
        this.sortSelected = value;
    }

    // temporary, remove when no longer needed
    public isbnList = [
        "9783734162121",
        "9783734162145",
        "9783734162169",
        "9783734162190",
        "3551551677",
        "3551354022",
        "3551551693",
        "3551551936",
        "9783551354051",
        "9783551354068",
        "9783551354075",
        "9781983699748",
        "1983699748",
        "9783608939811",
        "9783608939828",
        "9783608939835",
        // asdf
        "9783734162121",
        "9783734162145",
        "9783734162169",
        "9783734162190",
        "3551551677",
        "3551354022",
        "3551551693",
        "3551551936",
        "9783551354051",
        "9783551354068",
        "9783551354075",
        "9781983699748",
        "1983699748",
        "9783608939811",
        "9783608939828",
        "9783608939835",
        "9783734162121",
        "9783734162145",
        "9783734162169",
        "9783734162190",
        "3551551677",
        "3551354022",
        "3551551693",
        "3551551936",
        "9783551354051",
        "9783551354068",
        "9783551354075",
        "9781983699748",
        "1983699748",
        "9783608939811",
        "9783608939828",
        "9783608939835",
        "9783734162121",
        "9783734162145",
        "9783734162169",
        "9783734162190",
        "3551551677",
        "3551354022",
        "3551551693",
        "3551551936",
        "9783551354051",
        "9783551354068",
        "9783551354075",
        "9781983699748",
        "1983699748",
        "9783608939811",
        "9783608939828",
        "9783608939835",
        "9783734162121",
        "9783734162145",
        "9783734162169",
        "9783734162190",
        "3551551677",
        "3551354022",
        "3551551693",
        "3551551936",
        "9783551354051",
        "9783551354068",
        "9783551354075",
        "9781983699748",
        "1983699748",
        "9783608939811",
        "9783608939828",
        "9783608939835",
        "9783734162121",
        "9783734162145",
        "9783734162169",
        "9783734162190",
        "3551551677",
        "3551354022",
        "3551551693",
        "3551551936",
        "9783551354051",
        "9783551354068",
        "9783551354075",
        "9781983699748",
        "1983699748",
        "9783608939811",
        "9783608939828",
        "9783608939835",
    ];

    $refs: {
        isbnInput: any;
    };

    //
    // ▼ GETTERS ▼
    //

    public get isFilter(): boolean {
        if (this.searchInput) return true;
        for (let filter of this.filters) if (filter.value.length > 1) return true;
        return false;
    }

    //
    // ▼ METHODS ▼
    //

    public showAddBook(): void {
        this.isIsbnInput = true;
        this.$nextTick(() => {
            this.$refs.isbnInput.$el.focus();
        });
    }

    public cancelAddBook(): void {
        this.isIsbnInput = false;
        this.isbn.input = "";
        this.$v.isbn.input.$reset();
    }

    public addBook(): void {
        this.$v.isbn.input.$touch();
        if (!this.$v.isbn.input.$invalid) store.dispatch("fetchBook", this.isbn.input);
    }

    public getValidationClass(fieldName: string): any {
        const field = this.$v[fieldName];
        if (field) return { "md-invalid": field.$invalid && field.$dirty };
    }

    public getPages(id: string): number {
        if (id) {
            return this.books.find(x => x.id === id).data.volumeInfo.pageCount;
        }
    }

    public getProgress(id: string, progress: number): number {
        let pages = this.getPages(id);
        if (this.books) return Math.round((100 / pages) * progress);
    }

    public getAuthors(authors: [string]): string {
        let authorsString = authors[0];
        for (let i = 1; i < authors.length; i++) authorsString += ", " + authors[i];
        return authorsString;
    }

    public getGenreColor(genre: string): string {
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

    public showAddBookDialog(): void {
        mainEventBus.$emit("showAddBookDialog");
    }

    public validateInput(input: string): void {
        const minValue = parseInt(this.filters[3].value[0]);
        const maxValue = parseInt(this.filters[4].value[0]);

        switch (input) {
            case "minValue":
                this.filters[3].value = this.filters[3].value[0].replace(/[\D]/g, "");

                if (minValue > maxValue && minValue > 0)
                    this.filters[4].value = this.filters[3].value[0];
            case "maxValue":
                this.filters[4].value = this.filters[4].value[0].replace(/[\D]/g, "");
        }
    }

    public checkBookLength(): void {
        const minValue = parseInt(this.filters[3][0].value);
        const maxValue = parseInt(this.filters[4][0].value);
        if (minValue > maxValue && minValue != 0)
            this.filters[4][0].value = this.filters[3][0].value;
    }

    public resetFilter(): void {
        for (let filter of this.filters) {
            filter.value = "";
        }
        this.searchInput = "";
    }

    //
    // ▼ LIFECYCLE HOOKS ▼
    //

    public beforeMount(): void {
        document.title = "IBDb: Bibliothek";

        if (this.books) {
            console.log(this.books.data());
            for (let book of this.books) {
                book.showBookModal = false;
            }
        }
    }
}
