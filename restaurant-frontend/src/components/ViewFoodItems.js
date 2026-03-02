import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";   // ⭐ ADD THIS
import "../css/ViewFoodItem.css";

function ViewFoodItems() {

  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  const navigate = useNavigate();   // ⭐ ADD THIS

  const loadItems = () => {
    axios.get("http://localhost:8001/restaurants/food-items")
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const deleteItem = (id) => {

    if (!window.confirm("Delete this item?")) return;

    axios.delete(`http://localhost:8001/restaurants/food-items/${id}`)
      .then(() => {
        alert("Item Deleted ✅");
        loadItems();
      })
      .catch(() => alert("Delete Failed ❌"));
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditedItem(item);
  };

  const handleChange = (e) => {
    setEditedItem({
      ...editedItem,
      [e.target.name]: e.target.value
    });
  };

  const saveUpdate = (id) => {

    axios.put(`http://localhost:8001/restaurants/food-items/${id}`, editedItem)
      .then(() => {
        alert("Item Updated ✅");
        setEditingId(null);
        loadItems();
      })
      .catch(() => alert("Update Failed ❌"));
  };

  return (
    <div className="page">

      <h2>Food Items</h2>

      <div className="grid">
        {items.map(item => {

          const isEditing = editingId === item.id;

          return (
            <div className="card" key={item.id}>

              <img
                src={`http://localhost:8001/uploads/${item.imageName}`}
                alt={item.name}
              />

              {!isEditing ? (
                <>
                  <h3>{item.name}</h3>
                  <p>₹ {item.price}</p>
                  <p>{item.description}</p>

                  <div className="card-actions">
                    <button onClick={() => startEdit(item)}>
                      Update
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    name="name"
                    value={editedItem.name}
                    onChange={handleChange}
                    placeholder="Name"
                  />

                  <input
                    name="price"
                    value={editedItem.price}
                    onChange={handleChange}
                    placeholder="Price"
                  />

                  <input
                    name="description"
                    value={editedItem.description}
                    onChange={handleChange}
                    placeholder="Description"
                  />

                  <div className="card-actions">
                    <button onClick={() => saveUpdate(item.id)}>
                      Save
                    </button>

                    <button onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </div>
                </>
              )}

            </div>
          );
        })}
      </div>

      {/* ⭐ BACK BUTTON */}
      <div className="back-btn-container">
        <button
          className="ghost-btn"
          onClick={() => navigate("/restaurant-home")}
        >
          ← Back To Home
        </button>
      </div>

    </div>
  );
}

export default ViewFoodItems;