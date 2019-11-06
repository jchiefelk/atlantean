import React from 'react';
import Plots from './plots';
import BarChart from './barchart';


const fillColors = ['red', 'black', 'purple', 'gray', 'orange', 'lightskyblue', 'limegreen', 'pink'];
const countries = ['Turkey', 'Cyprus', 'Sardinia', 'USA', 'Britain', 'Greece, Crete', 'Greece', 'Spain'];
      

const ElementTrace = (props) => {
  return(
    <table>
	  <tr>
		<th><Plots country={'Cyprus'} fill_color={fillColors[0]} data={props.data} xVar={'copper wt(%) in Cyprus'} yVar={'iron wt(%) in Cyprus'}/></th>
		<th><Plots country={'Turkey'} fill_color={fillColors[1]} data={props.data} xVar={'copper wt(%) in Turkey'} yVar={'iron wt(%) in Turkey'}/></th>
		<th><Plots country={'Greece, Crete'} fill_color={fillColors[2]} data={props.data} xVar={'copper wt(%) in Greece, Crete'} yVar={'iron wt(%) in Greece, Crete'}/></th>
	    <th><Plots country={'Greece'} fill_color={fillColors[3]} data={props.data} xVar={'copper wt(%) in Greece'} yVar={'iron wt(%) in Greece'}/></th>
      </tr>

	  <tr>
	    <th><Plots country={'Sardinia'} fill_color={fillColors[4]} data={props.data} xVar={'copper wt(%) in Sardinia'} yVar={'iron wt(%) in Sardinia'}/></th>
		<th><Plots country={'Britain'} fill_color={fillColors[5]} data={props.data} xVar={'copper wt(%) in Britain'} yVar={'iron wt(%) in Britain'}/></th>
		<th><Plots country={'Spain'} fill_color={fillColors[6]} data={props.data} xVar={'copper wt(%) in Spain'} yVar={'iron wt(%) in Spain'}/></th>
		<th><Plots country={'USA'} fill_color={fillColors[7]} data={props.data} xVar={'copper wt(%) in USA'} yVar={'iron wt(%) in USA'}/></th>
	  </tr>

	  <tr>
		<th><div style={{'marginLeft': 100}}><BarChart data={props.data} width={400} height={300} country={'Cyprus'} fill_color={fillColors[0]} description={'Copper Ore'}/></div></th>
		<th><div style={{'marginLeft': 100}}><BarChart data={props.data} width={400} height={300} country={'Turkey'} fill_color={fillColors[1]} description={'Uluburun Shipreck Bun and Oxhide Ingots'}/></div></th>
		<th><div style={{'marginLeft': 100}}><BarChart data={props.data} width={400} height={300} country={'Greece, Crete'} fill_color={fillColors[2]} description={'Copper Artifacts'}/></div></th>
	    <th><div style={{'marginLeft': 100}}><BarChart data={props.data} width={400} height={300} country={'Greece'} fill_color={fillColors[3]} description={'Copper Artifacts'}/></div></th>
	  </tr>
	  <tr>
		<th><div style={{'marginLeft': 100}}><BarChart data={props.data} width={400} height={300} country={'Sardinia'} fill_color={fillColors[4]} description={'Bun and Oxhide Ingots'}/></div></th>
		<th><div style={{'marginLeft': 100}}><BarChart data={props.data} width={400} height={300} country={'Britain'} fill_color={fillColors[5]} description={'Bun Ingots'}/></div></th>
		<th><div style={{'marginLeft': 100}}><BarChart data={props.data} width={400} height={300} country={'Spain'} fill_color={fillColors[6]} description={'Copper Artifacts'}/></div></th>
		<th><div style={{'marginLeft': 100}}><BarChart data={props.data} width={400} height={300} country={'USA'} fill_color={fillColors[7]} description={'Copper Ore and Artifacts'}/></div></th>
	  </tr>

	</table>
  );
}

export default ElementTrace;
