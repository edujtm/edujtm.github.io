import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import NavigationBar from './NavigationBar';

import headerStyles from './Header.module.scss';

const items = [
	{
			displayName: "Home",
			relativePath: "/"
	},
	{
			displayName: "Blog",
			relativePath: "/blog"
	},
	{
			displayName: "About",
			relativePath: "/about"
	},
	{
			displayName: "Contact",
			relativePath: "/contact"
	},
];

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { title } = data.site.siteMetadata;

  return (
      <header className={headerStyles.header}>
        <h1>
          <Link className={headerStyles.title} to="/">
            {title}
          </Link>
        </h1>
        <NavigationBar navItems={items} />
      </header>
  );
}

export default Header;
