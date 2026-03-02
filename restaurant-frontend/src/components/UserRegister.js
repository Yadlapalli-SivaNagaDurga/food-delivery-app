import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/UserRegister.css";

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

    axios.post("http://localhost:8001/users/register", {
      name,
      email,
      password
    })
    .then(() => {
      alert("Registration Successful ✅");

      // ✅ Redirect to your existing Login Page
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