//برای خلوت کردن reducer این فانکشن ها رو مینویسیم.
const addProductToCart = (action, state) => {
  const updatedCart = [...state.cart];
  const index = updatedCart.findIndex((x) => x.id === action.payload.id);
  const product = { ...updatedCart[index] };
  if (index < 0) {
    updatedCart.push({ ...action.payload, quantity: 1 });
  }
  product.quantity++;
  updatedCart[index] = product;
  return {
    cart: updatedCart,
    total: state.total + action.payload.offPrice,
  };
};
const decrementProductFromCart = (action, state) => {
  const updatedCart = [...state.cart];
  const index = updatedCart.findIndex((x) => x.id === action.payload.id);
  const product = { ...updatedCart[index] };
  if (product.quantity === 1) {
    const removedProduct = updatedCart.filter(
      (product) => product.id !== action.payload.id
    );
    return {
      cart: removedProduct,
      total: state.total - action.payload.offPrice,
    };
  }
  product.quantity--;
  updatedCart[index] = product;
  return {
    cart: updatedCart,
    total: state.total - action.payload.offPrice,
  };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return addProductToCart(action, state);
    case "DECREMENT":
      return decrementProductFromCart(action,state);
    default:
      return state;
  }
};
export default cartReducer;
