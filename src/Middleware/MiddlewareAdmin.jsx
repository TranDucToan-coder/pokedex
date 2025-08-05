import { Navigate, Outlet} from "react-router-dom";

export default function MiddlewareAdmin() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) {
    window.alert("Vui lòng đăng nhập để thực hiện truy cập");
    return <Navigate to="/" />;
  }
  if (user.idRole !== 3) {
    window.alert("Bạn không có quyền truy cập!");
    console.log("Sorry");
    return <Navigate to="/" />;
  }
  console.log("Welcome");
  return <Outlet />;
}
