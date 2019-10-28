import React from 'react';

import Plots from './plots';
import BarChart from './barchart';
import LinearGraph from './components/LinearGraph';

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
          
          // <tr>
          //   <th><Plots country={'Cyprus'} fill_color={fillColors[0]} data={data} xVar={'copper wt(%) in Cyprus'} yVar={'iron wt(%) in Cyprus'}/></th>
          //   <th><Plots country={'Turkey'} fill_color={fillColors[1]} data={data} xVar={'copper wt(%) in Turkey'} yVar={'iron wt(%) in Turkey'}/></th>
          //   <th><Plots country={'Greece, Crete'} fill_color={fillColors[2]} data={data} xVar={'copper wt(%) in Greece, Crete'} yVar={'iron wt(%) in Greece, Crete'}/></th>
          //   <th><Plots country={'Greece'} fill_color={fillColors[3]} data={data} xVar={'copper wt(%) in Greece'} yVar={'iron wt(%) in Greece'}/></th>
          // </tr>

          // <tr>
          //   <th><Plots country={'Sardinia'} fill_color={fillColors[4]} data={data} xVar={'copper wt(%) in Sardinia'} yVar={'iron wt(%) in Sardinia'}/></th>
          //   <th><Plots country={'USA'} fill_color={fillColors[5]} data={data} xVar={'copper wt(%) in USA'} yVar={'iron wt(%) in USA'}/></th>
          //   <th><Plots country={'Britain'} fill_color={fillColors[6]} data={data} xVar={'copper wt(%) in Britain'} yVar={'iron wt(%) in Britain'}/></th>
          //   <th><Plots country={'Spain'} fill_color={fillColors[7]} data={data} xVar={'copper wt(%) in Spain'} yVar={'iron wt(%) in Spain'}/></th>
          // </tr>
  
          // <tr>
          //   <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Cyprus'} fill_color={'limegreen'} description={'Copper Ore'}/></div></th>
          //   <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Turkey'} fill_color={'pink'} description={'Uluburun Shipreck Bun and Oxhide Ingots'}/></div></th>
          //   <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Greece, Crete'} fill_color={'red'} description={'Copper Artifacts'}/></div></th>
          //  <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Greece'} fill_color={'black'} description={'Copper Artifacts'}/></div></th>
          // </tr>
          // <tr>
          //   <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Sardinia'} fill_color={'lightskyblue'} description={'Bun and Oxhide Ingots'}/></div></th>
          //   <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Britain'} fill_color={'orange'} description={'Bun Ingots'}/></div></th>
          //   <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Spain'} fill_color={'purple'} description={'Copper Artifacts'}/></div></th>
          //   <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'USA'} fill_color={'gray'} description={'Copper Ore and Artifacts'}/></div></th>
          // </tr>


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
            <th><Plots country={'Cyprus'} fill_color={fillColors[0]} data={data} xVar={'copper wt(%) in Cyprus'} yVar={'iron wt(%) in Cyprus'}/></th>
            <th><Plots country={'Turkey'} fill_color={fillColors[1]} data={data} xVar={'copper wt(%) in Turkey'} yVar={'iron wt(%) in Turkey'}/></th>
            <th><Plots country={'Greece, Crete'} fill_color={fillColors[2]} data={data} xVar={'copper wt(%) in Greece, Crete'} yVar={'iron wt(%) in Greece, Crete'}/></th>
            <th><Plots country={'Greece'} fill_color={fillColors[3]} data={data} xVar={'copper wt(%) in Greece'} yVar={'iron wt(%) in Greece'}/></th>
          </tr>

          <tr>
            <th><Plots country={'Sardinia'} fill_color={fillColors[4]} data={data} xVar={'copper wt(%) in Sardinia'} yVar={'iron wt(%) in Sardinia'}/></th>
            <th><Plots country={'USA'} fill_color={fillColors[5]} data={data} xVar={'copper wt(%) in USA'} yVar={'iron wt(%) in USA'}/></th>
            <th><Plots country={'Britain'} fill_color={fillColors[6]} data={data} xVar={'copper wt(%) in Britain'} yVar={'iron wt(%) in Britain'}/></th>
            <th><Plots country={'Spain'} fill_color={fillColors[7]} data={data} xVar={'copper wt(%) in Spain'} yVar={'iron wt(%) in Spain'}/></th>
          </tr>

          <tr>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Cyprus'} fill_color={fillColors[0]} description={'Copper Ore'}/></div></th>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Turkey'} fill_color={fillColors[1]} description={'Uluburun Shipreck Bun and Oxhide Ingots'}/></div></th>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Greece, Crete'} fill_color={fillColors[2]} description={'Copper Artifacts'}/></div></th>
           <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Greece'} fill_color={fillColors[3]} description={'Copper Artifacts'}/></div></th>
          </tr>
          <tr>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Sardinia'} fill_color={fillColors[4]} description={'Bun and Oxhide Ingots'}/></div></th>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Britain'} fill_color={fillColors[5]} description={'Bun Ingots'}/></div></th>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'Spain'} fill_color={fillColors[6]} description={'Copper Artifacts'}/></div></th>
            <th><div style={{'marginLeft': 100}}><BarChart data={data} width={400} height={300} country={'USA'} fill_color={fillColors[7]} description={'Copper Ore and Artifacts'}/></div></th>
          </tr>
        
        </table>
      );
    }}
  </Query>
);

export default App;
