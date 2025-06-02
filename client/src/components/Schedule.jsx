import { useQuery } from '@apollo/client';
import { GET_SCHEDULES } from '../graphql/queries';
import { useUser } from '@clerk/clerk-react';

function ScheduleComponent() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading user info...</div>;
  }

  if (!user) {
    return <div>Please log in to see schedules.</div>;
  }

  const clerkId = user.id;

  const { data, loading, error } = useQuery(GET_SCHEDULES, {
    variables: { clerkId },
  });

  if (loading) return <div>Loading schedules...</div>;
  if (error) return <div>Error loading schedules: {error.message}</div>;

  return (
    <div>
      <h2>Your Schedules</h2>
      <ul>
        {data.getSchedules.map((schedule) => (
          <li key={schedule.id}>
            Week: {schedule.weekStart} - {schedule.weekEnd}
          </li>
        ))}
      </ul>
    </div>
  );
}
