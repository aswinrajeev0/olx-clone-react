import React, { useContext } from 'react';
import { AuthContext } from '../../store/Context';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { auth } from '../../firebase/config';
function Header() {

  const navigate = useNavigate();
  const {user} = useContext(AuthContext)

  function handleLogout(){
    signOut(auth)
    navigate('/login')
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span style={{cursor:"pointer"}}>{user ? user.displayName : "Login"}</span>
          <hr />
        </div>
        {user && <span onClick={handleLogout} style={{cursor:"pointer"}}>Logout</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent" onClick={()=>navigate('/create')}>
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;