import React from "react";
import "components/Application.scss";
import { useEffect } from "react";
import Appointment from "./Appointment";
import DayList from "components/DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay, } from "helpers/selectors";
import axios from "axios";
import useApplicationData from "hooks/useApplicationData";

//days & appointmentsdeleted
export default function Application(props) {
  const { state, setState, setDay, bookInterview, cancelInterview } =  useApplicationData();

  useEffect(() => {
    Promise.all([ 
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
      ])
      .then(
      (all) => {
        console.log('all.....', all)
      setState(prev => ({ 
        ...prev, 
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
       }));
      });
  }, []); 
   console.log('state11111', state);
  const interviewers = getInterviewersForDay(state, state.day)
  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
          days={state.days} 
          day={state.day} 
          setDay={setDay} 
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointments}
        <Appointment 
          key={"last"} 
          time={"5PM"} 
        />
      </section>
    </main>
  );
}
