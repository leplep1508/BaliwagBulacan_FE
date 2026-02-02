import { useState } from "react";

export default function CreateUser() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    fullName: "",
    address: "",
    position: "",
    branch: "",
    role: "",   // ✅ added role
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

    const role = localStorage.getItem("role");

    if (role !== "ADMIN") {
      return (
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Access Denied
        </h2>
      );
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data?.message || "Failed to create user");
        return;
      }

      setSuccess("User created successfully!");
      setForm({
        username: "",
        password: "",
        fullName: "",
        address: "",
        position: "",
        branch: "",
        role: "",   // reset role
      });
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server");
    }
  };

  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", width: "350px" }}>
        <h2>Create User</h2>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <select
          name="branch"
          value={form.branch}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="">Select Branch</option>
          <option value="Baliwag">Baliwag</option>
          <option value="Malolos">Malolos</option>
          <option value="San Rafael">San Rafael</option>
          <option value="Plaridel">Plaridel</option>
        </select>

        {/* ⭐ ROLE DROPDOWN */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="">Select Role</option>
          <option value="ADMIN">Admin</option>
          <option value="STAFF">Staff</option>
        </select>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Create User
        </button>
      </form>
    </div>
  );
}
