import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Link, useTranslation, useI18next, I18nextContext } from 'gatsby-plugin-react-i18next';

import NavigationBar from './NavigationBar';
import Dropdown from './Dropdown';

import headerStyles from '../styles/components/Header.module.scss';

type UrlProps = {
  site: {
    siteMetadata: {
      title: string,
    }
  }
}

const Header = () => {
  const data = useStaticQuery<UrlProps>(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const {languages, changeLanguage} = useI18next();
  const context = useContext(I18nextContext);
  const { t } = useTranslation('header');

  const items = [
    {
      displayName: t("Home"),
      relativePath: "/"
    },
    {
      displayName: t("Blog"),
      relativePath: "/blog"
    },
    {
      displayName: t("About"),
      relativePath: "/about"
    },
    {
      displayName: t("Contact"),
      relativePath: "/contact"
    },
  ];

  const dropdownItems = languages.map((lang) => {
    return { 'id': lang, 'name': lang };
  });

  const { title } = data.site.siteMetadata;

  return (
      <header className={headerStyles.header}>
        <h1>
          <Link className={headerStyles.title} to="/">
            {t(title)}
          </Link>
        </h1>
        <div className={headerStyles.navbarContainer}>
          <NavigationBar navItems={items} />
          <Dropdown 
            title={context.language}
            items={dropdownItems}
            action={changeLanguage}
          />
        </div>
      </header>
  );
}

export default Header;
