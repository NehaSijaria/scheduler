export function getAppointmentsForDay(state, day) {
  // console.log('day!!', day)
  const arrOfAppt = [];
  const dayMatch = state.days.filter((days) => days.name === day);
  // console.log("dayMatch", dayMatch)
  if(!dayMatch[0]) {
    return [];
  }  
  for (let appt of dayMatch[0].appointments) {
    arrOfAppt.push(state.appointments[appt]);
  }
  return arrOfAppt;
}

export function getInterview(state,interview){
  if(interview){
    const idOfInterviewer = interview.interviewer;
    const interviewer = state.interviewers[idOfInterviewer]
    return {...interview, interviewer}
  }
  else {
    return null;
  }
}

export function getInterviewersForDay(state,day){
  let interViewerList = [];
  const daymatch = state.days.filter((Day) => Day.name === day);
  console.log('for interviewer',daymatch);
  if (!daymatch[0]) {
    return [];
  }
  for (let interviewer of daymatch [0].interviewers) {
    interViewerList.push(state.interviewers[interviewer]);
  }
 return interViewerList;
}

