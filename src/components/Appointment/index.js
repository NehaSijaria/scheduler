import React from "react";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import "components/Appointment/styles.scss";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETE";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back, setMode } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    setMode(SAVING);

    props.bookInterview(props.id, interview)
    .then (() => {
      transition(SHOW)
    })
  }
 
  function deleteApp() {
    setMode(DELETING);
    props.cancelInterview(props.id)
    .then (() => transition(EMPTY));
  }
  
  return (
    <article className="appointment">
    <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
    />  
    )}
     {mode === CREATE && (
        <Form 
        interviewers={props.interviewers} 
        onCancel={() => transition(EMPTY)}
        onSave={save}
        />
    )}
    {mode === SAVING && <Status message={"Saving..."} />}
    {mode === DELETING && <Status message={"Deleting..."} />}
    {mode === CONFIRM && 
    <Confirm
     message={"please confirm to delete the booking?"} 
     onCancel={back}
     onConfirm={deleteApp}/>}
     </article>
  ) }

   export default Appointment;
