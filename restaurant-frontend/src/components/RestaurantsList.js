import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RestaurantsList.css";

function RestaurantsList() {

  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8001/restaurants/all")
      .then(res => setRestaurants(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="restaurants-page">

      <h2>Available Restaurants</h2>

      <div className="restaurants-grid">

        {restaurants.map(rest => (
          <div className="restaurant-card" key={rest.id}>

            <h3>{rest.name}</h3>

            <p><strong>Location:</strong> {rest.location}</p>
            <p><strong>Phone:</strong> {rest.phone}</p>
            <p><strong>Description:</strong> {rest.description}</p>

            {/* <button onClick={() => navigate("/view-food-items")}>
              View Menu
            </button> */}

          </div>
        ))}

      </div>

      <button
        className="ghost-btn"
        onClick={() => navigate("/user-home")}
      >
        ← Back To Home
      </button>

    </div>
  );
}

export default RestaurantsList;