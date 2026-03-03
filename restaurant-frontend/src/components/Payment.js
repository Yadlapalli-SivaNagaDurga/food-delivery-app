import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Checkout.css";
import "../css/ViewFoodItem.css";
import { CartContext } from "../contexts/CartContext";
import api from "../utils/api";   // ✅ changed from axios to api

function Payment() {
  const navigate = useNavigate();
  const { cart, clearCart, placeOrder } = useContext(CartContext);
  const items = Object.values(cart || {});
  const totalAmount = useMemo(() => 
    items.reduce((s, i) => s + (i.qty || 0) * (Number(i.price) || 0), 0), 
    [items]
  );

  const [method, setMethod] = useState("razorpay");
  const [upiId] = useState("merchant@upi");
  const [processing, setProcessing] = useState(false);

  const submitOrder = async () => {
    const userEmail = localStorage.getItem("userEmail") || "guest@example.com";
    const payload = { userEmail, items };

    try {
      await api.post("/orders/place", payload);   // ✅ changed
      try {
        placeOrder({ userEmail, items, totalAmount });
      } catch (e) {}

      return { ok: true };
    } catch (err) {
      console.warn("Order POST failed:", err?.message || err);
      return { ok: false, error: err };
    }
  };

  const handlePayment = async () => {
    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }

    setProcessing(true);

    if (method === "upi") {
      await new Promise((r) => setTimeout(r, 800));
    } else if (method === "card") {
      await new Promise((r) => setTimeout(r, 1000));
    } else if (method === "netbanking") {
      await new Promise((r) => setTimeout(r, 800));
    }

    if (method === "razorpay") {
      await handleRazorpay();
      setProcessing(false);
      return;
    }

    const resp = await submitOrder();

    if (resp.ok) {
      alert("Payment and Order Successful 🎉");
      clearCart();
      navigate("/user-home");
    } else {
      const proceed = window.confirm(
        "Order submission failed (backend unreachable). Mark order as placed locally?"
      );

      if (proceed) {
        try {
          const userEmail = localStorage.getItem("userEmail") || "guest@example.com";
          placeOrder({ userEmail, items, totalAmount });
        } catch (e) {}

        alert("Payment simulated. Order recorded locally 🎉");
        clearCart();
        navigate("/user-home");
      } else {
        alert("Payment/Order failed. Please try again later.");
      }
    }

    setProcessing(false);
  };

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleRazorpay = async () => {
    try {
      const ok = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!ok) {
        alert("Failed to load Razorpay SDK");
        return;
      }

      let orderResp = null;
      try {
        const res = await api.post(   // ✅ changed
          "/payments/create-order",
          { amount: Math.round(totalAmount * 100), currency: "INR" }
        );
        orderResp = res.data;
      } catch (err) {
        console.warn("create-order failed", err?.message || err);
      }

      const options = {
        key: (orderResp && orderResp.key) || "",
        amount: (orderResp && orderResp.amount) || Math.round(totalAmount * 100),
        currency: (orderResp && orderResp.currency) || "INR",
        name: "FoodDelivery",
        description: "Order Payment",
        order_id: orderResp && orderResp.id,
        handler: async function () {
          const resp = await submitOrder();
          if (resp.ok) {
            try {
              const userEmail = localStorage.getItem("userEmail") || "guest@example.com";
              placeOrder({ userEmail, items, totalAmount });
            } catch (e) {}

            alert("Payment and Order Successful 🎉");
            clearCart();
            navigate("/user-home");
          } else {
            alert("Order submission failed after payment. Please contact support.");
          }
        },
        prefill: {
          email: localStorage.getItem("userEmail") || "",
        },
        theme: { color: "#f6a609" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        alert("Payment failed. Please try again.");
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Razorpay flow failed. Falling back to simulated payment.");
      const proceed = window.confirm("Simulate success and clear cart?");
      if (proceed) {
        clearCart();
        navigate("/user-home");
      }
    }
  };

  return (
    <div className="checkout-page">
      <h2>Payment</h2>

      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
        <div style={{ marginBottom: 12 }}>
          <strong>Amount:</strong> ₹ {totalAmount}
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <label style={{ cursor: "pointer" }}>
            <input type="radio" checked={method === "upi"} onChange={() => setMethod("upi")} /> UPI
          </label>
          <label style={{ cursor: "pointer" }}>
            <input type="radio" checked={method === "card"} onChange={() => setMethod("card")} /> Card
          </label>
          <label style={{ cursor: "pointer" }}>
            <input type="radio" checked={method === "netbanking"} onChange={() => setMethod("netbanking")} /> Netbanking
          </label>
        </div>

        <div style={{ marginTop: 16 }}>
          <button onClick={handlePayment} disabled={processing}>
            {processing ? "Processing..." : `Pay ₹ ${totalAmount}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;