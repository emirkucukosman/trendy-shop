import React from "react";
import { useReduxSelector } from "src/app/hook";
import { selectCart } from "src/slices/productSlice";
import { selectIsAuthenticated, selectUser } from "src/slices/authSlice";
import { Link } from "react-router-dom";
import { BiCart, BiUser } from "react-icons/bi";
import { BsList, BsX } from "react-icons/bs";

type TopBarProps = {
  handleMenuClick: () => void;
  isMenuOpen: boolean;
};

const TopBar: React.FC<TopBarProps> = ({ handleMenuClick, isMenuOpen }) => {
  const cart = useReduxSelector(selectCart);
  const isAuthenticated = useReduxSelector(selectIsAuthenticated);
  const user = useReduxSelector(selectUser);

  return (
    <div className="sticky top-0 left-0 bg-white z-50 shadow-md w-full">
      <div className="flex items-center justify-between">
        <Link to="/">
          <div className="ml-1 p-4 font-bold">Trendy</div>
        </Link>
        <div className="p-4 md:hidden" onClick={handleMenuClick}>
          {isMenuOpen ? <BsX size={24} /> : <BsList size={24} />}
        </div>
        <div className="hidden md:flex md:items-center">
          <Link to="/cart">
            <div className="flex items-center space-x-2 p-4 text-md">
              <div className="relative">
                <BiCart size={24} />
                {cart.length !== 0 && (
                  <div className="absolute -top-1 -right-2 bg-red-500 text-white w-4 h-4 text-xs rounded-full animate-bounce">
                    <div className="flex items-center justify-center">{cart.length}</div>
                  </div>
                )}
              </div>
              <span className="hidden md:block">Cart</span>
            </div>
          </Link>
          <Link to={isAuthenticated ? `/profile` : `/account/login`}>
            <div className="flex items-center space-x-2 p-4 text-md">
              <BiUser size={24} />
              <span className="hidden md:block">
                {user && isAuthenticated ? user.username : "Account"}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
