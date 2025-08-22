const ChangeQuantity = (item, newQuantity) => {
    const currentCart = JSON.parse(localStorage.getItem("cartTCG") || "[]");
    const existItem = currentCart.find(cartItem => cartItem.id === item.id);
    if(existItem){
        let updatedCart = currentCart.map((cartItem) => (
            cartItem.id === item.id ? {...cartItem , quantity : newQuantity} : cartItem
        ))
        console.log(updatedCart)
        if(newQuantity < 0){
            console.log("Invalid");
            return;
        }
        else if(newQuantity < 1){
            updatedCart = currentCart.filter(cartItem => cartItem.id !== item.id);
            localStorage.setItem("cartTCG", JSON.stringify(updatedCart));
            window.location.reload();
        }
        else{
            localStorage.setItem("cartTCG", JSON.stringify(updatedCart));
            window.location.reload();
        }
    }
}
export default ChangeQuantity