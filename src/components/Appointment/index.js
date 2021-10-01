import React from "react";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./header";
import "components/Appointment/styles.scss";

 function Appointment() {
   return <article className="appointment">
     <Header time={props.time} />
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}
   </article>;
 }

 export default Appointment;
