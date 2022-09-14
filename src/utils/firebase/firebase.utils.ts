import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
} from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';
import { Category } from '../../store/category/category.types';

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

export const createUserDocumentFromAuth = async (
    userAuth: User, 
    additionnalInformation = {} as AdditionalInformation
) => {
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
            console.log('Error', error);
        }
    }

    return userSnapshot;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || ! password) {
        return;
    }

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || ! password) {
        return;
    }

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser =  async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnap) => 
        docSnap.data() as Category
    );
}

export const getCurrentUser = (): Promise<User | null>  => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
}

export type AdditionalInformation = {
    displayName?: string;
};
  
export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
};
  
export type ObjectToAdd = {
    title: string;
};
  