import { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    query,
    where,
    deleteDoc
} from 'firebase/firestore';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';
import { getMessaging, onMessage } from 'firebase/messaging';

const FirebaseContext = createContext(null)
const firebaseConfig = {
    apiKey: "AIzaSyB_pzMU_C5ll3NC_PJ1s0ml5uYs9S9cYAI",
    authDomain: "bookify-797c7.firebaseapp.com",
    projectId: "bookify-797c7",
    storageBucket: "bookify-797c7.appspot.com",
    messagingSenderId: "546049017638",
    appId: "1:546049017638:web:5a379a216915574cc423e7"
};

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()
const firestore = getFirestore(firebaseApp)
const fireStorage = getStorage(firebaseApp)
export const messaging = getMessaging(firebaseApp)

export const useFirebase = () => useContext(FirebaseContext)
export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            if (user) setUser(user)
            else setUser(null)
        })
    }, [])
    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password)
    }

    const signinUserwithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password)
    }

    const signOutUser = () => {
        return signOut(firebaseAuth)
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(firebaseAuth, googleProvider)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateNewListing = async (name, isbn, price, cover, username, avatar) => {
        const imageRef = ref(fireStorage, `uploads/images/${Date.now()}-${cover.name}`)
        const imageRef1 = ref(fireStorage, `uploads/avatars/${Date.now()}-${avatar.name}`)
        const uploadImage = await uploadBytes(imageRef, cover)
        const uploadImage1 = await uploadBytes(imageRef1, avatar)
        return await addDoc(collection(firestore, 'books'), {
            name,
            isbn,
            price,
            imageURL: uploadImage.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName == null ? username : user.displayName,
            photoURL: user.photoURL == null ? uploadImage1.ref.fullPath : user.photoURL
        })
    }

    const listAllBooks = () => {
        return getDocs(collection(firestore, "books"));
    }

    const getImageURL = (path) => {
        return getDownloadURL(ref(fireStorage, path))
    }

    const getBookById = async (id) => {
        const docRef = doc(firestore, 'books', id);
        const result = await getDoc(docRef)
        return result
    }

    const placeOrder = async (bookId, qty, username) => {
        const collectionRef = collection(firestore, 'books', bookId, 'orders')
        const result = await addDoc(collectionRef, {
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName == null ? username : user.displayName,
            photoURL: user.photoURL,
            qty: Number(qty)
        })
        return result
    }

    const deleteOrder = async (bookId, orderId) => {
        const collectionRef = collection(firestore, 'books', bookId, 'orders', orderId)
        const result = await deleteDoc(collectionRef)
        console.log(result)
        return result
    }

    const fetchMyBooks = async (userId) => {

        const collectionRef = collection(firestore, 'books')
        const q = query(collectionRef, where("userID", "==", userId))

        const result = await getDocs(q);
        return result
    }

    const getOrders = async (bookId) => {
        const collectionRef = collection(firestore, 'books', bookId, "orders")

        const result = await getDocs(collectionRef)
        return result
    }

    const onMessageListener = async () => {
        let payload = "This is beautiful";

        const msg = onMessage(messaging, payload)
        return msg

    }
    const isLoggedIn = user ? true : false;

    return <FirebaseContext.Provider value={{
        signupUserWithEmailAndPassword, signinUserwithEmailAndPassword,
        signInWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        user,
        getOrders,
        signOutUser,
        deleteOrder,
        onMessageListener
    }}>
        {props.children}
    </FirebaseContext.Provider>
}