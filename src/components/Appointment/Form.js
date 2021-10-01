import React from 'react'
import InterviewerList from 'components/InterviewerList'
import { useState } from 'react';
import Button from 'components/Button'

export default function Form(props  ) {
  const {interviewers, onSave, onCancel } = props;
  const [name, setName] = useState(props.name || ""); 
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //Helper function to clear form values

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        onChange={event => setName(event.target.value)}
        className="appointment__create-input text--semi-bold"
        value={name}
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers} 
      value={interviewer}   
      onChange={setInterviewer} 
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={onCancel}>
        Cancel
      </Button>
      <Button confirm onClick={event => props.onSave(name, interviewer)}>
        Save
      </Button>
    </section>
  </section>
</main>
  )
} 
