import React, { useState } from "react";
import axios from "axios";

const CreateScheduleModal = ({ onCreated }) => {
  const [weekStart, setWeekStart] = useState("");
  const [weekEnd, setWeekEnd] = useState("");
  const [shifts, setShifts] = useState([
    { date: "", startTime: "", endTime: "", totalHours: 0 },
  ]);
  const [tasks, setTasks] = useState([
    { title: "", description: "", isCompleted: false },
  ]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShiftChange = (index, field, value) => {
    const newShifts = [...shifts];
    newShifts[index][field] = value;
    setShifts(newShifts);
  };

  const handleTaskChange = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const addShift = () => {
    setShifts([...shifts, { date: "", startTime: "", endTime: "", totalHours: 0 }]);
  };

  const addTask = () => {
    setTasks([...tasks, { title: "", description: "", isCompleted: false }]);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post("/api/schedules", {
        weekStart,
        weekEnd,
        shifts,
        tasks,
      });
      setShow(false);
      onCreated();
    } catch (err) {
      console.error("Failed to create schedule", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShow(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Create Schedule
      </button>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">New Schedule</h2>

            <label className="block mb-2">Week Start:</label>
            <input type="date" className="border p-2 w-full mb-4" value={weekStart} onChange={(e) => setWeekStart(e.target.value)} />

            <label className="block mb-2">Week End:</label>
            <input type="date" className="border p-2 w-full mb-4" value={weekEnd} onChange={(e) => setWeekEnd(e.target.value)} />

            <h3 className="text-lg font-semibold mb-2">Shifts</h3>
            {shifts.map((shift, i) => (
              <div key={i} className="border p-3 mb-3 rounded">
                <input type="date" className="border p-1 w-full mb-1" value={shift.date} onChange={(e) => handleShiftChange(i, "date", e.target.value)} />
                <input type="text" placeholder="Start Time" className="border p-1 w-full mb-1" value={shift.startTime} onChange={(e) => handleShiftChange(i, "startTime", e.target.value)} />
                <input type="text" placeholder="End Time" className="border p-1 w-full mb-1" value={shift.endTime} onChange={(e) => handleShiftChange(i, "endTime", e.target.value)} />
                <input type="number" placeholder="Total Hours" className="border p-1 w-full mb-1" value={shift.totalHours} onChange={(e) => handleShiftChange(i, "totalHours", Number(e.target.value))} />
              </div>
            ))}
            <button onClick={addShift} className="text-blue-600 mb-4">+ Add Shift</button>

            <h3 className="text-lg font-semibold mb-2">Tasks</h3>
            {tasks.map((task, i) => (
              <div key={i} className="border p-3 mb-3 rounded">
                <input type="text" placeholder="Title" className="border p-1 w-full mb-1" value={task.title} onChange={(e) => handleTaskChange(i, "title", e.target.value)} />
                <textarea placeholder="Description" className="border p-1 w-full mb-1" value={task.description} onChange={(e) => handleTaskChange(i, "description", e.target.value)} />
              </div>
            ))}
            <button onClick={addTask} className="text-blue-600 mb-4">+ Add Task</button>

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Schedule"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateScheduleModal;