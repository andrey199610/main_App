import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/config";
import CardNews from "./CardNews";
import Loading from "../ui/Loading";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    const req = await firestore
      .collection("News")
      .orderBy("postedOn", "desc")
      .get();
    const tempNews = req.docs.map((post) => ({
      ...post.data(),
      id: post.id,
      postedOn: post.data().postedOn.toDate(),
    }));

    setNews(tempNews);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div
      style={{
        width: "75%",
        margin: "auto",
        marginTop: "30px",
      }}
    >
      {news.map((post) => (
        <CardNews key={post.id} {...post} />
      ))}
    </div>
  );
}
