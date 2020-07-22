import { Component, Vue } from "vue-property-decorator";

@Component

export default class App extends Vue {
    bookList = [
        {
            isbn: "978-0-3758-2670-2",
            title: "Eragon - Das Vermächtnis der Drachenreiter",
            summary: "Der Wind heulte durch die Nacht und trug einen Duft heran, der die Welt verändern sollte ... Als Eragon auf der Jagd einen glänzenden blauen Stein findet, ahnt er nicht, dass dieser Fund sein Leben verändern wird.Doch plötzlich rührt sich der Stein.Feine Risse zeichnen sich auf seiner Oberfläche ab - ein Drachenjunges entschlüpft der Schale und es beschert Eragon ein Vermächtnis, das älter ist als die Welt ...",
            authors: ["Christopher Paolini"],
            partOf: "Inheritance Cycle",
            coverSrc: "https://www.randomhouse.de/content/edition/covervoila_hires/Paolini_CEragon_1Das_Vermaechtnis_der_194473.jpg",
            pages: 736,
            atPage: 736
        },
        {
            isbn: "978-0-3758-2670-2",
            title: "Eragon - Der Auftrag des Ältesten",
            summary: "After successfully evading an Urgals ambush, Eragon is adopted into the Ingeitum clan and sent to finish his training so he can further help the Varden in their struggle against the Empire.",
            authors: ["Christopher Paolini"],
            partOf: "Inheritance Cycle",
            coverSrc: "https://m.media-amazon.com/images/I/51bQGq+OJ7L.jpg",
            pages: 864,
            atPage: 864
        },
        {
            isbn: "978-0-3758-2670-2",
            title: "Eragon - Die Weisheit des Feuers",
            summary: "After successfully evading an Urgals ambush, Eragon is adopted into the Ingeitum clan and sent to finish his training so he can further help the Varden in their struggle against the Empire.",
            authors: ["Christopher Paolini"],
            partOf: "Inheritance Cycle",
            coverSrc: "https://m.media-amazon.com/images/I/51B2aXHKiZL.jpg",
            pages: 861,
            atPage: 861
        },
        {
            isbn: "978-0-3758-2670-2",
            title: "Eragon - Das Erbe der Macht",
            summary: "Inheritance starts when the Varden attack Belatona, a city of the Empire. In the battle, Saphira, Eragon's dragon, is nearly killed by a Dauthdaert (death spear) called Niernen —a spear from the Dragon Wars intended to destroy magical wards and kill dragons.",
            authors: ["Christopher Paolini"],
            partOf: "Inheritance Cycle",
            coverSrc: "https://m.media-amazon.com/images/I/51feKxk5vEL.jpg",
            pages: 986,
            atPage: 986
        },
        {
            isbn: "",
            title: "The Prince of Milk",
            summary: "",
            authors: ["exurb1a"],
            partOf: "The Prince of Milk",
            coverSrc: "http://covers.openlibrary.org/b/isbn/9781983699740-L.jpg",
            pages: 351,
            atPage: 78
        }
    ];

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
}