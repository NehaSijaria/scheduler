export function getAppointmentsForDay(state, day) {
  console.log('day!!', day)
  const arrOfAppt = [];
  const dayMatch = state.days.filter((days) => days.name === day);
  console.log("dayMatch", dayMatch)
  if(!dayMatch[0]) {
    return [];
  }
  
  for (let appt of dayMatch[0].appointments) {
    arrOfAppt.push(state.appointments[appt]);
  }

  return arrOfAppt;
}
