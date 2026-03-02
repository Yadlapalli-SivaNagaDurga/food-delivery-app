import axios from "axios";
import { useEffect, useState } from "react";
import "../css/RestaurantOrders.css";
import api from "../utils/api";



function RestaurantOrders() {

  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    api.get("/orders/all")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadOrders();

    // ⭐ AUTO REFRESH (SIMULATES REALTIME DASHBOARD)
    const interval = setInterval(loadOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  // ✅ ACCEPT ORDER
  const acceptOrder = (id) => {

    const time = prompt("Enter Delivery Time (minutes)");

    if (!time) return;

    axios.put(`http://localhost:8001/orders/accept/${id}?time=${time}`)
      .then(() => {
        alert("Order Accepted ✅");
        loadOrders();
      })
      .catch(() => alert("Accept Failed ❌"));
  };

  // ✅ REJECT ORDER
  const rejectOrder = (id) => {

    axios.put(`http://localhost:8001/orders/reject/${id}`)
      .then(() => {
        alert("Order Rejected ❌");
        loadOrders();
      })
      .catch(() => alert("Reject Failed ❌"));
  };

  return (
    <div className="page">

      <h2>Restaurant Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-text">No Orders Available</p>
      ) : (
        <div className="orders-container">

          {orders.map(order => (
            <div key={order.id} className="card">

              <h3>Order #{order.id}</h3>

              <p><b>User:</b> {order.userEmail}</p>
              <p><b>Total:</b> ₹ {order.totalAmount}</p>

              <p>
                <b>Status:</b>
                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </p>

              {/* ⭐ SHOW DELIVERY TIME IF ACCEPTED */}
              {order.status === "ACCEPTED" && (
                <p><b>Delivery Time:</b> {order.deliveryTime} mins</p>
              )}

              {order.itemNames.map((item, i) => (
                <p key={i}>{item}</p>
              ))}

              {/* ⭐ SHOW ACTIONS ONLY FOR PENDING */}
              {order.status === "PENDING" && (
                <div className="card-actions">

                  <button onClick={() => acceptOrder(order.id)}>
                    Accept
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => rejectOrder(order.id)}
                  >
                    Reject
                  </button>

                </div>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default RestaurantOrders;