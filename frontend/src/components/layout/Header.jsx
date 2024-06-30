import React, { useEffect } from 'react';
import twennys_logo from '../../assets/twennys_logo.png'
import Search from './Search';
import avatar from '../../assets/avatar.png'
import { useLazyGetMeQuery } from '../../redux/api/userApi';
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../../redux/api/authApi';
import { MdOutlineShoppingCart } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation()
  console.log(pathname);

  const [ getUser, { isLoading }] = useLazyGetMeQuery()
  const [logout, { isLoading: logOutLoading }] = useLazyLogoutQuery()

  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)

  const logOutHandler = () => {
    logout()
    navigate(0)
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      getUser()
    }
  }, [])

  return (
    <div>
      <nav className="navbar row">
        <div className="col-12 col-md-3 ps-5">
          <div className="navbar-brand">
            <a className='nav-a' href="/">
              <img src={twennys_logo} width="95px" alt="Twennys Logo" />
              <p>TWENNYS</p>
            </a>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          {pathname !== '/signup' && pathname !== '/login' ? <Search/> : null}
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {pathname !== '/signup' && pathname !== '/login' ? (
          <a className='cart-container' href="/cart" style={{textDecoration: "none"}}>
            <span id="cart" className="ms-3"> <MdOutlineShoppingCart/> </span>
            <span className="ms-1" id="cart_count">{cartItems?.length}</span>
          </a>
        ) : ''}
          
    
        {user ? (
          <div className="ms-4 profile-image dropdown">
            <button
              className="btn dropdown-toggle text-black"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={user?.avatar ? user?.avatar : avatar}
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span style={{ color: "black" }}>{user?.name?.split(' ')[0]}</span>
            </button>
            <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">

              {user?.role === 'admin' && (
                <Link className="dropdown-item" to="/admin/dashboard"> Dashboard </Link>
              )}
    
              <Link className="dropdown-item" to="/me/orders"> Orders </Link>
    
              <Link className="dropdown-item" to="/me"> Profile </Link>
    
              <Link onClick={logOutHandler} className="dropdown-item text-danger" to="/" >
              {logOutLoading ? "Logging Out..." : "Logout"}
              </Link>
            </div>
          </div>
        ) : (
          !isLoading && <Link to={"/login"} className="btn ms-4" id="login_btn"> Login </Link>
        )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
