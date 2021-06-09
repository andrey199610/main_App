import React from "react";
import { formatDistance } from "date-fns";
import "./JobCard.css";

export default function JobCard(props) {
  return (
    <div className="wrapper_jobcard">
      <div className="jobcard_header">
        <h3>{props.title}</h3>
        <span className="jobcard_data">
          {formatDistance(Date.now(), props.postedOn)} ago
        </span>
      </div>
      <div className="jobcard_body">
        <div className="jobcard_description">{props.description}</div>
        <h5 className="jobcard_companyName">{props.companyName}</h5>
      </div>
    </div>
  );
}
