import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';
import { gql } from "apollo-boost";

import React from 'react';
import ReactDOM from 'react-dom';

import './css/App.css';
import './css/styles.css';

import App from './js/App';

const client = new ApolloClient({
  uri: 'http://localhost:8000/api/graphql',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
