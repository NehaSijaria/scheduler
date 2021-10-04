//import React from "react";
import "components/Application.scss";
import Appointment from "./Appointment";
import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import axios from "axios";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Arche Cohen",
      interviewer: {
        id: 3,
        name: "Tori Molcolm",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      },
    },
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "MAria Boucher",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      },
    },
  },
];


export default function Application() {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // console.log("Application.js > day:", day);
  //Replace with:
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  //updates the state with the new day.
  const setDay = day => setState({ ...state, day });
  const setDays = (days) => {
    //... your code here ...
    setState(prev => ({ ...prev, days }));
} 

  useEffect(() => {
    axios.get("/api/days").then((response) => {
      // console.log(response.data);
      setDays(response.data);
    });
  }, []); 

  const ListOfAppointments = appointments.map((appointment) => {
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
        <Appointment key={"last"} time={"5PM"} />
      </section>
    </main>
  );
}
