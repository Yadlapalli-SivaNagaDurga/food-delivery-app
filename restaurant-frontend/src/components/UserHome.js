import { useNavigate } from "react-router-dom";
import "../css/UserHome.css";

function UserHome() {

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  // ✅ Protect page
  if (!userEmail) {
    navigate("/login");
    return null;
  }

  const logout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="user-home">

      {/* ✅ NAVBAR */}
      <nav className="user-navbar">
        <div className="logo">Food Delivery</div>

        <div className="nav-links">
          <span onClick={() => navigate("/user-home")}>Home</span>

          <span onClick={() => navigate("/restaurants-list")}>
            Restaurants
          </span>

          <span onClick={() => navigate("/user-view-food-items")}>
            Food Items
          </span>

          <span onClick={() => navigate("/my-orders")}>
            My Orders
          </span>

          <span className="logout" onClick={logout}>
            Logout
          </span>
        </div>
      </nav>

      {/* ✅ WELCOME */}
      <section className="welcome">
        <h1>Welcome Back 👋</h1>
        <p>Discover & order your favorite meals</p>
        <h3>{userEmail}</h3>
      </section>

      {/* ✅ ACTION CARDS */}
      <section className="user-actions">

        <div className="action-card">
          <h3>View Restaurants</h3>
          <p>Explore available restaurants near you</p>

          <button onClick={() => navigate("/restaurants-list")}>
            Browse Restaurants
          </button>
        </div>

        <div className="action-card">
          <h3>View Food Items & Place Order</h3>
          <p>Check menus & available dishes</p>

          <button onClick={() => navigate("/user-view-food-items")}>
            Browse Food
          </button>
        </div>

        {/* <div className="action-card">
          <h3>Place Order</h3>
          <p>Add items to cart & order instantly</p>

          <button onClick={() => navigate("/view-food-items")}>
            Order Now
          </button>
        </div> */}

        <div className="action-card">
          <h3>View My Orders</h3>
          <p>Track your current & past orders</p>

          <button onClick={() => navigate("/my-orders")}>
            My Orders
          </button>
        </div>

      </section>

      {/* ✅ FOOTER */}
      <footer className="footer">
        <p>User Dashboard • Food Delivery App 🚀</p>
      </footer>

    </div>
  );
}

export default UserHome;