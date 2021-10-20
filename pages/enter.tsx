/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth, googleAuthProvider } from "../lib/firebase";

export default function EnterPage({ }) {
  const { user , username } = useContext(UserContext);

  return (
    <main>
      {user ? 
        !user ? <UsernameForm /> : <SignOutButton /> // user = username
        :
        <SignInButton />
      }
    </main>
  )
}

function SignInButton() {
  const signInWithGooogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (error) {
      console.log('error sign in %s', error.message);
    }
  };

  return (
    <button className="btn-google" onClick={signInWithGooogle}>
      <img src={'/google.png'} /> Sign in with Google
    </button>
  )
};

function SignOutButton() {
  return (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
};

function UsernameForm() {
  return (
    <></>
  )
};