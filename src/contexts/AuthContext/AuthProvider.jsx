import React from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };

  const authIfo = { registerUser, signInUser };
  return <AuthContext value={authIfo}>{children}</AuthContext>;
};

export default AuthProvider;
