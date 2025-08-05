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
