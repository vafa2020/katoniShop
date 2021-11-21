import { useCart, useCartAction } from "../context/CartProvider";
import Layout from "../layout/Layout";
import { HiOutlinePlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
import { Link } from "react-router-dom";
const Cart = () => {
  const dispatch = useCartAction();
  const { cart, total } = useCart();
  if (!cart.length) {
    return (
      <Layout>
        <main className="flex justify-center mt-10 ">
          <h1 className="textError">sorry, cart is empty</h1>
        </main>
      </Layout>
    );
  }
  const incrementHandler = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };
  const decrementHandler = (item) => {
    dispatch({ type: "DECREMENT", payload: item });
  };
  return (
    <Layout>
      <section className="flex justify-center ">
        <section className="flex justify-evenly w-10/12 max-w-6xl my-10">
          <div className="flex flex-col w-3/5 p-4 bg-white rounded shadow-2xl">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center w-full border-b-2"
              >
                <div className="flex justify-between items-center w-4/5	 ">
                  <img
                    className="h-28"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="text-pink-500">{product.name}</div>
                  <div className="text-green-500">
                    {product.offPrice * product.quantity}$
                  </div>
                </div>
                <div className="flex justify-evenly items-center w-1/5">
                  <div
                    onClick={() => {
                      incrementHandler(product);
                    }}
                    className="control"
                  >
                    <HiOutlinePlus />
                  </div>
                  <span>{product.quantity}</span>
                  <div
                    onClick={() => {
                      decrementHandler(product);
                    }}
                    className="control"
                  >
                    <HiMinus />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <CartSummary cart={cart} total={total} />
        </section>
      </section>
    </Layout>
  );
};

export default Cart;

const CartSummary = ({ cart, total }) => {
  const totalPrice = cart.length
    ? cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
    : 0;
  return (
    <div className="flex flex-col justify-evenly w-80 h-80 bg-white shadow-2xl rounded px-5">
      <h2 className="font-bold text-purple-400 text-center">خلاصه سبد خرید</h2>
      <div className="flex justify-between items-center items-center w-ful">
        <span className="text-pink-700">{totalPrice}$</span>
        <span>قیمت اصلی کالاها</span>
      </div>
      <div className="flex justify-between items-center items-center w-ful border-b-2 pb-2 border-pink-800">
        <span className="text-red-500">{totalPrice - total}$</span>
        <span>مبلغ تخفیف</span>
      </div>
      <div className="flex justify-between items-center items-center w-ful">
        <span className="text-green-500">{total}$</span>
        <span>قیمت نهایی کالاها</span>
      </div>
      <Link to="/signup?redirect=checkout">
        <button className="bg-pink-800 text-yellow-400 rounded w-full py-2">
          Go To CheckOut
        </button>
      </Link>
    </div>
  );
};
