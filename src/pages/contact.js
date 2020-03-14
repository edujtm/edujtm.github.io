import React from 'react';

import Layout from '../components/Layout';
import Head from '../components/Head';

const ContactMe = () => {
  return (
      <Layout>
        <Head title="Contact Me"/>
        <h2>Contact information</h2>
        <ul>
          <li>Telefone: 12347575775</li>
          <li>Email: eduzemacedo@gmail.com</li>
          <li>StackOverflow: <a href="https://stackoverflow.com/users/8310836/eduardo-macedo">Eduardo Macedo</a></li>
          <li>GitHub: <a href="https://github.com/edujtm">edujtm</a></li>
        </ul>
      </Layout>
  );
};


export default ContactMe;