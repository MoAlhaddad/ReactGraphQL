import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const ScheduleSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    weekStart: {
      type: Date,
      required: true,
    },
    weekEnd: {
      type: Date,
      required: true,
    },
    shifts: [
      {
        date: Date,
        startTime: String,
        endTime: String,
        totalHours: Number,
      },
    ],
    tasks: [TaskSchema],
  },
  { timestamps: true }
);

export const Schedule = mongoose.model("Schedule", ScheduleSchema);
