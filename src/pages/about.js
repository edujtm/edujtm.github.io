import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import Head from '../components/Head';
import Layout from '../components/Layout';
import RoundImage from '../components/RoundImage';

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
            <h1>About me!</h1>
            <p>
              I'm a student of computer engineering at Universidade Federal do Rio Grande do Norte. I'm interested primarily in topics about Android Development,
              but I also have a hobbyist interest in Machine Learning and Operating Systems.
            </p>
            <p>Need a developer? <Link to="/contact">Contact me.</Link></p>
          </div>
        </div>
      </Layout>
  );
}

export default AboutPage;
