import { Component, Vue } from "vue-property-decorator";

@Component

export default class Home extends Vue {
    username = "Robin"

    navBar = {
        search: ""
    };
}