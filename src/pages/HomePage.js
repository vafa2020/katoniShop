import { toast } from "react-toastify";
import { useCart, useCartAction } from "../context/CartProvider";
import { products } from "../data";
import Layout from "../layout/Layout";
import { checkInCart } from "../utils/checkInCart";

const HomePage = () => {
  const { cart } = useCart();
  const dispatch = useCartAction();
  const addProductHandle = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added To Cart`)
  };
  
  return (
    <Layout>
      <main className="flex justify-center my-5 w-full">
        <section className="grid gap-8 max-w-6xl lg:grid-cols-3 sm:grid-cols-2">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col rounded">
              <div>
                <img className="h-80" src={product.image} alt={product.name} />
              </div>
              <div className="flex justify-between p-2 bg-gray-200 ">
                <div className="text-pink-800">{product.name}</div>
                <div className="text-green-800">{product.price}$</div>
                <button
                  className="bg-purple-800 text-white py-1 px-2 rounded"
                  onClick={() => addProductHandle(product)}
                >
                  {checkInCart(cart,product) ? "in cart" : "add to cart"}
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
