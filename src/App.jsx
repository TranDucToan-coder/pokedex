import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigate from './Navigate/Navigate';
import Home from './pages/Home';
import DetailOfPokemon from './pages/DetailPokemon/Detail';
import TCG from './pages/TCG/TCG';
import Pokedex from './pages/Pokedex';
import SideBar from './Navigate/Side';
import Middleware from './Middleware/Middleware';
import User from './Profile/User';
import AdminPage from './Admin/AdminPage';
//Context
import { LoginProvider, StateProvider, ErrProvider } from './Context/Login';
import {LoginForm, OTP } from './pages/Login';
import DetailTCG from './pages/TCG/Detail/DetailTCG';
import Cart from './pages/Cart/Cart';
import Information from './Profile/PersonalInformation';


function App() {
  return (
    <BrowserRouter>
      <StateProvider>
        <ErrProvider>
        <LoginProvider>
          <div className="App">
            <header className="App-header">
              <Navigate />
            </header>
            <div className="App-body">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokedex" element={<Pokedex />} />
                <Route path='/pokedex/:id' element={<DetailOfPokemon/>}></Route>
                <Route path='/TCG' element={<TCG></TCG>}></Route>
                <Route path='/TCG/:id' element={<DetailTCG></DetailTCG>}></Route>
                <Route path='/cart' element={<Cart></Cart>}></Route>
                <Route element={<Middleware></Middleware>}>
                  <Route path='/profile/*' element={<User/>}></Route>
                  <Route path='/profile/information' element={<Information/>}></Route>
                  <Route path='/admin' element={<AdminPage/>}></Route>
                </Route>
              </Routes>
            </div>
            <SideBar></SideBar>
            <LoginForm></LoginForm>
            <OTP></OTP>
          </div>
        </LoginProvider>
        </ErrProvider>
      </StateProvider>
    </BrowserRouter>
  );
}
export default App;
