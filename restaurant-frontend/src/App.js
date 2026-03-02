import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login"
import RegisterChoice from "./components/RegisterChoice";
import RestaurantRegister from "./components/RestaurantRegister";
import RestaurantHome from "./components/RestaurantHome";
import RestaurantProfile from "./components/RestaurantProfile";
import AddFoodItem from "./components/AddFoodItem";
import ViewFoodItems from "./components/ViewFoodItems";
import UserRegister from "./components/UserRegister";
import UserHome from "./components/UserHome";
import RestaurantsList from "./components/RestaurantsList";
import UserViewFoodItems from "./components/UserViewFoodItems";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import { CartProvider } from "./contexts/CartContext";
import CartBar from "./components/CartBar";
import UserOrders from "./components/UserOrders";
import RestaurantOrders from "./components/RestaurantOrders";



function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />


        <Route path="/register" element={<RegisterChoice />} />

        <Route path="/restaurant-register" element={<RestaurantRegister />} />
        <Route path="/restaurant-home" element={<RestaurantHome />} />
        <Route path="/restaurant-profile" element={<RestaurantProfile />} />
        <Route path="/add-food-item" element={<AddFoodItem />} />
        <Route path="/view-food-items" element={<ViewFoodItems />} /> 
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-home" element={<UserHome />} />

        <Route path="/restaurants-list" element={<RestaurantsList />} />
        <Route path="/user-view-food-items" element={<UserViewFoodItems />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/my-orders" element={<UserOrders />} />
        <Route path="/restaurant-orders" element={<RestaurantOrders />} />
        

        </Routes>

        <CartBar />
      </Router>
    </CartProvider>
  );
}

export default App;