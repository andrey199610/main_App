import React, { useState, useEffect } from "react";
import { firebase } from "./Components/firebase/config";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import News from "./Components/PageNews/News";
import Works from "./Components/PageWorks/Works";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import Login from "./Components/Autorisation/Login";
import CardNewsView from "./Components/PageNews/CardNewsView";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [mail, setMail] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setSignedIn(true);
        setMail(user.email);
        localStorage.removeItem("Logging in");
      } else {
        setSignedIn(false);
        setMail(null);
      }
    });
  });

  return (
    <Router>
      <Header mail={mail} />
      <Switch>
        <Route exact path="/" component={News} />
        <Route path="/Works" component={Works} />
        <Route path="/Contact" component={Contact} />
        <Route path="/Login">
          <Login signedIn={signedIn} />
        </Route>
        <Route path="/News/:id" component={CardNewsView} />

        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
