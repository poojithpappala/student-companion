import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './firebase';
import { createUserProfile, getUserProfile } from './user';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<{ isNewUser: boolean }> => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const existingProfile = await getUserProfile(user.uid);
    if (!existingProfile) {
        await createUserProfile(user);
        return { isNewUser: true };
    }
    return { isNewUser: false };
};

export const signOut = async (): Promise<void> => {
    await firebaseSignOut(auth);
};
