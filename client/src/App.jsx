import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";

import Layout from "./routes/layout";
import DashboardPage from "./routes/dashboard/page";

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
                    element: <h1 className="title">New Employee</h1>,
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
