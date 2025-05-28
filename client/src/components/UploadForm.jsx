import React, { useState } from "react";

export default function EmployeePhotoUploader() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

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
          `https://api.imgbb.com/1/upload?key=040921fe37f28000f2e08881d5004e53`,
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
      }
    } catch (error) {
      alert("Submission error: " + error.message);
    }
  };

  return (
    <div>
      <h2>Upload Image to ImgBB and Create User</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p>Uploading image...</p>}
      {imageUrl && (
        <div>
          <p>Uploaded Image URL:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
          <br />
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "300px", marginTop: "10px" }} />
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
        <label>
          Married: 
          <input name="isMarried" type="checkbox" checked={form.isMarried} onChange={handleChange} />
        </label>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="position" placeholder="Position" value={form.position} onChange={handleChange} />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <input name="dateOfHire" type="date" placeholder="Date Of Hire" value={form.dateOfHire} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="ssn" placeholder="SSN" value={form.ssn} onChange={handleChange} />
        <input name="bankAccount" placeholder="Bank Account" value={form.bankAccount} onChange={handleChange} />

        <button type="submit" disabled={uploading}>Create User</button>
      </form>
    </div>
  );
}
