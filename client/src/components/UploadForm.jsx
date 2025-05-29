import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function EmployeePhotoUploader() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Form fields state
  const [form, setForm] = useState({
    name: "",
    age: "",
    isMarried: false,
    email: "",
    phone: "",
    position: "",
    department: "",
    dateOfHire: "",
    address: "",
    ssn: "",
    bankAccount: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result.replace(/^data:image\/\w+;base64,/, "");

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              image: base64Image,
            }),
          }
        );

        const data = await res.json();

        if (data.success) {
          setImageUrl(data.data.url);
        } else {
          alert("Upload failed: " + data.error.message);
        }
      } catch (error) {
        alert("Error: " + error.message);
      } finally {
        setUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image first.");
      return;
    }

    // Prepare variables for GraphQL mutation, converting age to int and dateOfHire to string if needed
    const variables = {
      ...form,
      age: parseInt(form.age),
      isMarried: form.isMarried,
      photoUrl: imageUrl,
    };

    // Call your GraphQL mutation here
    // Example using fetch, replace with your Apollo client if you use it

    const mutation = `
      mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!, $email: String!, $phone: String!, $position: String!, $department: String!, $dateOfHire: String!, $address: String!, $ssn: String!, $bankAccount: String!, $photoUrl: String!) {
        createUser(
          name: $name,
          age: $age,
          isMarried: $isMarried,
          email: $email,
          phone: $phone,
          position: $position,
          department: $department,
          dateOfHire: $dateOfHire,
          address: $address,
          ssn: $ssn,
          bankAccount: $bankAccount,
          photoUrl: $photoUrl
        ) {
          id
          name
          photoUrl
        }
      }
    `;

    try {
      const res = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      });

      const json = await res.json();

      if (json.errors) {
        alert("Error: " + json.errors[0].message);
      } else {
        alert("User created successfully!");
        // Optionally reset form here
        navigate("/");

      }
    } catch (error) {
      alert("Submission error: " + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-bold mb-4 text-black">Upload Image for Employee ID</h2>
  
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="mb-4 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00FF9F]"
    />
  
    {uploading && <p className="text-sm text-gray-500 mb-4">Uploading image...</p>}
  
    {imageUrl && (
      <div className="mb-6">
        <p className="text-sm text-black">Employee Id Photo:</p>
      
        <img src={imageUrl} alt="Uploaded" className="mt-2 max-w-xs rounded-lg border border-gray-300" />
      </div>
    )}
  
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="input-field"
        />
        <input
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          className="input-field"
        />
        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="input-field"
        />
        <label htmlFor="dateOfHire" className="block text-sm font-medium text-black mb-1">
    Date of Hire
  </label>
        <input
          name="dateOfHire"
          type="date"
          value={form.dateOfHire}
          onChange={handleChange}
          className="input-field"
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="input-field"
        />
        <input
          name="ssn"
          placeholder="SSN"
          value={form.ssn}
          onChange={handleChange}
          className="input-field"
        />
        <input
          name="bankAccount"
          placeholder="Bank Account"
          value={form.bankAccount}
          onChange={handleChange}
          className="input-field"
        />
      </div>
  
      <label className="flex items-center space-x-2 text-black">
        <input
          name="isMarried"
          type="checkbox"
          checked={form.isMarried}
          onChange={handleChange}
          className="accent-[#00FF9F]"
        />
        <span>Married</span>
      </label>
  
      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-black text-[#00FF9F] font-bold py-2 px-4 rounded hover:bg-[#00FF9F] hover:text-black transition duration-300 disabled:opacity-50"
      >
        Create User
      </button>
    </form>
  </div>
  
  );
}
