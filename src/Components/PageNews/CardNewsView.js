import React, { useEffect, useState } from "react";
import { firestore, auth, app } from "../firebase/config";
import "./CardNewsView.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Comments from "./Comments/Comments";
import Loading from "../ui/Loading";

export default function CardNewsView(props) {
  const id = props.match.params.id;
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState(null);
  const [disabledBtn, serDisabledBtn] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCardCommentsAdd = async () => {
    if (value.trim().length < 15) {
      setMessage("Комментарий должен содержать больше 15 символов!");
    } else {
      serDisabledBtn(true);
      await firestore.collection("News").doc(id).collection("comments").add({
        userEmail: user.email,
        photoURL: user.photoURL,
        text: value,
        createdAt: app.firestore.FieldValue.serverTimestamp(),
      });
      setMessage(null);
      fetchCardComments();
      setValue("");
      serDisabledBtn(false);
    }
  };

  const deleteComments = async (del, email) => {
    if (user !== null && user.email === email) {
      if (confirm("Вы точно хотите удалить комментарий?")) {
        await firestore
          .collection("News")
          .doc(id)
          .collection("comments")
          .doc(del)
          .delete();
      }
    }
    fetchCardComments();
  };
  const fetchCardView = async () => {
    setLoading(true);
    const req = await firestore.collection("News").doc(id).get();
    const data = req.data();
    fetchCardComments();
    setData(data);
    setLoading(false);
  };

  const fetchCardComments = async () => {
    const reqComments = await firestore
      .collection("News")
      .doc(id)
      .collection("comments")
      .orderBy("createdAt")
      .get();
    const comments = reqComments.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate(),
    }));
    setComment(comments);
  };

  useEffect(() => {
    fetchCardView();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="wrapper_cardview">
      <div>
        <img className="cardview_img" src={data.imgUrl} alt="imgNews" />
        <div className="cardview_body">
          <h1 className="cardview_title">{data.title}</h1>
          <span className="cardview_text">{data.text}</span>
        </div>

        <div className="cardview_comments">
          {comment.length === 0 ? (
            <h4>Комментариев нету</h4>
          ) : (
            <div>
              <h4>Комментарии</h4>
              {comment.map((data) => {
                return (
                  <Comments
                    currentUser={user}
                    deleteComments={deleteComments}
                    key={data.id}
                    userInfo={data}
                  />
                );
              })}
            </div>
          )}
          {user === null ? (
            <h6>Авторизуйтесь чтобы оставить комментарий</h6>
          ) : (
            <div className="wrapper_commentAdd">
              <h6 style={{ color: "#dc3545" }}>{message}</h6>
              <textarea
                placeholder="comment"
                type="text"
                className="comment_input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button
                disabled={disabledBtn}
                className="comment_button"
                onClick={fetchCardCommentsAdd}
              >
                Добавить комментарий
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
