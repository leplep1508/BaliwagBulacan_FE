import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdateUser() {
  const { username } = useParams();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    position: "",
    branch: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          fullName: data.fullName,
          address: data.address,
          position: data.position,
          branch: data.branch,
        });
      });
  }, [username]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, ...form }),
    });

    if (response.ok) {
      setMessage("User updated successfully");
    } else {
      setMessage("Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update User: {username}</h2>

      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position"
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

        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Update User
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
