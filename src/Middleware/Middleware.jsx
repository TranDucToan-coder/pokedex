import { Navigate, Outlet} from "react-router-dom";

export default function Middleware({ children }) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(!user){
        window.alert("Vui lòng đăng nhập để thực hiện truy cập")
        return <Navigate to="/"></Navigate>
    }
    else if(user.role === 1){
        return <Navigate to="/admin"></Navigate>
    }
    else if(user.role === 2){
        return <Navigate to="/profile"></Navigate>
    }
    else
        return <Outlet />;
}