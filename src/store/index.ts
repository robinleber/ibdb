import Vue from "vue";
import Vuex, { Store } from "vuex";
import * as fb from "../firebase";
import router from "../router/index";
import { Message } from "element-ui";
import { mainEventBus } from "@/components/mainEventBus.ts";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userProfile: {},
        books: [],
    },
    mutations: {
        setBooks(state, val) {
            state.books = val;
        },
        setUserProfile(state, val) {
            state.userProfile = val;
        },
    },
    actions: {
        async login({ dispatch }, form) {
            // Set Authentication State Persistance
            const AUTH_PERSISTENCE = form.remainLoggedIn
                ? fb.AUTH.Auth.Persistence.SESSION
                : fb.AUTH.Auth.Persistence.LOCAL;

            try {
                await fb.AUTH().setPersistence(AUTH_PERSISTENCE);
                const { user } = await fb
                    .AUTH()
                    .signInWithEmailAndPassword(form.email, form.pass);
                dispatch("fetchUserProfile", user);
            } catch (e) {
                Message.error(`Error: ${e.message}`);
                mainEventBus.$emit("changeMainLoading", false, "");
                mainEventBus.$emit("enableLoginButton", false);
            }
        },

        // async signUp({ dispatch }, form) {

        //     fb
        //     .AUTH()
        //     .createUserWithEmailAndPassword(
        //         form.email,
        //         form.pass
        //     )
        //     // When user-account-creation was successfull
        //     .then(() => {
        //         // Update username
        //         fb
        //             .AUTH()
        //             .currentUser?.updateProfile({
        //                 displayName: "this.profile.user",
        //             })
        //             // When username-update was successfull
        //             .then(() => {
        //                 // Upload image to fb-storage

        //                 // Create storage reference
        //                 const ref = fb.STORAGE.ref();

        //                 // Get metadata
        //                 const metaData = {
        //                     contentType: this.imageFile.type,
        //                 };

        //                 // Set imageName => userUID _ userNAME
        //                 this.imageName = `${
        //                     fb.AUTH().currentUser.uid
        //                 }_${fb
        //                     .AUTH()
        //                     .currentUser.displayName.toLowerCase()}`;

        //                 // Upload image to "profileImages"
        //                 ref.child(
        //                     `profileImages/${this.imageName}`
        //                 ).put(this.imageFile, metaData);

        //                 // Hide loading screen
        //                 mainEventBus.$emit(
        //                     "changeMainLoading",
        //                     false,
        //                     ""
        //                 );

        //                 // Show success message
        //                 Message.success(
        //                     `Account erfolgreich erstellt. Herzlich Willkommen!`
        //                 );

        //                 // Go to home
        //                 this.$router.replace("Home");
        //             })
        //             // When username-update was unsuccessfull
        //             .catch((e: any) => {
        //                 // Hide loading screen
        //                 mainEventBus.$emit(
        //                     "changeMainLoading",
        //                     false,
        //                     ""
        //                 );
        //                 this.isSignUpDisabled = false;

        //                 // Show error message
        //                 Message.error(`Error: ${e.message}`);
        //             });
        //     })
        //     // When user-account-creation was unsuccessfull
        //     .catch((e: any) => {
        //         // Hide loading-screen
        //         mainEventBus.$emit("changeMainLoading", false, "");
        //         this.isSignUpDisabled = false;

        //         // Go to first step
        //         this.steps[0].step = false;
        //         this.activeStep = "first";

        //         // Show error message
        //         Message.error(`Error: ${e.message}`);
        //         this.firstStepError = "Fehler!";
        //     });

        //     try {
        //         const { user } = await fb.AUTH().createUserWithEmailAndPassword(form.email, form.pass);
        //         await fb.USERS_COLLECTION.doc(user!.uid).set({
        //             name: profile.name
        //         });
        //         dispatch("fetchUserProfile", user);
        //     } catch (e) {

        //     }
        // },

        async fetchUserProfile({ commit }, user) {
            const USER_PROFILE = await fb.USERS_COLLECTION.doc(user.uid).get();

            commit("setUserProfile", USER_PROFILE.data());

            fb.BOOKS_COLLECTION.orderBy("addedOn", "desc").onSnapshot(
                snapshot => {
                    const BOOKS_ARRAY: any = [];

                    snapshot.forEach(doc => {
                        const BOOK = doc.data();
                        BOOK.id = doc.id;

                        BOOKS_ARRAY.push(BOOK);
                    });

                    store.commit("setBooks", BOOKS_ARRAY);
                }
            );

            if (
                router.currentRoute.path == "/Login" ||
                router.currentRoute.path == "/SignUp"
            )   router.replace("/Home");
        },
    },
    modules: {},
});

export default store;
