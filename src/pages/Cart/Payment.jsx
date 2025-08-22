import { useState, useEffect } from 'react';
import style from "../../Css/Payment.module.css"
import CreatePayment from '../../API/apiPayment';
import { Link, useNavigate } from 'react-router-dom';

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const [dataPayment, setDataPayment] = useState({});
    const [cartItem, setCart] = useState([]);

    const [method] = useState([{ id: 1, name: "momo" }, { id: 2, name: "vnpay" }]);
    const [selectedMethod, setSelectedMethod] = useState(1);

    const amount = JSON.parse(localStorage.getItem("subTotal"));
    const ConvertAmount = Math.round(parseFloat(amount) * 1000).toString();


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
    const handleConfirmOrder = async () => {
        try {
            console.log(ConvertAmount);
            if (selectedMethod === 1) {
                const response = await CreatePayment(ConvertAmount);
                console.log(response);
                if (!response) {
                    console.error("Không nhận được phản hồi từ server.");
                    return;
                } else {
                    setDataPayment(response);
                }
            }
        } catch (error) {
            console.error("Lỗi khi xác nhận đơn hàng:", error);
        }
    };
    const handleChangeValue = (e) => {
        setSelectedMethod(e.target.value);
    };
    return (
        <div className={style.wrapper}>
            {
                amount != "0" ? (
                    <div className={style.content}>
                        <h2>Xác nhận đơn hàng</h2>
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
                                            <td className={style.OptButton}>{item.quantity}</td>
                                            <td className={style.price}>{item.cardmarket?.prices?.trendPrice}$</td>
                                            <td className={style.subTotal}>{(item.cardmarket?.prices?.trendPrice * item.quantity).toFixed(2)}$</td>
                                        </tr>
                                    </tbody>

                                ))}
                            </table>
                        ) : (
                            <p>Giỏ hàng trống.</p>
                        )}
                        <select value={selectedMethod} onChange={() => handleChangeValue(selectedMethod)}>
                            {method.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <Link to={dataPayment.payUrl || "#"}>
                            <button onClick={() => handleConfirmOrder()} disabled={loading}>
                                {loading ? 'Đang xử lý...' : 'Xác nhận đơn hàng'}
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div>Không có sản phẩm trong giỏ hàng</div>
                )
            }
        </div>
    )
}
export default Payment