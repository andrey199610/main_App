import React from "react";
import firebase from "firebase/app";
import "./Login.css";
import { Button } from "react-bootstrap";
import Loading from "../ui/Loading";

export default function Login(props) {
  const loginWithGoogle = () => {
    let googleprovider = new firebase.auth.GoogleAuthProvider();
    googleprovider.addScope("profile");
    googleprovider.addScope("email");
    firebase
      .auth()
      .signInWithPopup(googleprovider)
      .catch(function (error) {
        console.log(error);
      });
    localStorage.setItem("Logging in", true);
  };

  return (
    <main className="main">
      {!props.signedIn && (
        <>
          {!localStorage.getItem("Logging in") && (
            <Button onClick={loginWithGoogle}>use google to sign in</Button>
          )}
          {localStorage.getItem("Logging in") && <Loading />}
        </>
      )}
      {props.signedIn && (
        <div className="main">
          <>
            <h2>You are logged</h2>
            <h5>Welcome {firebase.auth().currentUser.displayName}</h5>
            <div className="photoURL">
              {firebase.auth().currentUser.photoURL && (
                <img src={firebase.auth().currentUser.photoURL} alt="profile" />
              )}
            </div>
            <Button
              className="signout"
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              Sign-out
            </Button>
          </>
        </div>
      )}
    </main>
  );
}
