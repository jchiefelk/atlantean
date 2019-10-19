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

// const App = () => {
//   return <BarChart data={data} width={800} height={500} />;
// }

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

      return(
        <div style={{'marginLeft': 100}}>
          <BarChart element_data={data} width={800} height={500} />
        </div>
      );
    }}
  </Query>
);

// const App = () => (
//   <Query query={COMBINED_QUERIES} >
//     {result => {
//       const { loading, error, data } = result;
//       if (loading) {
//         return <div className="loader"></div>;
//       }
//       if (error) {
//         return <h1>ERROR</h1>;
//       }

//       return (
//         <table>
//           <tr>
//             <th><Plots data={data} country1={'USA'} country2={'Turkey'} country3={'Cyprus'}/></th>
//             <th><Plots data={data} country1={'USA'} country2={'Turkey'} country3={'Cyprus'}/></th>
//             <th><Plots data={data} country1={'USA'} country2={'Turkey'} country3={'Cyprus'}/></th> 
//           </tr>
//         </table>
//       );
//     }}
//   </Query>
// );

export default App;
