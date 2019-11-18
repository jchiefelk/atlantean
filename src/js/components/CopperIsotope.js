import React from 'react';
import Histogram from './Histogram';

const fillColors = ['red', 'black', 'purple', 'gray', 'orange', 'lightskyblue', 'limegreen', 'pink'];
const countries = ['Turkey', 'Cyprus', 'Sardinia', 'USA', 'Britain', 'Greece, Crete', 'Greece', 'Spain'];


  // deltaCopper65
  // lead208To206
  // lead207To206
  // lead206To204

const CopperIsotope = (props) => {
  return(
  	<table>
  	  <tr>
        <th><Histogram data={props.data} width={600} height={300} country={'USA'} fillColor={fillColors[0]} title={'Keenaw Peninsula Ore'} isotope={'deltaCopper65'}/></th>
      </tr>
      <tr>
        <th><Histogram data={props.data} width={600} height={300} country={'Cyprus'} fillColor={fillColors[1]} title={'Ore'} isotope={'deltaCopper65'}/></th>
      </tr>
      <tr>
        <th><Histogram data={props.data} width={600} height={300} country={'Turkey'} fillColor={fillColors[2]} title={'Oxhide Ingots Uluburun Shipwreck'} isotope={'deltaCopper65'}/></th>
      </tr>
    </table>
  );
}

export default CopperIsotope;
