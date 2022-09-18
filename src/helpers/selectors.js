export function getAppointmentsForDay(state, day) {
  let resultArr = [];
  state.days.map((dayArr) => {
    if (dayArr.name === day) {
      dayArr.appointments.forEach((appt) => {
        resultArr.push(state.appointments[appt]);
      });
    }
    return null;
  });
  return resultArr;
}

export function getInterview(state, interview) {
  if (interview) {
    const interviewerName = state.interviewers[interview.interviewer];
    return { student: interview.student, interviewer: interviewerName };
  }
  return null;
}
