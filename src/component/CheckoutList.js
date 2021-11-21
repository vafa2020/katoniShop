import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";

const CheckoutList = () => {
  const auth = useAuth();
  const { cart, total } = useCart();
  if (!cart.length) {
    return (
      <main className="mt-10 text-center font-bold text-2xl">
        <Link to="/"> go to store ?!!!</Link>
      </main>
    );
  }
  return (
    <div className="flex justify-center mt-10">
      <div className="flex justify-between items-center w-11/12 max-w-6xl">
        <div className="flex flex-col justify-center w-6/12 border-2 rounded p-2">
          <h1 className="font-bold text-yellow-500">Invoice details</h1>
          <p>Name: {auth.name}</p>
          <p>Email: {auth.email}</p>
          <p>Phone Number: {auth.phoneNumber}</p>
        </div>
        <div className="flex flex-col justify-center w-5/12 border-2 rounded p-2">
          <h1 className="text-center font-bold text-yellow-500">Your order</h1>
          <div className="flex justify-between items-center  border-b-2 border-gray-100">
            <p className="font-bold text-pink-800">product</p>
            <p className="font-bold text-green-500">price</p>
          </div>
          {cart.map((product) => (
            <>
              <div className="flex justify-between items-center w-full border-b-2 border-gray-100">
                <p>
                  {product.name}*{product.quantity}
                </p>
                <p>{product.offPrice * product.quantity}$</p>
              </div>
            </>
          ))}
          <div className="flex justify-between items-center w-full border-b-2 border-gray-100">
            <p className="font-bold">Total</p>
            <p className="font-bold">{total}$</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutList;
