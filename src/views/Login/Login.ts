/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { mainEventBus } from "@/components/mainEventBus.ts";

@Component
export default class Login extends Vue {
    isLoading = false;
    isRegister = false;
    rememberMe = false;
    stayLoggedIn = false;

    signIn = {
        email: "",
        pass: "",
        rememberMe: false,
        remainLoggedIn: false,
    };

    signUp = {
        user: "",
        email: "",
        pass: "",
        passRepeat: "",
    };

    login(): void {
        mainEventBus.$emit("changeMainLoading", true, "Anmelden...");
        this.$router.push('home');
    }

    register(): void {
    }

    resetPas(): void {
        
    }
}
