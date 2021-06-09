import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { firebase } from "../Components/firebase/config";

export default function Header({ mail }) {
  return (
    <Navbar className="pt-3 pb-3" bg="dark" variant="dark" expand="sm">
      <Navbar.Brand>Logo </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <LinkContainer exact to="/">
            <Nav.Link>News</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Works">
            <Nav.Link>Works</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Contact">
            <Nav.Link>Contact</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Login">
            {mail !== null ? (
              <Nav.Link>
                {mail}
                <svg
                  onClick={() => {
                    firebase.auth().signOut();
                  }}
                  style={{ marginLeft: "5px", height: "20px", height: "20px" }}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      fill="#fff"
                      d="m9 11c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-9c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"
                    />
                  </g>
                  <g>
                    <path
                      fill="#fff"
                      d="m17.5 22h-17c-.276 0-.5-.224-.5-.5v-4c0-2.481 2.019-4.5 4.5-4.5h9c2.481 0 4.5 2.019 4.5 4.5v4c0 .276-.224.5-.5.5zm-16.5-1h16v-3.5c0-1.93-1.57-3.5-3.5-3.5h-9c-1.93 0-3.5 1.57-3.5 3.5z"
                    />
                  </g>
                  <g>
                    <path
                      fill="#fff"
                      d="m23.5 11h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z"
                    />
                  </g>
                  <g>
                    <path
                      fill="#fff"
                      d="m19.5 15c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l3.646-3.646-3.646-3.646c-.195-.195-.195-.512 0-.707s.512-.195.707 0l4 4c.195.195.195.512 0 .707l-4 4c-.097.096-.225.145-.353.145z"
                    />
                  </g>
                </svg>
              </Nav.Link>
            ) : (
              <Nav.Link>Login</Nav.Link>
            )}
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
