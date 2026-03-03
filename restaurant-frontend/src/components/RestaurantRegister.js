import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Form.css";
import api from "../utils/api";   // ✅ use centralized api

function RestaurantRegister() {

  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    phone: "",
    description: ""
  });

  const handleChange = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(   // ✅ changed
        "/restaurants/register",
        restaurant
      );

      alert("Restaurant Registered Successfully ✅");

      console.log(response.data);

      setRestaurant({
        name: "",
        email: "",
        password: "",
        location: "",
        phone: "",
        description: ""
      });

    } catch (error) {
      alert("Registration Failed ❌");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Restaurant Registration</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Restaurant Name"
          value={restaurant.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={restaurant.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={restaurant.password}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={restaurant.location}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={restaurant.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={restaurant.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

      </form>

      <p style={{ marginTop: "15px" }}>
        Already registered?
      </p>

      <button
        className="ghost-btn"
        onClick={() => navigate("/login")}
      >
        Go To Login
      </button>
    </div>
  );
}

export default RestaurantRegister;