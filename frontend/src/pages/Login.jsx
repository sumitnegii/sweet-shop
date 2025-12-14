import { useState } from "react";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });

      // backend returns token here>>>>>>>>
      const token = res.data.token;

      // decode minimal user info 
      login(token, { email });

      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <p>
  Don’t have an account? <a href="/register">Register</a>
</p>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>

    
  );
}



