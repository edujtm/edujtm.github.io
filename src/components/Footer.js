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
        <p>Created by {author} with <a href="https://www.gatsbyjs.org/">Gatsby.js</a> | 
        <a href="https://icons8.com/icons/set/fireplace">Fireplace Icon</a> by <a href="https://icons8.com/">Icons8 </a> </p>
      </footer>
  );
};

export default Footer;
