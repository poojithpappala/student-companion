import { GoogleAuthProvider, signInWithRedirect, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './firebase';

const provider = new GoogleAuthProvider();

// This function will now just trigger the redirect.
export const signInWithGoogle = async (): Promise<void> => {
    await signInWithRedirect(auth, provider);
};

export const signOut = async (): Promise<void> => {
    await firebaseSignOut(auth);
};
