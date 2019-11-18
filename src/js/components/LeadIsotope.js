import React from 'react';
import Histogram from './Histogram';

const fillColors = ['red', 'black', 'purple', 'gray', 'orange', 'lightskyblue', 'limegreen', 'pink'];
const countries = ['Turkey', 'Cyprus', 'Sardinia', 'USA', 'Britain', 'Greece, Crete', 'Greece', 'Spain'];
   

      // <tr>
      //   <th><Histogram data={props.data} width={800} height={300} country={'Cyprus'} fillColor={fillColors[1]} title={'206Pb/204Pb Ore'} isotope={'lead206To204'}/></th>
      // </tr>
      // <tr>
      //   <th><Histogram data={props.data} width={800} height={300} country={'Turkey'} fillColor={fillColors[2]} title={'206Pb/204Pb Oxhide Ingots Uluburun Shipwreck'} isotope={'lead206To204'}/></th>  
      // </tr>



const LeadIsotope = (props) => {
  return(
  	<table>
      <tr>
        <th><Histogram data={props.data} width={800} height={300} country={'Cyprus'} fillColor={fillColors[1]} title={'206Pb/204Pb Ore'} isotope={'lead206To204'} xAxisTitle={'206Pb/204Pb'}/></th>
        <th><Histogram data={props.data} width={800} height={300} country={'Cyprus'} fillColor={fillColors[1]} title={'208Pb/206Pb Ore'} isotope={'lead208To206'} xAxisTitle={'208Pb/206Pb'}/></th>
        <th><Histogram data={props.data} width={800} height={300} country={'Cyprus'} fillColor={fillColors[1]} title={'207Pb/206Pb Ore'} isotope={'lead207To206'} xAxisTitle={'207Pb/206Pb'}/></th>
      </tr>
      <tr>
        <th><Histogram data={props.data} width={800} height={300} country={'Turkey'} fillColor={fillColors[2]} title={'206Pb/204Pb Oxhide Ingots Uluburun Shipwreck'} isotope={'lead206To204'} xAxisTitle={'206Pb/204Pb'}/></th>  
        <th><Histogram data={props.data} width={700} height={300} country={'Turkey'} fillColor={fillColors[2]} title={'208Pb/206Pb Oxhide Ingots Uluburun Shipwreck'} isotope={'lead208To206'} xAxisTitle={'208Pb/206Pb'}/></th>
        <th><Histogram data={props.data} width={800} height={300} country={'Turkey'} fillColor={fillColors[2]} title={'207Pb/206Pb Oxhide Ingots Uluburun Shipwreck'} isotope={'lead207To206'} xAxisTitle={'207Pb/206Pb'}/></th>
      </tr>
       <tr>
        <th><Histogram data={props.data} width={800} height={300} country={'USA'} fillColor={fillColors[3]} title={'206Pb/204Pb Galena Ore'} isotope={'lead206To204'} xAxisTitle={'206Pb/204Pb'}/></th> 
      </tr>

    </table>
  );
}

export default LeadIsotope;
