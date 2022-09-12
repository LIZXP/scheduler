import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let interviewerClassName = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  let imageClassname = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
  });
  return (
    <li
      className={interviewerClassName}
      onClick={() => props.setInterviewer(props.id)}
    >
      <img className={imageClassname} src={props.avatar} alt={props.name} />
      {props.selected && props.name}
    </li>
  );
}
