/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import debounce from "lodash.debounce";

export default function EnterPage({ }) {
  const { user , username } = useContext(UserContext);

  return (
    <main>
      {user ? 
        !username ? <UsernameForm /> : <SignOutButton /> // user = username
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
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  useEffect(() => {
    console.log(111);
    
    checkUserName(formValue);
  }, [formValue]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const batch = firestore.batch();
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const checkUserName = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        console.log("ffff " + username);
        
        const ref = firestore.doc(`usernames/${username}`);
        console.log(ref.path);
        
        const doc = await ref.get();
        console.log(doc.exists, doc.id);
        
        console.log('Firestore read executed! %s');
        setIsValid(!doc.exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>

          <input name="username" placeholder="username" value={formValue} onChange={onChange}/>

          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            UserName: {formValue}
            <br/>
            Loading: {loading.toString()}
            <br/>
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  )
};

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}