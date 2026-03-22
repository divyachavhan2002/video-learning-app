import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle user registration with email/password and create Firestore profile
  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        createdAt: new Date().toISOString(),
        enrolledCourses: [],
        favorites: [],
      });

      return user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // Handle user login with email and password
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Handle Google OAuth login and create user profile if needed
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date().toISOString(),
            enrolledCourses: [],
            favorites: [],
          });
        }
      } catch (firestoreError) {
        console.warn('Firestore error (user logged in but profile not saved):', firestoreError.message);
      }

      return user;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  // Handle user logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Enroll user in a course
  const enrollInCourse = async (courseId) => {
    if (!user) {
      throw new Error('You must be logged in to enroll in a course');
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        enrolledCourses: arrayUnion({
          courseId,
          enrolledAt: new Date().toISOString(),
          progress: 0,
        }),
      });
    } catch (error) {
      console.error('Enrollment error:', error);
      throw error;
    }
  };

  // Unenroll from a course
  const unenrollFromCourse = async (courseId) => {
    if (!user) {
      throw new Error('You must be logged in');
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const enrolledCourses = userDoc.data().enrolledCourses || [];
        const updatedCourses = enrolledCourses.filter(course => course.courseId !== courseId);
        
        await updateDoc(userRef, {
          enrolledCourses: updatedCourses,
        });
      }
    } catch (error) {
      console.error('Unenrollment error:', error);
      throw error;
    }
  };

  // Get user's enrolled courses
  const getEnrolledCourses = async () => {
    if (!user) {
      return [];
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return userDoc.data().enrolledCourses || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      return [];
    }
  };

  // Check if user is enrolled in a specific course
  const isEnrolled = async (courseId) => {
    if (!user) {
      return false;
    }

    try {
      const enrolledCourses = await getEnrolledCourses();
      return enrolledCourses.some(course => course.courseId === courseId);
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return false;
    }
  };

  // Monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    enrollInCourse,
    unenrollFromCourse,
    getEnrolledCourses,
    isEnrolled,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
