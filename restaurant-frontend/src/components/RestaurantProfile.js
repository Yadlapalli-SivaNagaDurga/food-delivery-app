import { useState, useEffect } from "react";
import "../css/RestaurantProfile.css";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";   // ✅ use centralized api

function RestaurantProfile() {

  const navigate = useNavigate();
  const email = localStorage.getItem("restaurantEmail");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    phone: "",
    description: ""
  });

  useEffect(() => {

    if (!email) {
      alert("No restaurant logged in ❌");
      navigate("/login");
      return;
    }

    api.get(`/restaurants/profile/${email}`)   // ✅ changed
      .then(response => {

        console.log("PROFILE RESPONSE:", response.data);

        if (response.data) {
          setProfile({
            ...response.data,
            email: email
          });
        }
      })
      .catch(error => {
        console.log("Fetch failed:", error);
      });

  }, [email, navigate]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = () => {

    api.put(`/restaurants/profile/${email}`, {   // ✅ changed
      name: profile.name,
      location: profile.location,
      phone: profile.phone,
      description: profile.description
    })
    .then(response => {
      console.log("UPDATE RESPONSE:", response.data);
      alert("Profile Updated Successfully ✅");
    })
    .catch(error => {
      console.log("UPDATE ERROR:", error);
      alert("Profile Update Failed ❌");
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Restaurant Profile</h1>

        <label>Restaurant Name</label>
        <input name="name" value={profile.name || ""} onChange={handleChange} />

        <label>Email</label>
        <input name="email" value={profile.email || ""} disabled />

        <label>Location</label>
        <input name="location" value={profile.location || ""} onChange={handleChange} />

        <label>Phone Number</label>
        <input name="phone" value={profile.phone || ""} onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" value={profile.description || ""} onChange={handleChange} />

        <button onClick={handleUpdate}>Update Profile</button>

        <button className="ghost-btn" onClick={() => navigate("/restaurant-home")}>
          Go To Home
        </button>
      </div>
    </div>
  );
}

export default RestaurantProfile;