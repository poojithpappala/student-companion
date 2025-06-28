'use client';

import React, { useState, useEffect, useContext, createContext } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { getUserProfile, UserProfile } from '@/lib/firebase/user';
import { onAuthStateChanged } from 'firebase/auth';

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

    const refreshUserProfile = async () => {
        if (auth.currentUser) {
            const profile = await getUserProfile(auth.currentUser.uid);
            setUserProfile(profile);
        }
    };

    useEffect(() => {
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
    }, []);

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, refreshUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
