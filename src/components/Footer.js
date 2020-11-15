import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';

import footerStyles from '../styles/components/Footer.module.scss';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  const { t } = useTranslation('footer');

  const { author } = data.site.siteMetadata;

  return (
      <footer className={footerStyles.footer}>
        <p>{t('gatsby-credit', { creator: 'Eduardo Macedo'})} <a href="https://www.gatsbyjs.org/">Gatsby.js</a> 
        <span> | </span> 
        <a href="https://icons8.com/icons/set/fireplace">{t('fireplace-icon')}</a> {t('by')} <a href="https://icons8.com/">Icons8 </a> </p>
      </footer>
  );
};

export default Footer;
