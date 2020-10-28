import React from 'react';

import Header from './Header';
import Footer from './Footer';

import '../styles/index.scss';
// Layout for rendering latex math equations
import 'katex/dist/katex.min.css';
import layoutStyles from './Layout.module.scss';

const Layout = (props) => {
  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.content}>
        <Header />
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
