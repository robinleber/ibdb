/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";

@Component

export default class Login extends Vue {
    isLoading = false;
    isRegister = false;
    rememberMe = false;

    signIn = {
        email: "",
        pass: "",
        rememberMe: false,
        remainLoggedIn: false
    };

    signUp = {
        user: "",
        email: "",
        pass: "",
        passRepeat: ""
    };
}