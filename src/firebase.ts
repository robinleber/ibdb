import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Configure firebase connection
const FIREBASE_CONFIG = {
    apiKey: `${process.env.VUE_APP_FIREBASE_API_KEY}`,
    authDomain: "ibdb-a3662.firebaseapp.com",
    databaseURL: "https://ibdb-a3662.firebaseio.com",
    projectId: "ibdb-a3662",
    storageBucket: "ibdb-a3662.appspot.com",
    messagingSenderId: "749530552418",
    appId: "1:749530552418:web:6f474f640c61129253593b",
};
firebase.initializeApp(FIREBASE_CONFIG);

// Utilities
const AUTH = firebase.auth();
const DB = firebase.firestore();
const STORAGE = firebase.storage();
const _AUTH = firebase.auth;

// Collection references
const AUTHORS_COLLECTION = DB.collection("authos");
const BOOKS_COLLECTION = DB.collection("books");
const COVERS_COLLECTIONS = DB.collection("covers");
const FAVORITES_COLLECTION = DB.collection("favorites");
const USERS_COLLECTION = DB.collection("users");

// export utils/refs
export {
    AUTH,
    AUTHORS_COLLECTION,
    BOOKS_COLLECTION,
    COVERS_COLLECTIONS,
    DB,
    FAVORITES_COLLECTION,
    STORAGE,
    USERS_COLLECTION,
    _AUTH,
};
