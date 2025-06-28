import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import type { User as FirebaseUser } from 'firebase/auth';
import { db } from './firebase';

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    createdAt: any;
    updatedAt: any;
    stage?: 'before' | 'during' | 'after';
    careerId?: string;
    year?: '1st Year' | '2nd Year' | '3rd Year' | 'Final Year';
}

export const createUserProfile = async (user: FirebaseUser): Promise<void> => {
    const userRef = doc(db, 'users', user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        const { uid, email, displayName, photoURL } = user;
        const createdAt = serverTimestamp();
        const updatedAt = serverTimestamp();
        
        await setDoc(userRef, {
            uid,
            email,
            displayName,
            photoURL,
            createdAt,
            updatedAt
        });
    }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    const userRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
        return snapshot.data() as UserProfile;
    } else {
        return null;
    }
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp(),
    });
};
