import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <b>Sweet Shop</b>

      <span style={{ marginLeft: 20 }}>
        {user && <Link to="/">Dashboard</Link>}
      </span>

      {user?.isAdmin && (
        <span style={{ marginLeft: 10 }}>
          <Link to="/admin">Admin</Link>
        </span>
      )}

      <span style={{ float: "right" }}>
        {!user && (
          <>
            <Link to="/login">Login</Link>{" "}
            <Link to="/register" style={{ marginLeft: 10 }}>
              Register
            </Link>
          </>
        )}

        {user && (
          <button onClick={handleLogout} style={{ marginLeft: 10 }}>
            Logout
          </button>
        )}
      </span>
    </nav>
  );
}
