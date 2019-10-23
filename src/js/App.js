import * as d3 from "d3"
import d3Tip from "d3-tip"
import React from 'react';

import Plots from './plots';
import BarChart from './barchart';

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

const fillColors = ['red', 'black', 'purple', 'gray', 'orange', 'lightskyblue', 'limegreen', 'pink'];
const countries = ['Turkey', 'Cyprus', 'Sardinia', 'USA', 'Britain', 'Greece, Crete', 'Greece', 'Spain'];

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

      return (
        <table>
          <tr>
            <th><Plots fill_color={fillColors} data={data} countries={countries} xVar={'copper wt(%) in Cyprus'} yVar={'iron wt(%) in Cyprus'}/></th>
            <th><Plots fill_color={fillColors} data={data} countries={countries} xVar={'copper wt(%) in Turkey'} yVar={'iron wt(%) in Turkey'}/></th>
            <th><Plots fill_color={fillColors} data={data} countries={countries} xVar={'copper wt(%) in Greece, Crete'} yVar={'iron wt(%) in Greece, Crete'}/></th>
            <th><Plots fill_color={fillColors} data={data} countries={countries} xVar={'copper wt(%) in Greece'} yVar={'iron wt(%) in Greece'}/></th>
          </tr>
          <tr>
            <th><Plots fill_color={fillColors} data={data} countries={countries} xVar={'copper wt(%) in Sardinia'} yVar={'iron wt(%) in Sardinia'}/></th>
            <th><Plots fill_color={fillColors} data={data} countries={countries} xVar={'copper wt(%) in USA'} yVar={'iron wt(%) in USA'}/></th>
            <th><Plots fill_color={fillColors} data={data} countries={countries} xVar={'copper wt(%) in Britain'} yVar={'iron wt(%) in Britain'}/></th>
            <th><Plots fill_color={fillColors} data={data} countries={countries} xVar={'copper wt(%) in Spain'} yVar={'iron wt(%) in Spain'}/></th>
          </tr>
  
          <tr>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Cyprus'} fill_color={'limegreen'} description={'Copper Ore'}/></div></th>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Turkey'} fill_color={'pink'} description={'Uluburun Shipreck Bun and Oxhide Ingots'}/></div></th>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Greece, Crete'} fill_color={'red'} description={'Copper Artifacts'}/></div></th>
           <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Greece'} fill_color={'black'} description={'Copper Artifacts'}/></div></th>
          </tr>
          <tr>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Sardinia'} fill_color={'lightskyblue'} description={'Bun and Oxhide Ingots'}/></div></th>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Britain'} fill_color={'orange'} description={'Bun Ingots'}/></div></th>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Spain'} fill_color={'purple'} description={'Copper Artifacts'}/></div></th>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'USA'} fill_color={'gray'} description={'Copper Ore and Artifacts'}/></div></th>
          </tr>
        </table>
      );
    }}
  </Query>
);

export default App;
