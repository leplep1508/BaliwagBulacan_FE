import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import UserList from "./pages/UserList";
import UpdateUser from "./pages/UpdateUser";
import Profile from "./pages/Profile";   
import AdminEditUser from "./pages/AdminEditUser";


// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Router>

      {/* NAVIGATION BAR */}
      <nav style={{ padding: "10px", background: "#eee" }}>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/users" style={{ marginRight: "10px" }}>User List</Link>

            <Link to="/profile" style={{ marginRight: "10px" }}>My Profile</Link>

            {role === "ADMIN" && (
              <Link to="/create-user" style={{ marginRight: "10px" }}>Create User</Link>
            )}

            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>

      {/* ROUTES */}
      <Routes>

        {/* Default route → Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Protected Pages */}
        <Route
          path="/create-user"
          element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/update/:username"
          element={
            <ProtectedRoute>
              <UpdateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit/:username"
          element={
            <ProtectedRoute>
              <AdminEditUser />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}
