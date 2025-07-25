"use client";

import * as React from "react";

import TimePickerDemo from "./time-picker-demo";

export default function DateTimePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="p-3 border-t border-border">
      <TimePickerDemo setDate={setDate} date={date} />
    </div>
  );
}
