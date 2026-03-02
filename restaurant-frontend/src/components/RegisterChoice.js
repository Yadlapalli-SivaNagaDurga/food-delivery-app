import { useNavigate } from "react-router-dom";
import "../css/RegisterChoice.css";

function RegisterChoice() {
  const navigate = useNavigate();

  return (
    <div className="choice-container">
      <h1>Create Your Account</h1>
      <p>Select how you want to use the platform</p>

      <div className="choice-buttons">
        <button onClick={() => navigate("/user-register")}>
          User Register
        </button>

        <button onClick={() => navigate("/restaurant-register")}>
          Restaurant Register
        </button>
      </div>
    </div>
  );
}

export default RegisterChoice;