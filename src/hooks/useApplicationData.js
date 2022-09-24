import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviwers: {},
  });
  const setDay = (day) => setState({ ...state, day });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });

    setLoading(false);
    // eslint-disable-next-line
  }, []);
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const weekDay = state.days.find((day) => {
      return day.appointments.includes(id);
    });
    const newDays = state.days.map((day) => {
      if (
        day.name === weekDay.name &&
        state.appointments[id].interview === null
      ) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });

    return axios
      .put(`/api/appointments/${id}`, {
        interview: interview,
      })
      .then(() => {
        setState({
          ...state,
          appointments,
          days: newDays,
        });
      });
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const weekDay = state.days.find((day) => day.appointments.includes(id));
    const newDays = state.days.map((day) => {
      if (day.name === weekDay.name) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments, days: newDays });
    });
  };
  return { state, setDay, bookInterview, cancelInterview, loading };
}
