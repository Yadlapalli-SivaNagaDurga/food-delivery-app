import "../css/RestaurantHome.css";
import { useNavigate } from "react-router-dom";

function RestaurantHome() {

  const navigate = useNavigate();

  return (
    <div className="restaurant-home">

      <nav className="home-navbar">
        <div className="logo">My Restaurant</div>

        <div className="nav-links">
          <span>Home</span>
          <span onClick={() => navigate("/view-food-items")}>
            Food Items
          </span>
          <span onClick={() => navigate("/restaurant-orders")}>Orders</span>

          <span onClick={() => navigate("/restaurant-profile")}>
            Profile
          </span>

          <span
            className="logout"
            onClick={() => navigate("/")}
          >
            Logout
          </span>
        </div>
      </nav>

      <section className="welcome-section">
        <h1>Welcome Back 👋</h1>
        <p>Manage your restaurant, menu, and orders from here.</p>
      </section>

      <section className="actions">

        <div className="action-card">
          <h3>Add Food Item</h3>
          <p>Create and publish new dishes.</p>

          <button onClick={() => navigate("/add-food-item")}>
            Add Now
          </button>
        </div>

        <div className="action-card">
          <h3>View Food Items</h3>
          <p>Edit or remove existing items.</p>

          <button onClick={() => navigate("/view-food-items")}>
            View Items
          </button>
        </div>

        <div className="action-card">
          <h3>Manage Orders</h3>
          <p>Track & update customer orders.</p>
          <button onClick={() => navigate("/restaurant-orders")}>View Orders</button>
        </div>

        <div className="action-card">
          <h3>Restaurant Profile</h3>
          <p>Update details & settings.</p>

          <button onClick={() => navigate("/restaurant-profile")}>
            Edit Profile
          </button>
        </div>

      </section>

      <footer className="footer">
        <p>Restaurant Panel • Food Delivery App 🚀</p>
      </footer>

    </div>
  );
}

export default RestaurantHome;