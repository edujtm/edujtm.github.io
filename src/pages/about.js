import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import Head from '../components/Head';
import Layout from '../components/Layout';
import RoundImage from '../components/RoundImage';
import PersonalProjects from '../components/PersonalProjects.tsx';

import layoutStyles from '../styles/pages/About.module.scss';

const AboutPage = () => {
  const query = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "deepart.jpeg" }) {
        childImageSharp {
          fixed(width: 150, height: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const { t } = useTranslation("about");

  return (
      <Layout>
        <Head title="About" />
        <div className={layoutStyles.profileContainer} >
          <div className={layoutStyles.profilePicture}>
            <RoundImage 
              fixed={query.file.childImageSharp.fixed} 
              alt="my photo" 
            />
          </div>
          <div className={layoutStyles.profileDescription}>
            <h1>
              {t("About me")}
            </h1>
            <p>
              {t('my-description')}
            </p>
            <p>{t('need-developer')} <Link to="/contact">{t('contact-me')}</Link></p>
          </div>
        </div>
        <PersonalProjects />
      </Layout>
  );
}

export default AboutPage;
