/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";

@Component
export default class Dashbaord extends Vue {
    bookCount: string = this.getBookCount(244);
    pagesRead = "132.440";
    booksRead = this.getBookCount(239);

    getBookCount(count: number): string {
        let stringCount = `${count}`;

        while (stringCount.length < 4) {
            stringCount = `0${stringCount}`;
        }

        return stringCount;
    }

    animateBookCounter() {
        const tempCount = parseInt(this.bookCount);
        this.bookCount = "0000";

        for (let i = 0; i <= tempCount; i++) {
            setTimeout(() => {
                this.bookCount = this.getBookCount(i);
            }, 100);
        }
    }
}
