import "../css/Home.css";
import { useNavigate } from "react-router-dom";

import hero from "../assets/hero.png";
import about from "../assets/section1.png";
import foods from "../assets/foodgrid.png";

function Home() {

  const navigate = useNavigate();   // ⭐ REQUIRED FOR NAVIGATION

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <img src={hero} alt="Food Banner" />

        <div className="hero-content">
          <h1>Delicious Food, Delivered Effortlessly</h1>
          <p>
            Discover top-rated restaurants, explore amazing dishes,
            and enjoy fast & reliable delivery right at your doorstep.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/register")}
            >
              Register
            </button>

            <button
              className="ghost-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <div className="about-text">
          <h2>A Modern Food Ordering Experience</h2>
          <p>
            Our Food Delivery App simplifies how you discover and order meals.
            From comfort food to gourmet cuisines, everything is just a few clicks away.
          </p>
          <p>
            Built for convenience, speed, and satisfaction — we connect you with
            the best restaurants while ensuring a seamless experience.
          </p>
        </div>

        <img src={about} alt="Restaurant Experience" />
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Why Users Love Our Platform</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🚀 Super Fast Delivery</h3>
            <p>Experience lightning-fast and reliable service.</p>
          </div>

          <div className="feature-card">
            <h3>🍽 Premium Restaurants</h3>
            <p>Only the best & trusted partners.</p>
          </div>

          <div className="feature-card">
            <h3>📱 Smooth Experience</h3>
            <p>Clean, intuitive & responsive interface.</p>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure Payments</h3>
            <p>Your transactions are fully protected.</p>
          </div>
        </div>
      </section>

      {/* FOOD SHOWCASE */}
      <section className="food-showcase">
        <h2>Explore Delicious Possibilities</h2>
        <p>Browse a variety of dishes curated for every taste.</p>
        <img src={foods} alt="Food Variety" />
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready To Satisfy Your Cravings?</h2>
        <button
          className="primary-btn"
          onClick={() => navigate("/restaurants")}
        >
          Start Ordering
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Food Delivery App • Crafted For Taste & Speed ✨</p>
      </footer>

    </div>
  );
}

export default Home;