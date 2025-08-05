import { useState } from "react";
import style from "../Css/Admin.module.css"
import { useNavigate } from "react-router-dom";

import User from "./User";
import MainPage from "./MainPage";

const AdminPage = () => {
    const [content, setContent] = useState("...");
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user)
    return (
        <div className={style.wrapper}>
            <h1 className={style.header}>Admin Page</h1>
            <p className={style.header}>Welcome to the admin page!</p>
            <div className={style.topbar}>
                <span>Hello, {user?.name || "Guest"}</span>
                <button onClick={() => {
                    sessionStorage.clear();
                    navigate("/login");
                }}>Logout</button>
            </div>

            <div className={style.content}>
                <div className={style.sidebar}>
                    <div className={style.title} onClick={() => setContent("User")}><img className={style.image} src="./elements/dark.png" alt="none"></img>User</div>
                    <div className={style.title} onClick={() => setContent("Staff")}><img className={style.image} src="./elements/dark.png" alt="none"></img>Staff</div>
                    <div className={style.title} onClick={() => setContent("Order")}><img className={style.image} src="./elements/dark.png" alt="none"></img>Order</div>
                    <div className={style.title} onClick={() => setContent("Product")}><img className={style.image} src="./elements/dark.png" alt="none"></img>Product</div>
                    <div className={style.title} onClick={() => setContent("...")}><img className={style.image} src="./elements/dark.png" alt="none"></img>...</div>
                    <div className={style.title} onClick={() => setContent("...")}><img className={style.image} src="./elements/dark.png" alt="none"></img>...</div>
                </div>
                <div className={style.case}>
                    {(() => {
                        switch (content) {
                            case "User":
                               return <User user={user.username}></User>;
                            case "Staff":
                                return <div>Staff content</div>;
                            case "Order":
                                return <div>Order content</div>;
                            case "Product":
                                return <div>Product content</div>;
                            case "..." :
                                return <MainPage></MainPage>;
                            default:
                                return <div>Chọn một mục để hiển thị</div>;
                        }
                    })()}
                </div>
            </div>
        </div>
    );
};
export default AdminPage;