import React, { useState } from "react";
import PropTypes from 'prop-types';

 import InterviewerListItem from "components/InterviewerListItem";
 import Form from "./Appointment/Form";
 import "components/InterviewerList.scss";
import { types } from "@storybook/addons";

 function InterviewerList(props) {
   const { interviewers } = props;

   return (
     <section className="interviewers">
       <h4 className="interviewers__header text--light">Interviewer</h4>
       <ul className="interviewers__list">
         {interviewers.map((person) => (
           <InterviewerListItem
             key={person.id}
             avatar={person.avatar}
             name={person.name}
            //  setInterviewer={props.setInterviewer}
            setInterviewer={(event) => props.onChange(person.id)}
            selected={person.id === props.value}
           />
         ))}
       </ul>
     </section>
   );
 }
 InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};


 export default InterviewerList;
