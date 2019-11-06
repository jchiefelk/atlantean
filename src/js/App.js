import React from 'react';
import { adopt } from 'react-adopt';

import CopperIsotope from './components/CopperIsotope';
import ElementTrace from './components/ElementTrace';

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
        isotopeTraceAssayId {
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

  allIsotopes {
    edges {
      node {
        id
        deltaCopper65
        lead208To206
        lead207To206
        lead206To204
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

      return <ElementTrace data={data}/>;
    }}
  </Query>
);

export default App;
