import React from "react";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import "components/Appointment/styles.scss";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then (() => {
      transition(SHOW)
    //changes made      
    })
    .catch(error => transition(ERROR_SAVE, true));
  }
 
  function deleteApp() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then (() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));

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
      onEdit={() => transition(EDIT)}
    />  
    )}
     {mode === CREATE && (
        <Form 
        interviewers={props.interviewers} 
        onCancel={() => transition(EMPTY)}
        onSave={save}
        />
    )}
      {mode === EDIT && (
        <Form 
        interviewers={props.interviewers} 
        onCancel={back}
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
    {mode === ERROR_SAVE && (
        <Error 
          message="Can not save"
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="Can not delete"
          onClose={() => back()}
        />
      )}

     </article>
  ) }

   export default Appointment;
