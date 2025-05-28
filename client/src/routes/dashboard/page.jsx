import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  import { useQuery } from "@apollo/client";
  import { GET_USERS } from "../../graphql/queries";
  import { useTheme } from "../../hooks/use-theme";
  import { Footer } from "../../layouts/footer";
  
  import {
    CalendarCheck,
    ClipboardList,
    UserCog,
    PencilLine,
    Trash,
    TrendingUp,
  } from "lucide-react";
  
  const DashboardPage = () => {
    const { theme } = useTheme();
    const { data, loading, error } = useQuery(GET_USERS);
  
    return (
      <div className="flex flex-col gap-y-4">
        <h1 className="title">Dashboard</h1>
  
        {/* Cards Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Total Scheduled Tasks */}
          <div className="card">
            <div className="card-header">
              <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                <ClipboardList size={26} />
              </div>
              <p className="card-title">Scheduled Tasks</p>
            </div>
            <div className="card-body bg-slate-100 dark:bg-slate-950">
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">25</p>
              <span className="flex items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 text-blue-500 dark:border-blue-600 dark:text-blue-600">
                <TrendingUp size={18} /> 25%
              </span>
            </div>
          </div>
  
          {/* Completed Projects */}
          <div className="card">
            <div className="card-header">
              <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                <CalendarCheck size={26} />
              </div>
              <p className="card-title">Completed Projects</p>
            </div>
            <div className="card-body bg-slate-100 dark:bg-slate-950">
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">16</p>
              <span className="flex items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 text-blue-500 dark:border-blue-600 dark:text-blue-600">
                <TrendingUp size={18} /> 12%
              </span>
            </div>
          </div>
  
          {/* Active Staff */}
          <div className="card">
            <div className="card-header">
              <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                <UserCog size={26} />
              </div>
              <p className="card-title">Active Staff</p>
            </div>
            <div className="card-body bg-slate-100 dark:bg-slate-950">
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">42</p>
              <span className="flex items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 text-blue-500 dark:border-blue-600 dark:text-blue-600">
                <TrendingUp size={18} /> 15%
              </span>
            </div>
          </div>
  
          {/* Scheduled Events */}
          <div className="card">
            <div className="card-header">
              <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                <CalendarCheck size={26} />
              </div>
              <p className="card-title">Upcoming Events</p>
            </div>
            <div className="card-body bg-slate-100 dark:bg-slate-950">
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">12</p>
              <span className="flex items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 text-blue-500 dark:border-blue-600 dark:text-blue-600">
                <TrendingUp size={18} /> 19%
              </span>
            </div>
          </div>
        </div>
  
        {/* Chart & Info Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Area Chart */}
          <div className="card col-span-1 md:col-span-2 lg:col-span-4">
            <div className="card-header">
              <p className="card-title">Project Overview</p>
            </div>
            <div className="card-body p-0">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip cursor={false} formatter={(value) => `${value}`} />
                  <XAxis
                    dataKey="name"
                    strokeWidth={0}
                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                    tickMargin={6}
                  />
                  <YAxis
                    dataKey="total"
                    strokeWidth={0}
                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                    tickMargin={6}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#2563eb"
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
  
          {/* Upcoming Schedules */}
          <div className="card col-span-1 md:col-span-2 lg:col-span-3">
            <div className="card-header">
              <p className="card-title">Upcoming Schedules</p>
            </div>
            <div className="card-body h-[300px] overflow-auto p-4">
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </div>
        </div>
  
        {/* Employees Table - Unchanged */}
        <div className="card">
          <div className="card-header">
            <p className="card-title">Employees</p>
          </div>
          <div className="card-body p-0">
            <div className="relative h-[500px] overflow-auto">
              <table className="table">
                <thead className="table-header">
                  <tr className="table-row">
                    <th className="table-head">#</th>
                    <th className="table-head">Name</th>
                    <th className="table-head">Position</th>
                    <th className="table-head">Age</th>
                    <th className="table-head">Status</th>
                    <th className="table-head">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {loading ? (
                    <tr><td colSpan={6} className="text-center py-4">Loading...</td></tr>
                  ) : error ? (
                    <tr><td colSpan={6} className="text-center py-4 text-red-500">Error loading data</td></tr>
                  ) : (
                    data?.getUsers?.map((user, idx) => (
                      <tr key={idx} className="table-row">
                        <td className="table-cell">{idx + 1}</td>
                        <td className="table-cell flex items-center gap-2">
                          <img
                            src={user.photoUrl}
                            alt={user.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          {user.name}
                        </td>
                        <td className="table-cell">{user.position}</td>
                        <td className="table-cell">{user.age}</td>
                        <td className="table-cell">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                              user.isMarried ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {user.isMarried ? "Married" : "Single"}
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center gap-2">
                            <PencilLine className="cursor-pointer text-blue-500 hover:text-blue-700" size={18} />
                            <Trash className="cursor-pointer text-red-500 hover:text-red-700" size={18} />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
        <Footer />
      </div>
    );
  };
  
  export default DashboardPage;
  