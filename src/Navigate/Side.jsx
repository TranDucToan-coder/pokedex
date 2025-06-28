import style from '../Css/SideBar.module.css'
import LoginForm from '../pages/Login'
//Context
import { LoginContext, StateContext } from '../Context/Login'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
//Image
const userImg = '/svgMenu/user-shield-alt-svgrepo-com.svg'
const cart = '/svgMenu/Cart.svg'

const SideBar = () => {
    const { HandleClickBtn, HandleClickLogOut } = useContext(LoginContext);
    const user = JSON.parse(sessionStorage.getItem("user"))

    const {state, HandleChangeState} = useContext(StateContext);
    return (
        <div className={style.wrapper}>
            <div className={style.top}>
                {user ? (
                    <div className={style.content}>
                        <Link to="./profile">Profile</Link>
                    </div>
                ) : (
                    <>
                        <img src={userImg} className={style.img}></img>
                        <p onClick={() => HandleChangeState()}>Login</p>
                    </>
                )}
            </div>
            <div className={style.bottom}>
                <div className={style.content}>
                    <Link to="./cart"><img src={cart} alt='cart'></img></Link>
                    <p>Cart</p>
                </div>
            </div>
        </div>
    )
}
export default SideBar