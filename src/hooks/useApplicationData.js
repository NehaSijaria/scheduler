import React from "react";
import { useState } from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
   //updates the state with the new day.
  const setDay = day => setState({ ...state, day });


// Pair progammed with Mentor -> Sandeep Chopra

 const spotsRemaining = (increaseBy) => {

    if(state.days.length===0) return [];

    const currentDay = state.days.find((dayObj)=>state.day===dayObj.name);

    const spotsRemaining = currentDay.appointments.map((apptID)=>state.appointments[apptID].interview).filter((item)=>item===null).length;

    const updatedDay = {...currentDay, spots: spotsRemaining+increaseBy};

    const daysObject = [...state.days]

    const indexOfDayToUpdate = state.days.findIndex((dayObj)=>state.day===dayObj.name);

    daysObject[indexOfDayToUpdate] = updatedDay;

    return daysObject;

    };

 spotsRemaining();

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
    .put(`/api/appointments/${id}`,{ interview })
    .then((res) => {

      const days =  spotsRemaining(-1)
      setState({
        ...state,
        appointments,
        days,
      });
    })
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
    .delete(`/api/appointments/${id}`, {interview: null})
    .then((res) => {
      const days =  spotsRemaining(1);
      setState({
        ...state,
        appointments,
        days,
      });
    })
    };


  return { state, setState, setDay, bookInterview, cancelInterview}
}
