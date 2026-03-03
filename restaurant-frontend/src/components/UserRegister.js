import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UserRegister.css";
import api from "../utils/api";   // ✅ use centralized api

function UserRegister() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    api.post("/users/register", {   // ✅ changed
      name,
      email,
      password
    })
    .then(() => {
      alert("Registration Successful ✅");
      navigate("/login");
    })
    .catch(err => {
      console.log(err);
      alert("Registration Failed ❌");
    });
  };

  return (
    <div className="register-page">

      <div className="register-box">
        <h2>User Registration</h2>

        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={registerUser}>
          Register
        </button>

        <button
          className="ghost-btn"
          onClick={() => navigate("/login")}
        >
          Go Back
        </button>

      </div>

    </div>
  );
}

export default UserRegister;