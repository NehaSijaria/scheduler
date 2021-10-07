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
      setState({
        ...state,
        appointments
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
      setState({
        ...state,
        appointments
      });
    })
    };


  return { state, setState, setDay, bookInterview, cancelInterview}
}
