import { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  // Handle user logout
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, []);

  // Enroll user in a course (prevents duplicates)
  const enrollInCourse = useCallback(async (courseId) => {
    if (!user) {
      throw new Error('You must be logged in to enroll in a course');
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const enrolledCourses = userDoc.data().enrolledCourses || [];
        const alreadyEnrolled = enrolledCourses.some(c => c.courseId === courseId);

        if (alreadyEnrolled) {
          return { alreadyEnrolled: true };
        }
      }

      await updateDoc(userRef, {
        enrolledCourses: arrayUnion({
          courseId,
          enrolledAt: new Date().toISOString(),
          progress: 0,
          completedLessons: [],
          totalWatchTime: 0,
        }),
      });

      return { alreadyEnrolled: false };
    } catch (error) {
      console.error('Enrollment error:', error);
      throw error;
    }
  }, [user]);

  // Unenroll from a course
  // Unenroll from a course
  const unenrollFromCourse = useCallback(async (courseId) => {
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
  }, [user]);

  // Update course progress (lesson completion and watch time)
  const updateCourseProgress = useCallback(async (courseId, lessonIndex, watchTimeSeconds, totalLessons) => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const enrolledCourses = userDoc.data().enrolledCourses || [];
        const courseIndex = enrolledCourses.findIndex(c => c.courseId === courseId);

        if (courseIndex === -1) return;

        const course = { ...enrolledCourses[courseIndex] };
        const completedLessons = course.completedLessons || [];

        // Add lesson to completed if not already there
        if (!completedLessons.includes(lessonIndex)) {
          completedLessons.push(lessonIndex);
        }

        // Calculate progress percentage
        const progress = totalLessons > 0
          ? Math.round((completedLessons.length / totalLessons) * 100)
          : 0;

        // Accumulate total watch time in seconds
        const totalWatchTime = (course.totalWatchTime || 0) + (watchTimeSeconds || 0);

        // Update the course entry
        const updatedCourses = [...enrolledCourses];
        updatedCourses[courseIndex] = {
          ...course,
          completedLessons,
          progress,
          totalWatchTime,
        };

        await updateDoc(userRef, {
          enrolledCourses: updatedCourses,
        });

        return { progress, completedLessons, totalWatchTime };
      }
    } catch (error) {
      console.error('Error updating course progress:', error);
    }
  }, [user]);

  // Get user's enrolled courses (with deduplication)
  const getEnrolledCourses = useCallback(async () => {
    if (!user) {
      return [];
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const enrolledCourses = userDoc.data().enrolledCourses || [];

        // Deduplicate by courseId — keep the earliest enrollment
        const seen = new Map();
        for (const course of enrolledCourses) {
          if (!seen.has(course.courseId)) {
            seen.set(course.courseId, course);
          } else {
            // Merge: keep earliest enrolledAt, highest progress, union of completedLessons
            const existing = seen.get(course.courseId);
            seen.set(course.courseId, {
              ...existing,
              enrolledAt: existing.enrolledAt < course.enrolledAt ? existing.enrolledAt : course.enrolledAt,
              progress: Math.max(existing.progress || 0, course.progress || 0),
              completedLessons: [...new Set([...(existing.completedLessons || []), ...(course.completedLessons || [])])],
              totalWatchTime: Math.max(existing.totalWatchTime || 0, course.totalWatchTime || 0),
            });
          }
        }

        const deduplicated = Array.from(seen.values());

        // If duplicates were found, clean up Firestore
        if (deduplicated.length < enrolledCourses.length) {
          await updateDoc(userRef, { enrolledCourses: deduplicated });
        }

        return deduplicated;
      }
      return [];
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      return [];
    }
  }, [user]);

  // Check if user is enrolled in a specific course (lightweight — no deduplication)
  const isEnrolled = useCallback(async (courseId) => {
    if (!user) {
      return false;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const enrolledCourses = userDoc.data().enrolledCourses || [];
        return enrolledCourses.some(course => course.courseId === courseId);
      }
      return false;
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return false;
    }
  }, [user]);

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
    updateCourseProgress,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
