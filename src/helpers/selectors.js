export function getAppointmentsForDay(state, day) {
  let resultArr = [];
  state.days.map((dayObj) => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach((appt) => {
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

export function getInterviewersForDay(state, day) {
  let interviewerArr = [];
  state.days.map((dayObj) => {
    if (dayObj.name === day) {
      dayObj.interviewers.forEach((interviewer) => {
        interviewerArr.push(state.interviewers[interviewer]);
      });
    }
    return interviewerArr;
  });
  return interviewerArr;
}
