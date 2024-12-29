import React from 'react';

import AuthButtons from './AuthButtons';
import NavLogo from './NavLogo';
import NavLinks from './NavLinks';

const Navbar = () => {
  return (
    <nav className="mb-5 flex flex-col items-center justify-between border-b border-gray-200 px-5 py-4 md:flex-row">
      <NavLogo />
      <NavLinks />
      <AuthButtons />
    </nav>
  );
};

export default Navbar;
