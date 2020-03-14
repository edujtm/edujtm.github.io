import React from 'react';
import { Link } from 'gatsby';

import navigationBarStyles from './NavigationBar.module.scss';

const NavigationBar = () => {
  return (
    <nav>
        <ul className={navigationBarStyles.navList}>
          <li>
            <Link 
              className={navigationBarStyles.navItem} 
              activeClassName={navigationBarStyles.activeNavItem}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              className={navigationBarStyles.navItem} 
              activeClassName={navigationBarStyles.activeNavItem}
              to="/blog"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link 
              className={navigationBarStyles.navItem} 
              activeClassName={navigationBarStyles.activeNavItem}
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              className={navigationBarStyles.navItem} 
              activeClassName={navigationBarStyles.activeNavItem}
              to="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
  );
}

export default NavigationBar;