import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { bookInterview, id, interviewers, interview, cancelInterview } = props;
  function save(name, interviewer) {
    if (name && interviewer) {
      transition(SAVING);
    }
    const interview = {
      student: name,
      interviewer,
    };
    Promise.resolve(bookInterview(id, interview))
      .then(() => transition(SHOW))
      .catch((err) => {
        transition(ERROR_SAVE, true);
        console.log(err);
      });
  }
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  const deleteAppointment = () => {
    transition(DELETING, true);
    Promise.resolve(cancelInterview(id))
      .then(() => transition(EMPTY))
      .catch((e) => {
        transition(ERROR_DELETE, true);
        console.log(e);
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          id={id}
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={deleteAppointment}
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save the appointment"
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete the appointment"
          onClose={() => back()}
        />
      )}
    </article>
  );
}
