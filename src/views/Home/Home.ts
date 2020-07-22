import { Component, Vue } from "vue-property-decorator";

@Component

export default class App extends Vue {
    username = "Robin"

    navBar = {
        search: ""
    };
}