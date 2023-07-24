import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// creatw sign in context
const SignINContext = createContext();

// the context accessor
export const useSignINContext = () => {
  return useContext(SignINContext);
};

// the context provider
export const AuthContextProvider = ({ children }) => {
  // the main states
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userD, setUserD] = useState({
    displayName: 0,
    email: 0,
    photoURL: "https://placeimg.com/80/80/people",
  });
  const [user, setUser] = useState();
  // Added loading state
  const [isLoading, setIsLoading] = useState(true); 


  // states setters
  const changeSignIn = (state) => {
    setIsSignedIn(state);
  };
  const changeUser = (a, b, c) => {
    setUserD({ displayName: a, email: b, photoURL: c });
  };

  // google redirect sign in
  const provider = new GoogleAuthProvider();
  const signIn = () => {
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // SignINContext.user = user;
        // changeUser(user.providerData[0].displayName , user.providerData[0].email , user.providerData[0].photoURL);
        // console.log(token);

        // ...
      })
      .then(() => {
        changeSignIn();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
  
      if (currentUser) {
        changeUser(
          currentUser.providerData[0].displayName,
          currentUser.providerData[0].email,
          currentUser.providerData[0].photoURL
        );
        changeSignIn(true);
      } else {
        changeUser(0, 0, "https://placeimg.com/80/80/people");
        changeSignIn(false);
      }
  
      setIsLoading(false);
    });
  
    return () => {
      unsubscribe();
    };
  }, [user]);
  


  const logOut = () => {
    signOut(auth);
  };





  // Render loading state until the useEffect code completes
  if (isLoading ) {
    return <></>;
  }

  return (
    <SignINContext.Provider
      value={{
        signIn,
        logOut,
        isSignedIn: isSignedIn,
        user: user,
        userData: userD,
      }}
    >
      {children}
    </SignINContext.Provider>
  );
};
