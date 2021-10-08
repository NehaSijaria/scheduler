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
 const spotsRemaining = (day, appointments) => {
  //  console.log('day!!!!!!', day);
  const dayFound = state.days.find((dayObj)=> dayObj.name === day);
  // console.log('dayFound!!!!!!', dayFound);
  const apptList = dayFound.appointments.map((appId)=> appointments[appId]);
  // console.log('appointments!!!!!', appointments)
  const numOfSpots = apptList.filter((appointment)=>appointment.interview === null).length;
  return numOfSpots;
};

  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const numOfSpots =  spotsRemaining(state.day, appointments);
    const updatedDays = state.days.map((dayObj)=>{
      if(dayObj.appointments.includes(id)){
        const newDay = {...dayObj, spots: numOfSpots}
        return newDay;
      }
      return dayObj;
    })
    console.log('numOfSpots!!!!', numOfSpots);
    return axios
    .put(`/api/appointments/${id}`,{ interview })
    .then((res) => {
      
      setState({
        ...state,
        appointments,
        days:updatedDays,
      });
    })
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const numOfSpots =  spotsRemaining(state.day, appointments);
    // console.log('numOfSpots!!!!!!', numOfSpots)
    const updatedDays = state.days.map((dayObj)=>{
      if(dayObj.appointments.includes(id)){
        const newDay = {...dayObj, spots: numOfSpots}
        return newDay;
      }
      return dayObj;
    })
    return axios
    .delete(`/api/appointments/${id}`, {interview: null})
    .then((res) => {
      setState({
        ...state,
        appointments,
        days:updatedDays,
      });
    })
    };


  return { state, setState, setDay, bookInterview, cancelInterview}
}
