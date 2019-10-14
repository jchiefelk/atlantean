import * as d3 from "d3"
import d3Tip from "d3-tip"
import React from 'react';

import Plots from './plots';

import { Query } from '@apollo/react-components';
import { gql } from "apollo-boost";

import midwest_data from '../midwest.csv';

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
      return <Plots data={data}/>;
    }}
  </Query>
);

export default App;
