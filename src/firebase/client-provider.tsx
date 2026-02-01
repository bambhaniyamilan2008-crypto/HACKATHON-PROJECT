'use client';

import React, { ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
// Hum seedha Firebase SDK se import karenge
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

interface FirebaseClientProviderProps {
  children: ReactNode;
}

// Config yahi define kar dete hain taaki koi confusion na rahe
const firebaseConfig = {
  projectId: "studio-8186080283-f4574",
  appId: "1:31466290334:web:027b890f614e7aceb68f8f",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForDemoMode", // Build pass karne ke liye dummy key
  authDomain: "studio-8186080283-f4574.firebaseapp.com",
  messagingSenderId: "31466290334",
  storageBucket: "studio-8186080283-f4574.appspot.com"
};

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  
  // Yahan hum check karte hain: Agar app pehle se hai toh woh use karein, nahi toh naya banayein WITH CONFIG
  const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
