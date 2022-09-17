import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayArray = props.day.map((days) => {
    return (
      <DayListItem
        key={days.id}
        name={days.name}
        spots={days.spots}
        selected={days.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return <ul>{dayArray}</ul>;
}
