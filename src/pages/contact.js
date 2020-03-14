import React from 'react';

import Layout from '../components/Layout';
import Head from '../components/Head';

const ContactMe = () => {
  return (
      <Layout>
        <Head title="Contact Me"/>
        <h2>Contact information</h2>
        <ul>
          <li>Email: eduzemacedo@gmail.com</li>
          <li>StackOverflow: <a href="https://stackoverflow.com/users/8310836/eduardo-macedo">Eduardo Macedo</a></li>
          <li>GitHub: <a href="https://github.com/edujtm">edujtm</a></li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/eduardo-macedo-724938b1/">Eduardo Macedo</a></li>
        </ul>
      </Layout>
  );
};


export default ContactMe;