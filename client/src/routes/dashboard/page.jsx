
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries";
import { UPDATE_USER, DELETE_USER } from "../../graphql/mutations";
import { useTheme } from "../../hooks/use-theme";
import { Footer } from "../../layouts/footer";
import EditUserModal from "../../components/EditUserModal";

import {
  CalendarCheck,
  ClipboardList,
  UserCog,
  PencilLine,
  Trash,
  TrendingUp,
  Search,
} from "lucide-react";
import { useState } from "react";

const DashboardPage = () => {
  const { theme } = useTheme();
  const { data, loading, error } = useQuery(GET_USERS);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    age: "",
    isMarried: false,
  });

  const [maritalFilter, setMaritalFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");


  //function to filter users
  // Filter & Sort logic
  const filteredUsers = (data?.getUsers || [])
    .filter((user) => {
      const fullText = `${user.name} ${user.position} ${user.email}`.toLowerCase();
      const matchesSearch = fullText.includes(searchTerm.toLowerCase());

      const matchesMarital =
        maritalFilter === "all"
          ? true
          : maritalFilter === "married"
          ? user.isMarried
          : !user.isMarried;

      return matchesSearch && matchesMarital;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "age-asc") return a.age - b.age;
      if (sortBy === "age-desc") return b.age - a.age;
      return 0;
    });


  // When edit button clicked, open modal and set form data
  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      position: user.position || "",
      age: user.age?.toString() || "",
      isMarried: user.isMarried || false,
    });
  };

  const handleCloseModal = () => {
    setEditingUser(null);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit the update mutation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        variables: {
          id: editingUser.id,
          name: formData.name,
          position: formData.position,
          age: Number(formData.age),
          isMarried: formData.isMarried,
        },
        refetchQueries: [{ query: GET_USERS }],
      });
      setEditingUser(null);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  // Delete user handler
  const handleDeleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser({
        variables: { id },
        refetchQueries: [{ query: GET_USERS }],
      });
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
    <h1 className="title">Dashboard</h1>

    {/* Cards Section */}
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/*Need to add cards */}
    </div>

    {/* Chart & Info Section */}
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
      {/*Need to add charts */}
    </div>

    {/* Search Filter Input */}
     {/* Filters */}
     <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        {/* Search */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Marital Status Filter */}
        <select
          value={maritalFilter}
          onChange={(e) => setMaritalFilter(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="all">All Statuses</option>
          <option value="married">Married</option>
          <option value="single">Single</option>
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="name">Sort by Name (A-Z)</option>
          <option value="age-asc">Sort by Age ↑</option>
          <option value="age-desc">Sort by Age ↓</option>
        </select>
      </div>

    {/* Employees Table */}
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
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-red-500">
                    Error loading data
                  </td>
                </tr>
              ) : filteredUsers?.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <tr key={user.id || idx} className="table-row">
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
                          user.isMarried
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {user.isMarried ? "Married" : "Single"}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <PencilLine
                          onClick={() => handleEditUser(user)}
                          className="cursor-pointer text-blue-500 hover:text-blue-700"
                          size={18}
                        />
                        <Trash
                          onClick={() => handleDeleteUser(user.id)}
                          className="cursor-pointer text-red-500 hover:text-red-700"
                          size={18}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Edit User Modal */}
    {editingUser && (
      <EditUserModal
        formData={formData}
        onChange={handleChange}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    )}

    <Footer />
  </div>

  );
};

export default DashboardPage;
