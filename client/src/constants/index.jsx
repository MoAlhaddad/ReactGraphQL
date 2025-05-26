import { User, ClipboardCheck, Building, UserPlus, Settings } from "lucide-react";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    links: [
      { label: "Home", icon: User, path: "/" },
      { label: "Onboarding Progress", icon: ClipboardCheck, path: "/onboarding" },
      { label: "Reports", icon: ClipboardCheck, path: "/reports" },
    ],
  },
  {
    title: "Employees",
    links: [
      { label: "All Employees", icon: UserPlus, path: "/employees" },
      { label: "New Employee", icon: UserPlus, path: "/new-employee" },
      { label: "Verified Employees", icon: UserPlus, path: "/verified-employees" },
    ],
  },
  {
    title: "Departments",
    links: [
      { label: "Departments", icon: Building, path: "/departments" },
      { label: "New Department", icon: Building, path: "/new-department" },
    ],
  },
  {
    title: "Settings",
    links: [
      { label: "Settings", icon: Settings, path: "/settings" },
    ],
  },
];

export const onboardingSteps = [
  "Welcome & Orientation",
  "Paperwork Completion",
  "System Access Setup",
  "Training Sessions",
  "Team Introduction",
  "First Week Review",
];

export const departmentList = [
  { id: "D001", name: "Engineering" },
  { id: "D002", name: "Marketing" },
  { id: "D003", name: "Human Resources" },
  { id: "D004", name: "Finance" },
];
