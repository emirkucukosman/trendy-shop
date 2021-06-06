import React, { useState } from "react";
import TopBar from "./TopBar";
import MobileMenu from "./MobileMenu";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="h-full">
      <TopBar handleMenuClick={toggleMobileMenu} isMenuOpen={menuOpen} />
      <MobileMenu isOpen={menuOpen} />
      <div className="flex min-h-full">
        <div className="flex-1 p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
