import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Form.css";
import api from "../utils/api";   // ✅ use centralized api

function Login() {

  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(null);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {

    if (!selectedRole) {
      alert("Please select login type");
      return;
    }

    const endpoint =
      selectedRole === "restaurant"
        ? "/restaurants/login"
        : "/users/login";

    try {

      const response = await api.post(endpoint, null, {   // ✅ changed
        params: loginData
      });

      if (response.data) {

        alert(`${selectedRole} Login Successful ✅`);
        console.log(response.data);

        if (selectedRole === "restaurant") {

          localStorage.setItem("restaurantEmail", response.data.email);
          navigate("/restaurant-home");

        } else {

          localStorage.setItem("userEmail", response.data.email);
          navigate("/user-home");
        }

      } else {
        alert("Invalid Credentials ❌");
      }

    } catch (error) {
      alert("Login Failed ❌");
      console.error(error);
    }
  };

  return (
    <div className="login-container">

      {!selectedRole ? (
        <>
          <h2>Select Login Type</h2>

          <button onClick={() => setSelectedRole("user")}>
            User Login
          </button>

          <button onClick={() => setSelectedRole("restaurant")}>
            Restaurant Login
          </button>

          <button
            className="ghost-btn"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
        </>
      ) : (
        <>
          <h2>
            {selectedRole.charAt(0).toUpperCase() +
              selectedRole.slice(1)} Login
          </h2>

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button onClick={handleLogin}>
            Login
          </button>

          <button
            className="ghost-btn"
            onClick={() => setSelectedRole(null)}
          >
            Change Login Type
          </button>
        </>
      )}

    </div>
  );
}

export default Login;