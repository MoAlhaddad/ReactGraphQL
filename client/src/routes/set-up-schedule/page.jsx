import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries";
import { CREATE_SCHEDULE } from "../../graphql/mutations";
import DashboardLayout from "../../layouts/dashboardlayout";
import { useState, useEffect } from "react";
import { CalendarCheck, Search } from "lucide-react";
import { Footer } from "../../layouts/footer";

const SetUpSchedulePage = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  const [createSchedule] = useMutation(CREATE_SCHEDULE);

  const [selectedUserClerkId, setSelectedUserClerkId] = useState("");
  const [weekStart, setWeekStart] = useState("");
  const [weekEnd, setWeekEnd] = useState("");
  const [shifts, setShifts] = useState([
    { date: "", startTime: "", endTime: "", totalHours: 0 },
  ]);
  const [tasks, setTasks] = useState([
    { title: "", description: "", isCompleted: false },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  // Validate shifts and tasks for enabling submit button
  useEffect(() => {
    const shiftsValid = shifts.every(
      (shift) =>
        shift.date.trim() !== "" &&
        shift.startTime.trim() !== "" &&
        shift.endTime.trim() !== "" &&
        shift.totalHours > 0
    );

    const tasksValid = tasks.some((task) => task.title.trim() !== "");

    setCanSubmit(
      selectedUserClerkId &&
        weekStart &&
        weekEnd &&
        shifts.length > 0 &&
        shiftsValid &&
        tasks.length > 0 &&
        tasksValid
    );
  }, [selectedUserClerkId, weekStart, weekEnd, shifts, tasks]);

  const handleShiftChange = (index, field, value) => {
    const updatedShifts = [...shifts];
    if (field === "totalHours") {
      updatedShifts[index][field] = Number(value);
    } else {
      updatedShifts[index][field] = value;
    }
    setShifts(updatedShifts);
  };

  const addShift = () => {
    setShifts([...shifts, { date: "", startTime: "", endTime: "", totalHours: 0 }]);
  };

  const removeShift = (index) => {
    setShifts(shifts.filter((_, i) => i !== index));
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    if (field === "isCompleted") {
      updatedTasks[index][field] = value;
    } else {
      updatedTasks[index][field] = value;
    }
    setTasks(updatedTasks);
  };

  const addTask = () => {
    setTasks([...tasks, { title: "", description: "", isCompleted: false }]);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      alert("Please fill all required fields with valid data.");
      return;
    }

    try {
      await createSchedule({
        variables: {
          clerkId: selectedUserClerkId,
          weekStart,
          weekEnd,
          shifts: shifts.filter(
            (s) =>
              s.date.trim() !== "" &&
              s.startTime.trim() !== "" &&
              s.endTime.trim() !== "" &&
              s.totalHours > 0
          ),
          tasks: tasks.filter((t) => t.title.trim() !== ""),
        },
      });
      alert("Schedule created successfully");

      // Reset form
      setSelectedUserClerkId("");
      setWeekStart("");
      setWeekEnd("");
      setShifts([{ date: "", startTime: "", endTime: "", totalHours: 0 }]);
      setTasks([{ title: "", description: "", isCompleted: false }]);
      setSearchTerm("");
    } catch (err) {
      console.error("Error creating schedule:", err);
      alert("Error creating schedule");
    }
  };

  const filteredUsers = (data?.getUsers || []).filter((user) =>
    `${user.name} ${user.position}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="title flex items-center gap-2 text-lg font-semibold">
          <CalendarCheck size={20} /> Set Up Employee Schedule
        </h1>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Employee Table */}
        <div className="card">
          <div className="card-header">
            <p className="card-title">Employees</p>
          </div>
          <div className="card-body p-0">
            <div className="overflow-auto max-h-[400px]">
              <table className="table">
                <thead className="table-header">
                  <tr className="table-row">
                    <th className="table-head">#</th>
                    <th className="table-head">Name</th>
                    <th className="table-head">Position</th>
                    <th className="table-head">Action</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={4} className="text-center text-red-500 py-4">
                        Failed to load employees.
                      </td>
                    </tr>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr key={user.id} className="table-row">
                        <td className="table-cell">{index + 1}</td>
                        <td className="table-cell"><img
                        src={user.photoUrl}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />{user.name}</td>
                        <td className="table-cell">{user.position}</td>
                        <td className="table-cell">
                          <button
                            onClick={() => setSelectedUserClerkId(user.clerkId)}
                            className={`px-3 py-1 rounded text-white text-sm ${
                              selectedUserClerkId === user.clerkId
                                ? "bg-green-600"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                          >
                            {selectedUserClerkId === user.clerkId ? "Selected" : "Select"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-500 py-4">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Schedule Form */}
        <form
          onSubmit={handleScheduleSubmit}
          className="flex flex-col gap-4 border rounded p-4 bg-white shadow-sm"
        >
          <h2 className="text-lg font-medium">Set Schedule for Selected Employee</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Week Start</label>
              <input
                type="date"
                className="w-full mt-1 border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                value={weekStart}
                onChange={(e) => setWeekStart(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Week End</label>
              <input
                type="date"
                className="w-full mt-1 border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                value={weekEnd}
                onChange={(e) => setWeekEnd(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Shifts</label>
            {shifts.map((shiftItem, idx) => (
              <div key={idx} className="grid grid-cols-5 gap-2 mb-2 items-center">
                <input
                  type="date"
                  placeholder="Date"
                  value={shiftItem.date}
                  onChange={(e) => handleShiftChange(idx, "date", e.target.value)}
className="border px-2 py-1 rounded"
required
/>
<input
type="time"
placeholder="Start"
value={shiftItem.startTime}
onChange={(e) => handleShiftChange(idx, "startTime", e.target.value)}
className="border px-2 py-1 rounded"
required
/>
<input
type="time"
placeholder="End"
value={shiftItem.endTime}
onChange={(e) => handleShiftChange(idx, "endTime", e.target.value)}
className="border px-2 py-1 rounded"
required
/>
<input
type="number"
placeholder="Hours"
value={shiftItem.totalHours}
onChange={(e) => handleShiftChange(idx, "totalHours", e.target.value)}
className="border px-2 py-1 rounded"
required
/>
<button
type="button"
onClick={() => removeShift(idx)}
className="text-red-600 hover:underline text-sm"
>
Remove
</button>
</div>
))}
<button type="button" onClick={addShift} className="text-blue-600 hover:underline text-sm mt-2" >
Add Shift
</button>
</div>
      <div>
        <label className="block text-sm font-medium mb-2">Tasks</label>
        {tasks.map((taskItem, idx) => (
          <div key={idx} className="grid grid-cols-4 gap-2 mb-2 items-center">
            <input
              type="text"
              placeholder="Title"
              value={taskItem.title}
              onChange={(e) => handleTaskChange(idx, "title", e.target.value)}
              className="border px-2 py-1 rounded"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={taskItem.description}
              onChange={(e) => handleTaskChange(idx, "description", e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <select
              value={taskItem.isCompleted}
              onChange={(e) =>
                handleTaskChange(idx, "isCompleted", e.target.value === "true")
              }
              className="border px-2 py-1 rounded"
            >
              <option value={false}>Not Completed</option>
              <option value={true}>Completed</option>
            </select>
            <button
              type="button"
              onClick={() => removeTask(idx)}
              className="text-red-600 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTask}
          className="text-blue-600 hover:underline text-sm mt-2"
        >
          Add Task
        </button>
      </div>

      <button
        type="submit"
        className={`btn-primary w-fit ${canSubmit ? "" : "opacity-50 cursor-not-allowed"}`}
        disabled={!canSubmit}
      >
        Create Schedule
      </button>
    </form>
  </div>
  <Footer />
</DashboardLayout>
  );
};

export default SetUpSchedulePage;