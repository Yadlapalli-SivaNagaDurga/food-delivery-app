import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "../css/ViewFoodItem.css";

function CartBar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const items = Object.values(cart || {});

  const totalItems = useMemo(() => items.reduce((s, i) => s + (i.qty || 0), 0), [items]);
  const totalAmount = useMemo(() => items.reduce((s, i) => s + (i.qty || 0) * (Number(i.price) || 0), 0), [items]);

  if (totalItems === 0) return null;

  return (
    <div className="cart-bar" style={{ zIndex: 9999 }}>
      <div>🛒 {totalItems} Items | ₹ {totalAmount}</div>

      <div>
        <button onClick={() => navigate("/checkout")}>Checkout</button>
      </div>
    </div>
  );
}

export default CartBar;
