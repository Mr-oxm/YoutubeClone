import { createContext, useState, useContext, useEffect, useReducer, useCallback } from 'react';
import { auth } from '../firebase';
import { signInWithRedirect, GoogleAuthProvider, getRedirectResult, onAuthStateChanged, signOut } from 'firebase/auth';

// Create a constant for the GoogleAuthProvider
const GOOGLE_PROVIDER = new GoogleAuthProvider();

// Create a constant for the sign-in context
const SIGN_IN_CONTEXT = createContext();

// Define the initial state for the context
const initialState = {
  isSignedIn: false, // whether the user is signed in
  userD: { displayName: 0, email: 0, photoURL: 'https://placeimg.com/80/80/people' }, // user data object
  user: null, // the user object from Firebase
};

// Define a reducer function to update the state based on actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_SIGN_IN':
      // Toggle the value of isSignedIn
      return { ...state, isSignedIn: !state.isSignedIn };
    case 'CHANGE_USER':
      // Update the user data object with the provided displayName, email, and photoURL
      return { ...state, userD: { displayName: action.displayName, email: action.email, photoURL: action.photoURL } };
    default:
      return state;
  }
};

// Custom hook to provide easy access to the context from components
export const useSignINContext = () => useContext(SIGN_IN_CONTEXT);

// The context provider component
export const AuthContextProvider = ({ children }) => {
  // Use useReducer to manage state
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isSignedIn, userD } = state;

  // Callback to toggle the value of isSignedIn
  const changeSignIn = useCallback(() => {
    dispatch({ type: 'CHANGE_SIGN_IN' });
  }, []);

  // Callback to update the user data object
  const changeUser = useCallback((displayName, email, photoURL) => {
    dispatch({ type: 'CHANGE_USER', displayName, email, photoURL });
  }, []);

  // Callback to handle sign-in with Google
  const signIn = useCallback(() => {
    
    // Redirect the user to the Google sign-in page
    signInWithRedirect(auth, GOOGLE_PROVIDER);
  
    // Retrieve the sign-in result after the user authenticates
    getRedirectResult(auth)
      .then((result) => {
        // Get the access token from the result
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
  
        // The signed-in user info.
        // const user = result.user;
        // SignINContext.user = user;
        // changeUser(user.providerData[0].displayName , user.providerData[0].email , user.providerData[0].photoURL);
        // console.log(token);
      })
      .then(() => {
        // Toggle the value of isSignedIn
        changeSignIn();
      })
      .catch((error) => {
        // Handle any errors that occurred during sign-in
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }, []);
  
  useEffect(() => {
    // Subscribe to the onAuthStateChanged event to update the user data and toggle isSignedIn when the user signs in or out
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Update the user data object with the current user's display name, email, and photo URL
      dispatch({ type: 'CHANGE_USER', displayName: currentUser.providerData[0].displayName, email: currentUser.providerData[0].email, photoURL: currentUser.providerData[0].photoURL });
      // Toggle the value of isSignedIn
      changeSignIn();
    });
  
    // Return an unsubscribe function to stop listening for the onAuthStateChanged event when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  
  // Callback to handle sign-out
  const logOut = useCallback(() => {
    // Sign the user out
    signOut(auth);
  }, []);
  
  return (
    // Provide the signIn, logOut, isSignedIn, and userData values to components that consume the context
    <SIGN_IN_CONTEXT.Provider value={{ signIn, logOut, isSignedIn: isSignedIn, userData: userD }}>
      {children}
    </SIGN_IN_CONTEXT.Provider>
  );
  };
  