import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Img from "gatsby-image";
import Layout from '../components/Layout';

import notFoundStyles from "../styles/pages/404.module.scss";

const NotFoundPage = () => {
  const query = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "Astronaut.png" }) {
        childImageSharp {
          fixed(width: 400, height: 400) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <div id={notFoundStyles.container}>
        <h1>{"This page doesn't exist"}</h1>
        <p>Seems like we got a bit lost</p>
        <div id={notFoundStyles.astronautContainer}>
          <Img 
            id={notFoundStyles.astronaut}
            fixed={query.file.childImageSharp.fixed} 
            alt="Astronaut lost in space" 
          />
       
        </div>
        <p>
          <Link 
            id={notFoundStyles.homeButton}
            to="/"
          >
            Head back home
          </Link>
        </p> 
      </div>
    </Layout>
  );
};

export default NotFoundPage;
