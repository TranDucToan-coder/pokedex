const ChangeQuantity = (item, newQuantity) => {
    const currentCart = JSON.parse(localStorage.getItem("cartTCG") || "[]");
    const existItem = currentCart.find(cartItem => cartItem.id === item.id);
    if(existItem){
        const updatedCart = currentCart.map((cartItem) => (
            cartItem.id === item.id ? {...cartItem , quantity : newQuantity} : cartItem
        ))
        console.log(updatedCart)
        if(newQuantity < 1){
            console.log("Invalid");
            return;
        }
        else{
            localStorage.setItem("cartTCG", JSON.stringify(updatedCart));
            window.location.reload();
        }
    }
}
export default ChangeQuantity