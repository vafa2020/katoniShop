import { Route, Routes } from "react-router";
import "./App.css";
import CartProvider from "./context/CartProvider";
import Cart from "./pages/Cart";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthProvider from "./context/AuthProvider";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
        <ToastContainer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
