import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Checkout.css";
import { CartContext } from "../contexts/CartContext";

function Checkout() {
  const { cart, addItem, decreaseItem } = useContext(CartContext);
  const navigate = useNavigate();

  const items = Object.values(cart || {});

  const totalAmount = useMemo(
    () => items.reduce((sum, i) => sum + (i.qty || 0) * (Number(i.price) || 0), 0),
    [items]
  );

  return (
    <div className="checkout-page">

      <h2>Checkout</h2>

      {items.length === 0 ? (
        <p>Your cart is empty ❌</p>
      ) : (
        <>
          {items.map((item) => (
            <div className="checkout-item" key={item.id}>
              <span style={{ flex: 1 }}>{item.name}</span>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={() => decreaseItem(item.id)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => addItem(item)}>+</button>
              </div>

              <span>₹{(Number(item.price) || 0) * item.qty}</span>
            </div>
          ))}

          <h3>Total: ₹ {totalAmount}</h3>

          <button onClick={() => navigate("/payment")}>
            Proceed To Payment
          </button>
        </>
      )}

      <button
        className="ghost-btn"
        onClick={() => navigate("/user-view-food-items")}
      >
        ← Back To Menu
      </button>

    </div>
  );
}

export default Checkout;