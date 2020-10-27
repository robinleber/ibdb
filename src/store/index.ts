import Vue from "vue";
import Vuex, { Store } from "vuex";
import * as fb from "../firebase";
import router from "../router/index";
import { Message } from "element-ui";
import { mainEventBus } from "@/components/mainEventBus.ts";
import { email } from "vuelidate/lib/validators";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: () => ({
        userProfile: {
            displayName: "",
            displayImagePath: "",
            displayImageUrl: "",
            isDarkMode: false,
            hasDisplayImage: false,
        },
        books: [],
        coverUrls: [],
    }),
    mutations: {
        async setUserProfile(state, val) {
            state.userProfile.displayName = val.displayName;
            state.userProfile.isDarkMode = val.isDarkMode;

            state.userProfile.hasDisplayImage = val.displayImagePath !== "";

            if (state.userProfile.hasDisplayImage) {
                state.userProfile.displayImageUrl = await fb.STORAGE.ref()
                    .child(val.displayImagePath)
                    .getDownloadURL()
                    .then(url => url)
                    .catch(e => {
                        Message.error(
                            `Fehler! Profilbild konnte nicht hochgeladen werden`
                        );
                        console.error(
                            `Error while getting image from storage: ${e.message}`
                        );
                    });
            } else state.userProfile.displayImageUrl = "";
        },
        async setBooks(state, val) {
            state.books = val;

            for (let book of state.books) {
                // Get the download URL
                await fb.STORAGE.ref()
                    .child(book.cover)
                    .getDownloadURL()
                    .then((url: string) => {
                        state.coverUrls.push(url);
                    })
                    .catch(e =>
                        console.error(`Error getting coverUrl: ${e.message}`)
                    );
            }
        },
    },
    actions: {
        async signInWithGoogle({ dispatch }) {
            let provider = new fb._AUTH.GoogleAuthProvider();

            fb.AUTH.signInWithPopup(provider)
                .then(async result => {
                    // let token = result.credential.accessToken;
                    let user = result.user;
                    console.log(user);

                    let imageBlob = await fetch(user.photoURL).then(r =>
                        r.blob()
                    );
                    dispatch("addDisplayImage", imageBlob);
                    
                    // Check if user is signed in the first time
                    if (
                        user.metadata.creationTime ===
                        user.metadata.lastSignInTime
                    ) {
                        await fb.USERS_COLLECTION.doc(user!.uid)
                            .set({
                                displayName: user.displayName,
                                displayImagePath: `${user.uid}/displayImage`,
                                isDarkMode: false,
                            })
                            .catch(e => {
                                Message.error(
                                    "Fehler! Benutzer konnte nicht erstellt werden"
                                );
                                console.log(
                                    `Error while creating user in cloud firestore  - ${e.message}`
                                );
                            });
                    }
                })
                .catch(e => {
                    Message.error(
                        "Fehler! Benutzer konnte nicht über Google angemeldet werden"
                    );
                    console.log(`Error while signInWithGoogle - ${e.message}`);
                    fb.AUTH.signOut();
                });
        },

        async login({ dispatch }, form: any) {
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
                Message.error(
                    "Fehler! Benutzer konnte nicht eingeloggt werden"
                );
                console.error(`Error while loggin in user: ${e.message}`);
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

        async signUp({ dispatch }, data: any) {
            let { form, file } = data;
            console.log(data);

            try {
                // Create User
                const { user } = await fb.AUTH.createUserWithEmailAndPassword(
                    form.email,
                    form.pass
                );

                dispatch("addDisplayImage", file);

                // Add User to Database
                await fb.USERS_COLLECTION.doc(user.uid).set({
                    displayName: form.user,
                    displayImagePath: `${user.uid}/displayImage`,
                    isDarkMode: false,
                });

                // Success!
                Message.success("Account erfolgreich erstellt!");
                dispatch("fetchUserProfile", user);
            } catch (e) {
                mainEventBus.$emit("changeMainLoading", false, "");
                Message.error("Fehler! Benutzer konnte nicht erstellt werden");
                console.error(`Error while creating user: ${e.message}`);
            }
        },

        async fetchUserProfile({ commit }, user: any) {
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
                router.replace("Home");
        },

        async fetchBook({ dispatch }, isbn: string) {
            // Google Books Api - Authentication Key
            const AUTH_KEY = process.env.VUE_APP_GOOGLE_AUTH_KEY;
            let remoteBookUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn%3D${isbn}&key=${AUTH_KEY}`;

            await Vue.axios(remoteBookUrl)
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

            let remoteImageUrl = `https://www.buecherserien.de/wp-content/uploads/2009/04/Eragon_von_Christopher_Paolini.jpg`;
            let filename = `cover_pics/${isbn}.jpg`;
            // Download book cover and upload to firebase store
            await fetch(remoteImageUrl)
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

        async addDisplayImage({ dispatch }, file) {
            const user = fb.AUTH.currentUser;
            const ref = fb.STORAGE.ref();
            const metaData = { contentType: file.type };
            let fileName = `${user.uid}/displayImage`;

            ref.child(fileName)
                .put(file, metaData)
                .then(() => {
                    fb.USERS_COLLECTION.doc(user!.uid).update({
                        displayImagePath: fileName,
                    });
                    Message.success(
                        "Profilbild wurde erfolgreich aktualisiert"
                    );
                    dispatch("fetchUserProfile", user);
                })
                .catch(e => {
                    Message.error(
                        "Fehler! Profilbild konnte nicht hochgeladen werden"
                    );
                    console.error(
                        `Error while uploading image in storage: ${e.message}`
                    );
                });
        },

        async updateDisplayImage({ dispatch }, file) {
            const user = fb.AUTH.currentUser;
            const ref = fb.STORAGE.ref();
            const metaData = { contentType: file.type };
            let fileName = `${user.uid}/displayImage`;

            ref.child(fileName)
                .delete()
                .then(() => {
                    ref.child(fileName)
                        .put(file, metaData)
                        .then(() => {
                            fb.USERS_COLLECTION.doc(user!.uid).update({
                                displayImagePath: fileName,
                            });
                            Message.success(
                                "Profilbild wurde erfolgreich aktualisiert"
                            );
                            dispatch("fetchUserProfile", user);
                        })
                        .catch(e => {
                            Message.error(
                                "Fehler! Profilbild konnte nicht hochgeladen werden"
                            );
                            console.error(
                                `Error while updating image in storage: ${e.message}`
                            );
                        });
                })
                .catch(e => {
                    Message.error(
                        "Fehler! Altes Profilbild konnte nicht gelöscht werden"
                    );
                    console.error(
                        `Error while deleting image from storage: ${e.message}`
                    );
                });
        },

        async deleteDisplayImage({ dispatch }) {
            const user = fb.AUTH.currentUser;
            const ref = fb.STORAGE.ref();
            let fileName = `${user.uid}/displayImage`;
            ref.child(fileName)
                .delete()
                .then(async () => {
                    fb.USERS_COLLECTION.doc(user!.uid).update({
                        displayImagePath: "",
                    });
                    Message.success("Profilbild wurde erfolgreich gelöscht");
                    dispatch("fetchUserProfile", user);
                })
                .catch(e => {
                    Message.error(
                        "Fehler! Profilbild konnte nicht gelöscht werden"
                    );
                    console.error(
                        `Error while deleting image from storage: ${e.message}`
                    );
                });
        },

        async updateName({ dispatch }, displayName: string) {
            if (displayName !== this.state.userProfile.displayName) {
                const user = await fb.AUTH.currentUser;
                await fb.USERS_COLLECTION.doc(user!.uid)
                    .update({ displayName })
                    .then(() => {
                        Message.success("Name erfolgreich geändert!");
                        dispatch("fetchUserProfile", user);
                    })
                    .catch(e => {
                        Message.error(
                            "Fehler! Name konnte nicht geändert werden!"
                        );
                        console.error(`Error changing name: ${e.message}`);
                    });
            }
        },

        async updateEmail({ dispatch }, data: any) {
            const user = await fb.AUTH.currentUser;
            const { email, pass } = data;
            const credential = fb._AUTH.EmailAuthProvider.credential(
                user.email,
                pass
            );
            user.reauthenticateWithCredential(credential)
                .then(() => {
                    if (email !== user.email) {
                        user.updateEmail(email)
                            .then(() => {
                                Message.success(
                                    "E-Mail-Adresse erfolgreich geändert!"
                                );
                            })
                            .catch(e => {
                                Message.error(
                                    "Fehler! E-Mail-Adresse konnte nicht geändert werden!"
                                );
                                console.error(
                                    `Error changing email: ${e.message}`
                                );
                            });
                    }
                })
                .catch(e => {
                    Message.error(
                        "Fehler! Benutzer konnte nicht re-authentifiziert werden!"
                    );
                    console.error(`error re-authenticating user: ${e.message}`);
                });
            dispatch("fetchUserProfile", user);
        },

        async updatePassword({ commit }, password: any) {
            const user = await fb.AUTH.currentUser;
            const { oldPass, newPass } = password;
            const credential = fb._AUTH.EmailAuthProvider.credential(
                user.email,
                oldPass
            );
            user.reauthenticateWithCredential(credential)
                .then(() => {
                    user.updatePassword(newPass)
                        .then(() => {
                            Message.success("Passwort erfolgreich geändert!");
                        })
                        .catch(e => {
                            Message.error(
                                "Fehler! Passwort konnte nicht geändert werden!"
                            );
                            console.error(
                                `error changing password: ${e.message}`
                            );
                        });
                })
                .catch(e => {
                    Message.error(
                        "Fehler! Benutzer konnte nicht re-authentifiziert werden!"
                    );
                    console.error(`error re-authenticating user: ${e.message}`);
                });
        },

        async switchDarkMode({ dispatch }, isDarkMode: boolean) {
            const user = await fb.AUTH.currentUser;
            await fb.USERS_COLLECTION.doc(user!.uid).update({
                isDarkMode: isDarkMode,
            });
            dispatch("fetchUserProfile", user);
        },
    },
    modules: {},
    getters: {},
});

export default store;
