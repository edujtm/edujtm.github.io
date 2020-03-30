import React from 'react';
import { Link } from 'gatsby';

import Head from '../components/Head';
import Layout from '../components/Layout';

const AboutPage = () => {
  return (
      <Layout>
        <Head title="blog" />
        <h1>About me!</h1>
        <p>
          I'm a student of computer engineering at Universidade Federal do Rio Grande do Norte. I'm interested primarily in topics about Android Development,
          but I also have a hobbyist interest in Machine Learning and Operating Systems.
        </p>
        <p>Need a developer? <Link to="/contact">Contact me.</Link></p>
      </Layout>
  );
}

export default AboutPage;