import React from "react";
import { format } from "date-fns";
import "./Comments.css";

export default function Comments({ userInfo, deleteComments, currentUser }) {
  return (
    <div className="wrapper_comments">
      <div className="comments_header">
        <div>
          <img
            className="comments_img"
            src={userInfo.photoURL}
            alt="photoURL"
          />
        </div>
        <div className="comments_userInfo">
          <div>{userInfo.userEmail}</div>
          <span>{format(userInfo.createdAt, "dd/MM/yyyy в k:m")}</span>
        </div>
        {currentUser !== null && currentUser.email === userInfo.userEmail ? (
          <svg
            className="comments_deletebtn"
            onClick={() => deleteComments(userInfo.id, userInfo.userEmail)}
            viewBox="0 0 1280.000000 1280.000000"
          >
            <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
              <path
                d="M1348 11452 l-943 -942 2048 -2048 c1126 -1126 2047 -2054 2047
         -2062 0 -8 -921 -936 -2047 -2062 l-2048 -2048 943 -942 942 -943 2048 2048
         c1126 1126 2054 2047 2062 2047 8 0 936 -921 2062 -2047 l2048 -2048 942 943
         943 942 -2048 2048 c-1126 1126 -2047 2054 -2047 2062 0 8 921 936 2047 2062
         l2048 2048 -943 942 -942 943 -2048 -2048 c-1126 -1126 -2054 -2047 -2062
         -2047 -8 0 -936 921 -2062 2047 l-2048 2048 -942 -943z"
              />
            </g>
          </svg>
        ) : null}
      </div>

      <div className="comments_text">{userInfo.text}</div>
    </div>
  );
}
