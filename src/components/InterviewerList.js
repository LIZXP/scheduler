import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewerArray = props.interviewers.map((person) => {
    return (
      <InterviewerListItem
        key={person.id}
        id={person.id}
        name={person.name}
        avatar={person.avatar}
        selected={person.id === props.interviewer}
        setInterviewer={props.setInterviewer}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        <>{interviewerArray}</>
      </ul>
    </section>
  );
}
