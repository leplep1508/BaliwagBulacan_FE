import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // ✅ Hooks must ALWAYS run — no conditions above this line
  useEffect(() => {
    if (role !== "ADMIN") return; // safe: inside effect, not around it

    fetch("http://localhost:4000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setError("Failed to load users");
          return;
        }
        setUsers(data);
      })
      .catch(() => setError("Failed to load users"));
  }, [role, token]);

  // ✅ Now we can conditionally return UI
  if (role !== "ADMIN") {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        Access Denied
      </h2>
    );
  }

  if (error) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        {error}
      </h2>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Branch</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.username}>
              <td>{u.username}</td>
              <td>{u.fullName}</td>
              <td>{u.branch}</td>
              <td>{u.position}</td>
              <td>
                <Link to={`/users/update/${u.username}`}>Update</Link>
                <Link to={`/admin/edit/${u.username}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
