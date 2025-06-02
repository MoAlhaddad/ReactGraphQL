import { useQuery } from "@apollo/client";
import { GET_SCHEDULES } from "../graphql/queries";
import { Card, Text, Heading, Flex, Separator } from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";
import "@radix-ui/themes/styles.css";

// Format timestamp to YYYY-MM-DD
const FormatIso = (timestamp) => {
  const numericTimestamp = Number(timestamp);
  const date = new Date(numericTimestamp);

  if (isNaN(date)) return "Invalid Date";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const ScheduleComponent = () => {
  const { data, loading, error } = useQuery(GET_SCHEDULES); // 🔧 removed variables

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
        </Card>
      ))}
    </Flex>
  );
};

export default ScheduleComponent;
