'use client';

import React, { useState, useEffect, useContext, createContext } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { getUserProfile, UserProfile, createUserProfile } from '@/lib/firebase/user';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: FirebaseUser | null;
    userProfile: UserProfile | null;
    loading: boolean;
    refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    refreshUserProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const refreshUserProfile = async () => {
        if (auth.currentUser) {
            const profile = await getUserProfile(auth.currentUser.uid);
            setUserProfile(profile);
        }
    };

    useEffect(() => {
        const processAuth = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    // This block runs when a user is redirected back from Google's sign-in page.
                    const existingProfile = await getUserProfile(result.user.uid);
                    if (!existingProfile) {
                        // This is a brand new user, create their profile and send to onboarding.
                        await createUserProfile(result.user);
                        router.replace('/onboarding/stage');
                        return; // Prevent further execution until redirect happens
                    }
                    // For existing users, simply redirect to their dashboard.
                    // The onAuthStateChanged listener below will handle setting the user state.
                    router.replace('/dashboard');
                    return; 
                }
            } catch (error) {
                console.error("Error processing redirect result", error);
            }

            // This listener handles all other cases, like a user returning to the site
            // or the initial load without a redirect.
            const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                if (firebaseUser) {
                    setUser(firebaseUser);
                    const profile = await getUserProfile(firebaseUser.uid);
                    setUserProfile(profile);
                } else {
                    setUser(null);
                    setUserProfile(null);
                }
                setLoading(false);
            });

            return () => unsubscribe();
        };
        
        processAuth();

    }, [router]);

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, refreshUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
