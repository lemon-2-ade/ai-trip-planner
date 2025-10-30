"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import {
  auth,
  signIn,
  signUp,
  signInWithGoogle,
  signOut,
} from "@/lib/firebase-auth";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  imageUrl?: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (firebaseUser) {
        // User is signed in
        try {
          // Get the user from your database or create one if it doesn't exist
          // For Google Auth users
          if (firebaseUser.providerData[0]?.providerId === "google.com") {
            const response = await axios.post("/api/auth/google", {
              name: firebaseUser.displayName,
              email: firebaseUser.email,
              providerId: firebaseUser.uid,
              image: firebaseUser.photoURL,
            });
            console.log(firebaseUser);

            setUser({
              id: response.data.id,
              name: response.data.name,
              email: response.data.email,
              imageUrl: response.data.image || response.data.imageUrl,
            });
          } else {
            console.log("this is for other auth ");
            // Set user directly from Firebase data
            const res = await axios.get("/api/db/user",
              { params: { firebaseUid: firebaseUser.uid } }
            );
            const user = res.data;
            
            setUser({
              id: user.id,
              name: user.name || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "",
              email: user.email || firebaseUser.email || "",
              imageUrl: user.imageUrl || firebaseUser.photoURL,
            });
          }
        } catch (error) {
          console.error("Error getting user data:", error);
          // Still set the basic user info from Firebase
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || "",
            email: firebaseUser.email || "",
            imageUrl: firebaseUser.photoURL,
          });
        }
      } else {
        // User is signed out
        setUser(null);
      }

      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await signIn(email, password);
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const userData = await signInWithGoogle();

      // User is automatically saved to database in the auth state change listener
      setUser(userData);
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Signup with email and password
  const signup = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);

      // Create user in Firebase
      let userData = await signUp(name, email, password);

      // Create user in database
      try {
        const res = await axios.post("/api/auth/signup", {
          name,
          email,
          password,
          providerId: userData.id,
          providerType: "email",
        });
        userData = res.data;
      } catch (error) {
        console.error("Error saving user to database:", error);
        // We still have Firebase auth, so continue
      }

      console.log(userData);
      setUser(userData);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
