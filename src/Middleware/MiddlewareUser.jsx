import { Navigate, Outlet} from "react-router-dom";

export default function MiddlewareUser({ children }) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(!user){
        window.alert("Vui lòng đăng nhập để thực hiện truy cập")
        return <Navigate to="/"></Navigate>
    }
    else if(user.idRole !== 1){
        window.alert("Bạn không có quyền truy cập!")
        console.log("Sorry")
        return <Navigate to="/"></Navigate>
    }
    else if(user.idRole === 1){
        return <Navigate to="/profile"></Navigate>
    }
    else
        return <Outlet />;
}