import { Component, Vue } from "vue-property-decorator";

@Component

export default class Books extends Vue {
    bookList = [
        {
            name: "Christopher Paolini",
            dob: "17. November 1983",
            pob: "Los Angeles, CA, Vereinigte Staaten",
            books: ["Eragon - "],
            img: "https://www.buchwelt.de/wp-content/uploads/2012/10/christopher-paolini-e1348577248786.jpg"
        }
    ];

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
            case "Science Fiction": return "#148ddf";
            case "Philosophie": return "#f56c6c";
            case "Jugendliteratur": return "#f27405";
            case "Abenteuer": return "#51c07c";
            case "Action": return "#cf2217";
            case "Steampunk": return "#6e5644";
        }
    }
}