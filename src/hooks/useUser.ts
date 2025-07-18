import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/user';

const USER_STORAGE_KEY = 'july12th-user-session';
const USERS_STORAGE_KEY = 'july12th-all-users';

// Generate a session ID based on browser fingerprint
const generateSessionId = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Browser fingerprint', 2, 2);
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
};

export const useUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserSession();
  }, []);

  const loadUserSession = () => {
    try {
      const sessionId = generateSessionId();
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      
      if (savedUsers) {
        const users = JSON.parse(savedUsers).map((user: any) => ({
          ...user,
          createdAt: new Date(user.createdAt)
        }));
        setAllUsers(users);
      }
      
      if (savedUser) {
        const user = JSON.parse(savedUser);
        // Check if this is the same session
        if (user.sessionId === sessionId) {
          setCurrentUser({
            ...user,
            createdAt: new Date(user.createdAt)
          });
        } else {
          // Different session, show registration
          setShowRegistration(true);
        }
      } else {
        // New user, show registration
        setShowRegistration(true);
      }
    } catch (error) {
      console.error('Error loading user session:', error);
      setShowRegistration(true);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = (name: string, email: string, subscribe: boolean = true) => {
    const sessionId = generateSessionId();
    const newUser: User = {
      id: uuidv4(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      sessionId,
      createdAt: new Date(),
      isSubscribed: subscribe
    };

    // Save current user
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    setCurrentUser(newUser);

    // Add to all users list
    const updatedUsers = [...allUsers, newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setAllUsers(updatedUsers);

    setShowRegistration(false);
    return newUser;
  };

  const updateSubscription = (subscribe: boolean) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, isSubscribed: subscribe };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);

    // Update in all users list
    const updatedUsers = allUsers.map(user => 
      user.id === currentUser.id ? updatedUser : user
    );
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setAllUsers(updatedUsers);
  };

  const getSubscribedUsers = (): User[] => {
    return allUsers.filter(user => user.isSubscribed && user.id !== currentUser?.id);
  };

  const clearUserSession = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setCurrentUser(null);
    setShowRegistration(true);
  };

  return {
    currentUser,
    allUsers,
    showRegistration,
    loading,
    registerUser,
    updateSubscription,
    getSubscribedUsers,
    clearUserSession
  };
};