import React from "react";
import { useReduxSelector } from "src/app/hook";
import { selectIsAuthenticated, selectUser } from "src/slices/authSlice";
import { NavLink } from "react-router-dom";
import { BiCart, BiUser } from "react-icons/bi";
import { BsHouse } from "react-icons/bs";

type MobileMenuProps = {
  isOpen: boolean;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  const isAuthenticated = useReduxSelector(selectIsAuthenticated);
  const user = useReduxSelector(selectUser);

  return (
    <div
      className="fixed right-0 w-full h-full bg-gray-100 z-50 transition-all duration-200 sm:hidden"
      style={isOpen ? { right: 0 } : { right: "-100%" }}
    >
      <div className="flex flex-col p-6">
        <NavLink exact to="/" activeClassName="bg-gray-200 rounded-lg">
          <div className="flex items-center w-full space-x-3 p-3 rounded-lg cursor-pointer transition duration-200 text-gray-700 hover:text-black">
            <BsHouse />
            <span>Home</span>
          </div>
        </NavLink>
        <NavLink exact to="/cart" activeClassName="bg-gray-200 rounded-lg">
          <div className="flex items-center w-full space-x-3 p-3 rounded-lg cursor-pointer transition duration-200 text-gray-700 hover:text-black">
            <BiCart size={20} />
            <span>Cart</span>
          </div>
        </NavLink>
        <NavLink
          exact
          to={isAuthenticated ? "/profile" : "/account/login"}
          activeClassName="bg-gray-200 rounded-lg"
        >
          <div className="flex items-center w-full space-x-3 p-3 rounded-lg cursor-pointer transition duration-200 text-gray-700 hover:text-black">
            <BiUser size={20} />
            <span>{isAuthenticated ? user?.username : "Account"}</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;
