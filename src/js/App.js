import React from 'react';
import { adopt } from 'react-adopt';

import GraphApp from './components/GraphApp';

import { Query } from '@apollo/react-components';
import { gql } from "apollo-boost";

const COMBINED_QUERIES = gql`
{
  allMetal {
        edges {
          node {
            id
            description
            source
            site
            country
            elementTraceAssayId {
             id
           }
          }
        }
  }

  allElements {
    edges {
      node {
        id
        copperPercent
        copperPpm
        arsenicPercent
        arsenicPpm
        silverPercent
        silverPpm
        nickelPpm
        nickelPercent
        cobaltPercent
        cobaltPpm
        goldPercent
        goldPpm
        zincPercent
        zincPpm
        sulfurPercent
        sulfurPpm
        antimonyPercent
        antimonyPpm
        tinPercent
        tinPpm
        leadPercent
        leadPpm
        seleniumPercent
        seleniumPpm
        telluriumPercent
        telluriumPpm
        bismuthPercent
        bismuthPpm
        ironPercent
        ironPpm
      }
    }
  }
}
`


const App = () => (
  <Query query={COMBINED_QUERIES} >
    {result => {
      const { loading, error, data } = result;
      if (loading) {
        return <div className="loader"></div>;
      }
      if (error) {
        return <h1>ERROR</h1>;
      }

      return <GraphApp data={data}/>;
  
    }}
  </Query>
);

export default App;
