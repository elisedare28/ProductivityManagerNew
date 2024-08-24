import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import Home from './homepage';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      setUser(user);
      setToken(token);

      await fetch("https://productivity-manager-new-api.vercel.app/api/users/route/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ email: user.email }),
      });
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then(setToken);
        setUser(user);
      } else {
        setUser(null);
        setToken(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      {!user ? (
        <button onClick={handleGoogleSignIn} className="button">
          Sign In with Google
        </button>
      ) : (
        <Home user={user} token={token} />
      )}
    </div>
  );
};

export default App;
