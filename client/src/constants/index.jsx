// navConfig.js
import { User, ClipboardCheck, UserPlus } from "lucide-react";

// Admin-only nav
export const ADMIN_NAV_ITEMS = [
  {
    title: "Dashboard",
    links: [
      { label: "All Schedules", icon: ClipboardCheck, path: "/dashboard" },
    ],
  },
  {
    title: "Employees",
    links: [
      { label: "Add Employee", icon: UserPlus, path: "/new-employee" },
    ],
  },
];

// Employee nav
export const EMPLOYEE_NAV_ITEMS = [
  {
    title: "Dashboard",
    links: [
      { label: "My Schedule", icon: ClipboardCheck, path: "/dashboard" },
    ],
  },
];
