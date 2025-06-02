import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";

import Layout from "./routes/layout";
import DashboardPage from "./routes/dashboard/page";
import NewEmployeePage from "./routes/new-employee/page";
import SetUpSchedulePage from "./routes/set-up-schedule/page";
import SchedulePage from "./routes/schedule/page";
import MySchedulePage from "./routes/my-schedule/page";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "set-up-schedule",  // <-- new route here
                    element: <SetUpSchedulePage />,
                },
                  {
                    path: "/my-schedule",  // <-- new route here
                    element: <MySchedulePage />,
                },
                 {
                    path: "schedule",  // <-- new route here
                    element: <SchedulePage />,
                },
                {
                    path: "onboarding",
                    element: <h1 className="title">Onboarding Progress</h1>,
                },
                {
                    path: "reports",
                    element: <h1 className="title">Reports</h1>,
                },
                {
                    path: "employees",
                    element: <h1 className="title">All Employees</h1>,
                },
                {
                    path: "new-employee",
                    element: <NewEmployeePage/>
                },
                {
                    path: "verified-employees",
                    element: <h1 className="title">Verified Employees</h1>,
                },
                {
                    path: "departments",
                    element: <h1 className="title">Departments</h1>,
                },
                {
                    path: "new-department",
                    element: <h1 className="title">New Department</h1>,
                },
                {
                    path: "settings",
                    element: <h1 className="title">Settings</h1>,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
