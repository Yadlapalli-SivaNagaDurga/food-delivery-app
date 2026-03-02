import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";   // ⭐ ADD
import "../css/UserOrders.css";
import api from "../utils/api";


function UserOrders() {

  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();   // ⭐ ADD

  const userEmail = localStorage.getItem("userEmail");

  const loadOrders = () => {
    api.get(`/orders/user/${userEmail}`)
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadOrders();

    const interval = setInterval(loadOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">

      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No Orders Yet</p>
      ) : (
        <div className="orders-container">

          {orders.map(order => (
            <div key={order.id} className="card">

              <h3>Order #{order.id}</h3>

              <p><b>Total:</b> ₹ {order.totalAmount}</p>

              <p>
                <b>Status:</b>
                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </p>

              {order.status === "ACCEPTED" && (
                <p>
                  <b>Delivery Time:</b> {order.deliveryTime} mins
                </p>
              )}

              {order.status === "REJECTED" && (
                <p className="rejected-msg">
                  Restaurant rejected your order ❌
                </p>
              )}

              {order.itemNames.map((item, i) => (
                <p key={i}>{item}</p>
              ))}

            </div>
          ))}

        </div>
      )}

      {/* ⭐ BACK BUTTON */}
      <div className="back-btn-container">
        <button
          className="ghost-btn"
          onClick={() => navigate("/user-home")}
        >
          ← Back To Home
        </button>
      </div>

    </div>
  );
}

export default UserOrders;