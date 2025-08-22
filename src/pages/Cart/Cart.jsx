import { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom"
import style from "../../Css/Cart.module.css"
import ChangeQuantity from "./ChangeQuantity";

const Cart = () => {
    const [cartItem, setCart] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        try {
            const storedCart = localStorage.getItem("cartTCG");
            if (storedCart) {
                setCart(JSON.parse(storedCart));
                console.log(storedCart)
            } else {
                setCart([]);
            }
        } catch (error) {
            console.error("Failed to parse cart:", error);
            setCart([]);
        }
    }, []);

    const subTotal = useMemo(() => {
        return cartItem.reduce((total, item) => {
            const price = item.cardmarket?.prices?.trendPrice || 0;
            return total + price * item.quantity;
        }, 0).toFixed(2);
    }, [cartItem]);
    localStorage.setItem("subTotal", subTotal);
    const submit = async() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if(!user){
            window.alert("Vui lòng đăng nhập để thanh toán!")
        }
        else{
            //const OrderDate = new Date().toISOString().split("T")[0];
            //const cartID = await InsertCart(user.ID, OrderDate, subTotal)
            //if(cartID)
            //{
            //    window.alert("Success");
            //    const sendReq2 = await InsertDetailCart(cartID);
            //    if(sendReq2){
            //        console.log("Chi tiết đơn hàng đã được cập nhập")
            //        localStorage.removeItem("cartTCG")
            //        window.location.reload()
            //    }
            //}
            //else{
            //    window.alert("Failed~")
            //}
            navigate("/cart/payment")
        }
    }
    return (
        <div className={style.wrapper}>
            <h2>Giỏ hàng</h2>
            <div className={style.wrapperCart}>
                <div className={style.left}>
                    {cartItem.length > 0 ? (
                        <table className={style.cartContent}>
                            <thead className={style.table_header}>
                                <tr>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>SubTotal</th>
                                </tr>
                            </thead>
                            {cartItem?.map((item, index) => (
                                <tbody>
                                    <tr key={index} className={style.cart_item}>
                                        <td className={style.name}>{item.name}</td>
                                        <td><img className={style.image} src={item.images?.small} alt="" /></td>
                                        <td className={style.OptButton}>
                                            <button className={style.button} onClick={() => ChangeQuantity(item, item.quantity - 1)}>-</button>
                                            <span className={style.quantity}>{item.quantity}</span>
                                            <button className={style.button} onClick={() => ChangeQuantity(item, item.quantity + 1)}>+</button>
                                        </td>
                                        <td className={style.price}>{item.cardmarket?.prices?.trendPrice}$</td>
                                        <td className={style.subTotal}>{(item.cardmarket?.prices?.trendPrice * item.quantity).toFixed(2)}$</td>
                                    </tr>
                                </tbody>

                            ))}
                        </table>
                    ) : (
                        <p>Giỏ hàng trống.</p>
                    )}
                </div>
                <div className={style.right}>
                    <div className={style.cart_checkout}>
                        <h2>Thanh toán</h2>
                        <hr></hr>
                        <div className={style.cart_total}>
                            <p>Tạm tính:</p>
                            <p>{subTotal}$</p>
                        </div>
                        <div className={style.cart_submit}>
                            <button onClick={() => submit()}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
