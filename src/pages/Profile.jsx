import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:4000/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setError("Failed to load profile"));
  }, [token]);

  const handleSave = () => {
    setError("");
    setSuccess("");

    if (user.newPassword && user.newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    fetch("http://localhost:4000/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(() => setSuccess("Profile updated successfully"))
      .catch(() => setError("Failed to update profile"));
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>My Profile</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <label>Full Name</label>
      <input
        value={user.fullName}
        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Branch</label>
      <input
        value={user.branch}
        onChange={(e) => setUser({ ...user, branch: e.target.value })}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Position</label>
      <input
        value={user.position}
        onChange={(e) => setUser({ ...user, position: e.target.value })}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>New Password</label>
      <input
        type="password"
        onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Confirm Password</label>
      <input
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handleSave} style={{ width: "100%", padding: "10px" }}>
        Save Changes
      </button>
    </div>
  );
}
