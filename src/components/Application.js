import "components/Application.scss";
import Appointment from "./Appointment";
import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import { getAppointmentsForDay } from "helpers/selectors";
import axios from "axios";

//days & appointmentsdeleted
export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  //Replace with:
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
  //updates the state with the new day.
  const setDay = day => setState({ ...state, day });
  //remove set days function
//   const setDays = (days) => {
//     //... your code here ...
//     setState(prev => ({ ...prev, days }));
// } 

  useEffect(() => {
    // axios.get("/api/days").then((response) => {
    //   // console.log(response.data);
    //   setDays(response.data);
    // });
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      ])
      .then(
      (all) => {
        console.log('all.....', all)
      setState(prev => ({ 
        ...prev, 
        days: all[0].data,
        appointments: all[1].data,
       }));
      });
  }, []); 
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log('daily appts: ;;;;;', dailyAppointments)
  const ListOfAppointments = dailyAppointments.map((appointment) => {
    return (
    <Appointment
      key={appointment.id}
      {...appointment}  
    />
    )
  })

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
        {ListOfAppointments}
        <Appointment 
          key={"last"} 
          time={"5PM"} 
        />
      </section>
    </main>
  );
}
