
import { Component, Vue } from "vue-property-decorator";

@Component

export default class App extends Vue {
    isLoading = false;

    signIn = {
        user: "",
        pass: ""
    };

    signUp = {
        user: "",
        pass: "",
        passRepeat: ""
    };
}