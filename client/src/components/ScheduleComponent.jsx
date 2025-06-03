import { useQuery, useMutation } from "@apollo/client";
import { GET_SCHEDULES } from "../graphql/queries";
import { DELETE_SCHEDULE, UPDATE_SCHEDULE } from "../graphql/mutations";
import {
  Card,
  Text,
  Heading,
  Flex,
  Separator,
  Button,
} from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";
import "@radix-ui/themes/styles.css";
import { useState } from "react";

// Format timestamp to YYYY-MM-DD
const FormatIso = (timestamp) => {
  const numericTimestamp = Number(timestamp);
  if (isNaN(numericTimestamp)) return "Invalid Date";

  const date = new Date(numericTimestamp);
  if (isNaN(date.getTime())) return "Invalid Date";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const ScheduleComponent = () => {
  const { data, loading, error, refetch } = useQuery(GET_SCHEDULES);
  const [deleteSchedule, { loading: deleting }] = useMutation(DELETE_SCHEDULE);
  const [updateSchedule, { loading: updating }] = useMutation(UPDATE_SCHEDULE);

  const [editingSchedule, setEditingSchedule] = useState(null);
  const [form, setForm] = useState({ weekStart: "", weekEnd: "" });

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this schedule?");
    if (!confirmed) return;

    try {
      await deleteSchedule({ variables: { id } });
      await refetch();
      alert("Schedule deleted.");
    } catch (err) {
      console.error(err);
      alert("Error deleting schedule");
    }
  };

  const handleEditClick = (schedule) => {
    setEditingSchedule(schedule);
    setForm({
      weekStart: FormatIso(schedule.weekStart),
      weekEnd: FormatIso(schedule.weekEnd),
    });
  };

  const handleUpdate = async () => {
    const start = new Date(form.weekStart);
    const end = new Date(form.weekEnd);

    if (isNaN(start) || isNaN(end)) {
      alert("Please enter valid dates.");
      return;
    }

    if (start > end) {
      alert("End date must be after start date.");
      return;
    }

    try {
      await updateSchedule({
        variables: {
          id: editingSchedule.id,
          weekStart: start.getTime().toString(),
          weekEnd: end.getTime().toString(),
        },
      });
      setEditingSchedule(null);
      await refetch();
      alert("Schedule updated!");
    } catch (err) {
      console.error(err);
      alert("Error updating schedule");
    }
  };

  if (loading) return <Text>Loading schedules...</Text>;
  if (error) return <Text color="red">Error loading schedules: {error.message}</Text>;

  const schedules = data?.getSchedules || [];

  return (
    <Flex direction="column" gap="4" p="4" className="bg-background min-h-screen">
      {schedules.length === 0 && (
        <Text size="3" color="gray" align="center">
          No schedules found.
        </Text>
      )}

      {schedules.map((schedule) => (
        <Card key={schedule.id} variant="surface" size="3" className="shadow-md dark:shadow-lg">
          <Flex align="center" gap="4" mb="4">
            <Avatar.Root className="inline-flex items-center justify-center rounded-full overflow-hidden w-10 h-10 bg-gray-100">
              {schedule.user?.photoUrl ? (
                <Avatar.Image
                  className="w-full h-full object-cover"
                  src={schedule.user.photoUrl}
                  alt={`${schedule.user.name}'s avatar`}
                />
              ) : (
                <Avatar.Fallback
                  className="text-gray-600 font-semibold flex items-center justify-center w-full h-full"
                  delayMs={600}
                >
                  {schedule.user?.name?.[0] ?? "?"}
                </Avatar.Fallback>
              )}
            </Avatar.Root>

            <Flex direction="column" gap="0">
              <Text size="3" weight="semibold">{schedule.user?.name ?? "Unknown User"}</Text>
              <Text size="2" color="gray">{schedule.user?.email ?? "No email"}</Text>
            </Flex>
          </Flex>

          <Heading size="4" mb="2" className="text-primary">Weekly Schedule</Heading>

          <Flex justify="between" mb="3">
            <Text size="2">📅 Start: <strong>{FormatIso(schedule.weekStart)}</strong></Text>
            <Text size="2">📅 End: <strong>{FormatIso(schedule.weekEnd)}</strong></Text>
          </Flex>

          <Separator my="2" />

          <Heading size="3" mb="1">Shifts</Heading>
          {schedule.shifts.length > 0 ? (
            schedule.shifts.map((shift) => (
              <Text key={shift.id} as="p" size="2" className="text-muted-foreground">
                🕒 {FormatIso(shift.date)} | {shift.startTime} - {shift.endTime}
              </Text>
            ))
          ) : (
            <Text size="2" color="gray">No shifts available.</Text>
          )}

          <Separator my="2" />

          <Heading size="3" mb="1">Tasks</Heading>
          {schedule.tasks.length > 0 ? (
            schedule.tasks.map((task) => (
              <Text key={task.id} as="p" size="2">
                ✅ <strong>{task.title}</strong>: {task.description}
              </Text>
            ))
          ) : (
            <Text size="2" color="gray">No tasks assigned.</Text>
          )}

          <Flex gap="2" mt="4">
            <Button onClick={() => handleEditClick(schedule)} disabled={updating || deleting}>Edit</Button>
            <Button color="red" onClick={() => handleDelete(schedule.id)} disabled={deleting || updating}>Delete</Button>
          </Flex>
        </Card>
      ))}

      {/* Modal */}
      {editingSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <Card size="4" className="bg-white w-full max-w-sm mx-auto rounded-lg p-6 shadow-xl">
            <Heading size="4" mb="3">Edit Schedule</Heading>
            <Flex direction="column" gap="3">
              <input
                type="date"
                value={form.weekStart}
                onChange={(e) => setForm({ ...form, weekStart: e.target.value })}
                className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full"
              />
              <input
                type="date"
                value={form.weekEnd}
                onChange={(e) => setForm({ ...form, weekEnd: e.target.value })}
                className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full"
              />
              <Flex gap="2" mt="3">
                <Button onClick={handleUpdate} disabled={updating}>Save</Button>
                <Button color="gray" onClick={() => setEditingSchedule(null)} disabled={updating}>Cancel</Button>
              </Flex>
            </Flex>
          </Card>
        </div>
      )}
    </Flex>
  );
};

export default ScheduleComponent;
