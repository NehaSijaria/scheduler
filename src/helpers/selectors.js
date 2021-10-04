export function getAppointmentsForDay(state, day) {
  const arrOfAppt = [];
  const dayMatch = state.days.filter((day) => day.name === day);

  if(!dayMatch[0]) {
    return [];
  }
  
  for (let appt of dayMatch[0].appointments) {
    arrOfAppt.push(state.appointments[appt]);
  }

  return arrOfAppt;
}
