import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Checkout.css";
import "../css/ViewFoodItem.css";
import { CartContext } from "../contexts/CartContext";
import axios from "axios";

function Payment() {
  const navigate = useNavigate();
  const { cart, clearCart, placeOrder } = useContext(CartContext);
  const items = Object.values(cart || {});
  const totalAmount = useMemo(() => items.reduce((s, i) => s + (i.qty || 0) * (Number(i.price) || 0), 0), [items]);

  const [method, setMethod] = useState("razorpay");
  const [upiId] = useState("merchant@upi");
  const [processing, setProcessing] = useState(false);

  const submitOrder = async () => {
    const userEmail = localStorage.getItem("userEmail") || "guest@example.com";
    const payload = { userEmail, items };

    // Try to post to backend, but allow fallback to simulated success
    try {
      await axios.post("http://localhost:8001/orders/place", payload, { timeout: 5000 });
      // record order locally as well so restaurant panel can see it even if backend later processes
      try {
        placeOrder({ userEmail, items, totalAmount });
      } catch (e) {
        // ignore local recording errors
      }

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

    // Simulate payment flow depending on method
    if (method === "upi") {
      // For UPI we show a simulated QR / deep link flow and then finalize
      // In a real app you'd open a deep-link like `upi://pay?...` or show a generated QR
      await new Promise((r) => setTimeout(r, 800));
    } else if (method === "card") {
      // Simulate card validation/3DS
      await new Promise((r) => setTimeout(r, 1000));
    } else if (method === "netbanking") {
      await new Promise((r) => setTimeout(r, 800));
    }

    if (method === "razorpay") {
      // handle Razorpay separately
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
      // Backend failed — ask user if they want to simulate success
      const proceed = window.confirm(
        "Order submission failed (backend unreachable). Mark order as placed locally?"
      );

      if (proceed) {
        // simulate success: record locally
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

  // Load external script
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
      // load Razorpay SDK
      const ok = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!ok) {
        alert("Failed to load Razorpay SDK");
        return;
      }

      // Request backend to create an order. Backend must call Razorpay Orders API using secret key.
      // Expect response: { id: '<razorpay_order_id>', amount: <amount_in_paise>, currency: 'INR', key: '<razorpay_key_id>' }
      let orderResp = null;
      try {
        const res = await axios.post(
          "http://localhost:8001/payments/create-order",
          { amount: Math.round(totalAmount * 100), currency: "INR" },
          { timeout: 5000 }
        );
        orderResp = res.data;
      } catch (err) {
        console.warn("create-order failed", err?.message || err);
      }

      // Fallback: if backend didn't supply order, create a minimal options object
      const options = {
        key: (orderResp && orderResp.key) || process.env.REACT_APP_RAZORPAY_KEY || "",
        amount: (orderResp && orderResp.amount) || Math.round(totalAmount * 100),
        currency: (orderResp && orderResp.currency) || "INR",
        name: "FoodDelivery",
        description: "Order Payment",
        order_id: orderResp && orderResp.id, // undefined if backend didn't create order
        handler: async function (response) {
          // response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature
          // Submit order to backend (or finalize)
          const resp = await submitOrder();
          if (resp.ok) {
            // also persist locally
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
      rzp.on("payment.failed", function (response) {
        console.error("Razorpay payment failed", response);
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

        {method === "upi" && (
          <div style={{ background: "#0b1220", padding: 12, borderRadius: 8, color: "#cbd5f5" }}>
            <p>Pay via UPI to: <strong>{upiId}</strong></p>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 140, height: 140, background: "white", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Simple QR placeholder */}
                <div style={{ width: 100, height: 100, background: "#222", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>QR</div>
              </div>

              <div>
                <button onClick={() => { navigator.clipboard?.writeText(`upi://pay?pa=${upiId}&pn=Merchant&amount=${totalAmount}`); alert('UPI link copied'); }}>Copy UPI Link</button>
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => { window.open(`upi://pay?pa=${upiId}&pn=Merchant&am=${totalAmount}`); }}>Open UPI App</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {method === "card" && (
          <div style={{ background: "#0b1220", padding: 12, borderRadius: 8, color: "#cbd5f5" }}>
            <p>Enter card details (simulated)</p>
            <input placeholder="Card number" style={{ width: "100%", padding: 8, marginBottom: 8 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <input placeholder="MM/YY" style={{ flex: 1, padding: 8 }} />
              <input placeholder="CVV" style={{ width: 100, padding: 8 }} />
            </div>
          </div>
        )}

        {method === "netbanking" && (
          <div style={{ background: "#0b1220", padding: 12, borderRadius: 8, color: "#cbd5f5" }}>
            <p>Select bank (simulated)</p>
            <select style={{ width: "100%", padding: 8 }}>
              <option>Bank A</option>
              <option>Bank B</option>
              <option>Bank C</option>
            </select>
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <button onClick={handlePayment} disabled={processing}>{processing ? "Processing..." : `Pay ₹ ${totalAmount}`}</button>
        </div>
      </div>
    </div>
  );
}

export default Payment;