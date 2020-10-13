import Vue from "vue";
import Vuex, { Store } from "vuex";
import * as fb from "../firebase";
import router from "../router/index";
import { Message } from "element-ui";
import { mainEventBus } from "@/components/mainEventBus.ts";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userProfile: {
            name: "",
            displayImagePath: "",
        },
        books: [],
    },
    mutations: {
        async setUserProfile(state, val) {
            state.userProfile.name = val.name;
            state.userProfile.displayImagePath = await fb.STORAGE.ref()
                .child(val.displayImagePath)
                .getDownloadURL()
                .then(url => url)
                .catch(e =>
                    Message.error(`Error loading profile image: ${e.message}`)
                );
        },
        setBooks(state, val) {
            state.books = val;
        },
    },
    actions: {
        async login({ dispatch }, form) {
            // Set Authentication State Persistance
            const AUTH_PERSISTENCE = form.remainLoggedIn
                ? fb._AUTH.Auth.Persistence.SESSION
                : fb._AUTH.Auth.Persistence.LOCAL;

            try {
                await fb.AUTH.setPersistence(AUTH_PERSISTENCE);
                const { user } = await fb.AUTH.signInWithEmailAndPassword(
                    form.email,
                    form.pass
                );
                dispatch("fetchUserProfile", user);
            } catch (e) {
                mainEventBus.$emit("enableLoginButton", false);
                mainEventBus.$emit("changeMainLoading", false, "");
                Message.error(`Error: ${e.message}`);
            }
        },

        async logout() {
            mainEventBus.$emit("changeMainLoading", true, "Auf Wiedersehen!");
            fb.AUTH.signOut()
                .then(() => {
                    router.replace("Login");
                    mainEventBus.$emit("changeMainLoading", false, "");
                })
                .catch(e => console.error(`${e.code} - ${e.message}`));
        },

        async signUp({ dispatch }, data) {
            let form = data[0],
                file = data[1];

            try {
                // Create User
                const { user } = await fb.AUTH.createUserWithEmailAndPassword(
                    form.email,
                    form.pass
                );

                // Upload Profile Image to Storage
                const ref = fb.STORAGE.ref();
                const metaData = { contentType: file.type };
                let fileName = `${user.uid}/displayImage`;
                ref.child(fileName).put(file, metaData);

                // Add User to Database
                await fb.USERS_COLLECTION.doc(user!.uid).set({
                    name: form.user,
                    displayImagePath: fileName,
                });

                // Success!
                Message.success("Account erfolgreich erstellt!");
                dispatch("fetchUserProfile", user);
            } catch (e) {
                mainEventBus.$emit("changeMainLoading", false, "");
                Message.error(e.message);
            }
        },

        async fetchUserProfile({ commit }, user) {
            const USER_PROFILE = await fb.USERS_COLLECTION.doc(user.uid).get();
            commit("setUserProfile", USER_PROFILE.data());

            fb.BOOKS_COLLECTION.orderBy("addedOn", "desc").onSnapshot(
                snapshot => {
                    const BOOKS_ARRAY = [];

                    snapshot.forEach(doc => {
                        const BOOK = doc.data();
                        BOOK.id = doc.id;
                        BOOKS_ARRAY.push(BOOK);
                    });
                    store.commit("setBooks", BOOKS_ARRAY);
                }
            );

            if (
                router.currentRoute.path === "/Login" ||
                router.currentRoute.path === "/SignUp"
            )
                router.replace("/Home");
        },

        async fetchBook({ dispatch }, isbn) {
            // Google Books Api - Authentication Key
            const AUTH_KEY = process.env.VUE_APP_GOOGLE_AUTH_KEY;

            await Vue.axios(
                `https://www.googleapis.com/books/v1/volumes?q=isbn%3D${isbn}&key=${AUTH_KEY}`
            )
                .then(response => {
                    // Add book to bookList
                    const BOOKS = response.data.items;

                    for (const BOOK of BOOKS) {
                        if (
                            isbn ===
                                BOOK.volumeInfo.industryIdentifiers[0]
                                    .identifier ||
                            isbn ===
                                BOOK.volumeInfo.industryIdentifiers[1]
                                    .identifier
                        ) {
                            dispatch("addBook", [BOOK, isbn]);
                            break;
                        }
                    }
                })
                .catch(e => console.error(`Error: ${e.message}`));
        },

        async addBook({ commit }, dataArray: [object, string]) {
            const book = dataArray[0],
                isbn = dataArray[1];

            let remoteimageurl = `https://www.buecherserien.de/wp-content/uploads/2009/04/Eragon_von_Christopher_Paolini.jpg`;
            let filename = `cover_pics/${isbn}.jpg`;
            // Download book cover and upload to firebase store
            await fetch(remoteimageurl)
                .then(response => {
                    return response.blob();
                })
                .then(blob => {
                    fb.STORAGE.ref()
                        .child(filename)
                        .put(blob)
                        .then(function(snapshot) {
                            return snapshot.ref.getDownloadURL();
                        })
                        .catch(e =>
                            console.error(
                                `Error uploading coverImage: ${e.message}`
                            )
                        );
                })
                .catch(e =>
                    console.error(`Error getting coverImage: ${e.message}`)
                );
            // Add book and cover-url to book collection
            fb.BOOKS_COLLECTION.add({
                data: book,
                addedOn: new Date(),
                cover: filename,
            });
        },
    },
    modules: {},
});

export default store;
