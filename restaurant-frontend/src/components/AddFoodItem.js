import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/AddFoodItem.css";

function AddFoodItem() {

  const navigate = useNavigate();          // ✅ NEW

  const email = localStorage.getItem("restaurantEmail");

  const [item, setItem] = useState({
    name: "",
    price: "",
    description: ""
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {

    if (!item.name || !item.price || !file) {
      alert("Fill all required fields ❌");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("name", item.name);
    formData.append("price", item.price);
    formData.append("description", item.description);
    formData.append("email", email);

    axios.post("http://localhost:8001/restaurants/food-items/upload", formData)
      .then(response => {

        console.log("UPLOAD RESPONSE:", response.data);

        alert("Food Item Added Successfully ✅");

        setItem({
          name: "",
          price: "",
          description: ""
        });

        setFile(null);

      })
      .catch(error => {

        console.log("UPLOAD ERROR:", error);

        alert("Upload Failed ❌");
      });
  };

  return (
    <div className="add-food-page">

      <div className="add-food-card">
        <h2>Add Food Item</h2>

        <input
          name="name"
          placeholder="Item Name"
          value={item.name}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          value={item.price}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={item.description}
          onChange={handleChange}
        />

        <input
          type="file"
          onChange={handleFileChange}
        />

        <button onClick={handleSubmit}>
          Upload Item
        </button>

        {/* ✅ GO BACK BUTTON */}
        <button
          className="ghost-btn"
          onClick={() => navigate("/restaurant-home")}
        >
          Go Back
        </button>

      </div>

    </div>
  );
}

export default AddFoodItem;