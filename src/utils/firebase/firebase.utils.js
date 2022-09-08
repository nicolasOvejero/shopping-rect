import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA9gCQrJW5dp01wgJemgBSp2Ym_aDV2PzU",
    authDomain: "shopping-react-c4cdf.firebaseapp.com",
    projectId: "shopping-react-c4cdf",
    storageBucket: "shopping-react-c4cdf.appspot.com",
    messagingSenderId: "426349646500",
    appId: "1:426349646500:web:e082cc09434ec321ce0c31"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionnalInformation = { displayName: '' }) => {
    if (!userAuth) {
        return;
    }

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionnalInformation,
            });
        } catch (error) {
            console.log('Error', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || ! password) {
        return;
    }

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || ! password) {
        return;
    }

    return await signInWithEmailAndPassword(auth, email, password);
}