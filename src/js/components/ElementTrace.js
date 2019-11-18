import React from 'react';
import Plots from './plots';
import BarChart from './BarChart'

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
		<th><BarChart width={400} height={300} data={props.data} country={'Cyprus'} fillColor={fillColors[0]} id={'Cyprus_elementTrace_bar'}/></th>
	    <th><BarChart width={400} height={300} data={props.data} country={'Turkey'} fillColor={fillColors[1]} id={'Turkey_elementTrace_bar'}/></th>
	  	<th><BarChart width={400} height={300} data={props.data} country={'Greece, Crete'} fillColor={fillColors[2]} id={'Crete_elementTrace_bar'}/></th>
	  	<th><BarChart width={400} height={300} data={props.data} country={'Greece'} fillColor={fillColors[3]} id={'Greece_elementTrace_bar'}/></th>
	  </tr>

	  <tr>
		<th><BarChart width={400} height={300} data={props.data} country={'Sardinia'} fillColor={fillColors[4]} id={'Sardinia_elementTrace_bar'}/></th>
	    <th><BarChart width={400} height={300} data={props.data} country={'Spain'} fillColor={fillColors[5]} id={'Spain_elementTrace_bar'}/></th>
	  	<th><BarChart width={400} height={300} data={props.data} country={'Britain'} fillColor={fillColors[6]} id={'Britain_elementTrace_bar'}/></th>
	  	<th><BarChart width={400} height={300} data={props.data} country={'USA'} fillColor={fillColors[7]} id={'USA_elementTrace_bar'}/></th>
	  </tr>
	</table>
  );
}

export default ElementTrace;
