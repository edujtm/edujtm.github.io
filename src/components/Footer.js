import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import footerStyles from './Footer.module.scss';

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

  const { author } = data.site.siteMetadata;

  return (
      <footer className={footerStyles.footer}>
        <p>Created by {author} with Gatsby.js</p>
      </footer>
  );
};

export default Footer;