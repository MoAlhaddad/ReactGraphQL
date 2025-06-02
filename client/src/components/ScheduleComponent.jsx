import { useQuery } from "@apollo/client";
import { GET_SCHEDULES } from "../graphql/queries";

const FormatIso = (isoString) => {
  const date = new Date(isoString);
  if (isNaN(date)) return "Invalid Date";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const ScheduleComponent = () => {
  const { data, loading, error } = useQuery(GET_SCHEDULES, {
    variables: { clerkId: "user_2xt77p1zwVqZC4fOIwP7pDo3vAY" },
  });

  if (loading) return <div>Loading schedules...</div>;
  if (error) return <div>Error loading schedules: {error.message}</div>;

  const schedules = data?.getSchedules || [];

  return (
    <div>
    {schedules.map(schedule => (
      <div key={schedule._id}>
        <p>Week Start: {FormatIso(schedule.weekStart)}</p>
        <p>Week End: {FormatIso(schedule.weekEnd)}</p>
        <h4>Shifts:</h4>
        {schedule.shifts.map(shift => (
          <div key={shift._id}>
            <p>{FormatIso(shift.date)} | {shift.startTime} - {shift.endTime}</p>
          </div>
        ))}
        <h4>Tasks:</h4>
        {schedule.tasks.map(task => (
          <div key={task._id}>
            <p>{task.title} - {task.description}</p>
          </div>
        ))}
      </div>
    ))}
  </div>
  );
};

export default ScheduleComponent;
