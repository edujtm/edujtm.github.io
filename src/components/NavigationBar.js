import React from 'react';
import { Link } from 'gatsby';

import navigationBarStyles from '../styles/components/NavigationBar.module.scss';

const NavigationBar = ({ navItems }) => {
  return (
    <nav>
      <ul className={navigationBarStyles.navList}>
        {navItems.map((item) => (
          <li>
            {createNavItem(item)}	
          </li>
        ))} 
      </ul>
    </nav>
  );
}

const createNavItem = ({ displayName, relativePath }) => {
  return (
    <Link 
      className={navigationBarStyles.navItem}
      activeClassName={navigationBarStyles.activeNavItem}
      to={relativePath}>
        {displayName}
    </Link>
  );
};

export default NavigationBar;
