import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ViewFoodItem.css";
import { CartContext } from "../contexts/CartContext";
import api from "../utils/api";   // ✅ use centralized api

function UserViewFoodItems() {
  const [items, setItems] = useState([]);
  const { cart, addItem, decreaseItem } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/restaurants/food-items")   // ✅ changed
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const cartItems = Object.values(cart || {});
  const totalItems = cartItems.reduce((sum, i) => sum + (i.qty || 0), 0);
  const totalAmount = cartItems.reduce(
    (sum, i) => sum + (i.qty || 0) * (Number(i.price) || 0),
    0
  );

  return (
    <div className="page">
      <h2>Food Items</h2>

      <div className="grid">
        {items.map((item) => {
          const id = item.id ?? item._id ?? item.foodItemId;
          const cartItem = (cart && cart[id]) || null;

          return (
            <div className="card" key={id || item.name}>
              
              {/* ✅ Fixed image path */}
              <img
                src={`https://food-delivery-app-z30l.onrender.com/uploads/${item.imageName}`}
                alt={item.name}
              />

              <h3>{item.name}</h3>
              <p>₹ {item.price}</p>
              <p>{item.description}</p>

              {!cartItem ? (
                <button onClick={() => addItem(item)}>Add</button>
              ) : (
                <div className="qty-controls">
                  <button onClick={() => decreaseItem(cartItem.id)}>−</button>
                  <span>{cartItem.qty}</span>
                  <button onClick={() => addItem(item)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

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

export default UserViewFoodItems;