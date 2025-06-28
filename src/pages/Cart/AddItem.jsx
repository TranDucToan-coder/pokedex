const addItemToCart = (item) => {
  const currentCart = JSON.parse(localStorage.getItem("cartTCG") || "[]");
  const existProduct = currentCart.find(
    (cartItem) => cartItem.id === item.id
  );
  if (existProduct) {
    console.log("Product already exists in the cart");
  } else {
    const newItem = { ...item, quantity: 1 };
    const updatedCart = [...currentCart, newItem];
    localStorage.setItem("cartTCG", JSON.stringify(updatedCart));
    console.log("Added to cart:", updatedCart);
    return updatedCart;
  }
};
export default addItemToCart
//const removeItemFromCart = (item) => {
//    const currentCart = JSON.parse(localStorage.getItem("cartKey") || "[]");
//    const existProduct = currentCart.filter((cartItems) => cartItems.product_id !== item.product_id)
//    if(existProduct)
//    {
//      return localStorage.setItem("cartKey", JSON.stringify(existProduct));
//    }
//    else
//    {
//      return currentCart;
//    }
//}
