import React, { createContext, useState, useEffect } from 'react';
import { auth, database } from '../database/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);


  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setUid(parsedUser.uid);

        }
        setLoading(false);
      } catch (error) {
        console.log('Error retrieving user from storage:', error);
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setUid(authUser.uid);
        try {
          AsyncStorage.setItem('user', JSON.stringify(authUser));
        } catch (error) {
          console.log('Error storing user in storage:', error);
        }
      } else {
        setUser(null);
        setUid(null);

        try {
          AsyncStorage.removeItem('user');
        } catch (error) {
          console.log('Error removing user from storage:', error);
        }
      }
      setLoading(false);
    });

    checkUser();

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    }
  };

  const signup = async (email, password) => {
    try {
      if (!email) {
        throw new Error('Email is required');
      }

      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      const { uid } = user;

      const usersRef = database.ref('users');

      usersRef.child(uid).set({ email });

      console.log('User registered successfully');
    } catch (error) {
      console.log('Signup error:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, uid, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
