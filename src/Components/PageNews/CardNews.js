import React from "react";
import { format } from "date-fns";
import "./CardNews.css";

export default function CardNews(props) {
  return (
    <div className="card">
      <a href={"/News/" + props.id}>
        <img className="card_img" src={props.imgUrl} alt="Card image" />
      </a>
      <div className="card_body">
        <h1>{props.title}</h1>
        <div className="card_text">{props.text}</div>
        <div className="card_footer">
          <span className="card_data">
            {format(props.postedOn, "p MM/dd/yyyy")}
          </span>
          <a href={"/News/" + props.id}>
            <span className="card_readmore">Read more</span>
          </a>
        </div>
      </div>
    </div>
  );
}
