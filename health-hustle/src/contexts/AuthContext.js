import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../database/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
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
        try {
          AsyncStorage.setItem('user', JSON.stringify(authUser));
        } catch (error) {
          console.log('Error storing user in storage:', error);
        }
      } else {
        setUser(null);
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
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Signup error:', error);
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
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
