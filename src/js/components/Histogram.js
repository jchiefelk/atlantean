import React from 'react';
import * as d3 from 'd3';


class Histogram extends React.Component {

  generateHistogram(data){
    let histogram = [
	  {'bin': -1.0, 'count': 0},
	  {'bin': -0.9, 'count': 0},
	  {'bin': -0.8, 'count': 0},
	  {'bin': -0.7, 'count': 0},
	  {'bin': -0.6, 'count': 0},
	  {'bin': -0.5, 'count': 0},
	  {'bin': -0.4, 'count': 0},
	  {'bin': -0.3, 'count': 0},
      {'bin': -0.2, 'count': 0},
	  {'bin': -0.1, 'count': 0},
	  {'bin': 0.0, 'count': 0},
	  {'bin': 0.1, 'count': 0},
	  {'bin': 0.2, 'count': 0},
	  {'bin': 0.3, 'count': 0},
	  {'bin': 0.4, 'count': 0},
	  {'bin': 0.5, 'count': 0},
	  {'bin': 0.6, 'count': 0},
	  {'bin': 0.7, 'count': 0},
	  {'bin': 0.8, 'count': 0},
	  {'bin': 0.9, 'count': 0},
	  {'bin': 1.0, 'count': 0}
	];

	data.forEach(function(element){
	  for(let x=0; x<histogram.length - 1; x++){
	    let value = parseFloat(element.deltaCopper65);
		if(value > histogram[x].bin && value < histogram[x+1].bin) {
		  histogram[x+1].count += 1;
		} else if(value < histogram[x].bin && value > histogram[x+1].bin){
		  histogram[x].count += 1;
		} else {
		    continue;
		}
	  };
	});

	return histogram;
  }

  componentDidMount() {
    let currentState = this;
    let margin = {top: 20, right: 20, bottom: 80, left: 40};
    let width = this.props.width - margin.left - margin.right;
    let height = this.props.height - margin.top - margin.bottom;

	// set the ranges
	let x = d3.scaleBand()
	          .range([0, width])
	          .padding(0.1);
	let y = d3.scaleLinear()
	          .range([height, 0]);
	          
	// append the svg object to the body of the page
	// append a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	let svg = d3.select("#" + currentState.props.country)
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", 
	          "translate(" + margin.left + "," + margin.top + ")");
    

    let graph_data = [];
    let isotopeTraceMap = {}


    this.props.data.allIsotopes.edges.forEach(function(element, index){
      isotopeTraceMap[element.node.id] = index
    });

    this.props.data.allMetal.edges.forEach(function(element){
	  
	  if(currentState.props.country === element.node.country){

		if (element.node.isotopeTraceAssayId){
	      let node = {
			'country': element.node.country,
			'description': element.node.description,
			'site': element.node.site,
			'source':  element.node.source
		  };

		  let isotopeTraceId = element.node.isotopeTraceAssayId.id;
		  let isotopeTraceData = currentState.props.data.allIsotopes.edges[isotopeTraceMap[isotopeTraceId]];
		  let combined_node = Object.assign(node, isotopeTraceData.node);
		  graph_data.push(combined_node)
		} 
      }
    });

    let histogram = this.generateHistogram(graph_data)

	// Scale the range of the data in the domains
	x.domain(histogram.map(function(d) { return d.bin; }));
	y.domain([0, d3.max(histogram, function(d) { return d.count; })]);

	// append the rectangles for the bar chart
	svg.selectAll(".bar")
      .data(histogram)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.bin); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.count); })
      .attr("height", function(d) { return height - y(d.count); })
	  .style('fill', function(d) {
	    return currentState.props.fillColor;
	  });

	// add the x Axis
	svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x));


	// text label for the x axis
	svg.append("text")             
	  .attr("transform",
	            "translate(" + (width/2) + " ," + 
	                           (height + margin.top + 20) + ")")
	  .style("text-anchor", "middle")
	  .text("\u03B4" + "(%)");

	// add the y Axis
	svg.append("g")
	  .call(d3.axisLeft(y));

	  // text label for the y axis
	svg.append("text")
	  .attr("transform", "rotate(-90)")
	  .attr("y", 0 - margin.left)
	  .attr("x",0 - (height / 2))
	  .attr("dy", "1em")
	  .style("text-anchor", "middle")
	  .text("Count");      
  }

  render(){
	return(
	  <div className={'body'}>
	   <h6 style={{color: 'black'}}>&delta;<sup>65</sup> Cu {this.props.title} ({this.props.country})</h6>
	    <svg id={this.props.country} ></svg>
	  </div>
	);	
  }
}

export default Histogram;
