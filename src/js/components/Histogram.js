import React from 'react';
import * as d3 from 'd3';


class Histogram extends React.Component {
  generateHistogramForLead(){
  	let currentState = this;
    let graph_data = []
  	let isotopeTraceMap = {};

  	let margin = {top: 20, right: 20, bottom: 80, left: 60};
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
	let svg = d3.select("#" + currentState.props.country + currentState.props.isotope)
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", 
	          "translate(" + margin.left + "," + margin.top + ")");

    this.props.data.allIsotopes.edges.forEach(function(element, index){
      isotopeTraceMap[element.node.id] = index
    });

    this.props.data.allMetal.edges.forEach(function(element){
	  
	  if(currentState.props.country === element.node.country){
		if (element.node.isotopeTraceAssayId){
	      let isotopeTraceId = element.node.isotopeTraceAssayId.id;
		  let isotopeTraceData = currentState.props.data.allIsotopes.edges[isotopeTraceMap[isotopeTraceId]];
	      if(isotopeTraceData.node[currentState.props.isotope] != null){
		    let node = {
		      'country': element.node.country,
			  'description': element.node.description,
			  'site': element.node.site,
			  'source':  element.node.source
			};

	        node[currentState.props.isotope] = isotopeTraceData.node[currentState.props.isotope]
			  
			graph_data.push(node);
	      }
		} 
	   }
    });
   
    let histogramData = [];
    
    for(let x = 0; x < graph_data.length; x++){
      histogramData.push(parseFloat(graph_data[x][this.props.isotope]).toPrecision(4));
    };
    let max = Math.max(...histogramData);
    let min = Math.min(...histogramData);

    let numBins = 20;
    let binWidth = (max-min)/(numBins - 1);
    let histogram = [];
    let bin = min;

    for(let x = 0; x < numBins; x++){
      histogram.push({'bin': bin.toPrecision(4), 'count': 0});
      bin += binWidth;
    };

    histogramData.forEach(function(element){
      for(let x=0; x<numBins - 1; x++){
	    let value = parseFloat(element);
		if(value > histogram[x].bin && value < histogram[x+1].bin) {
		  histogram[x+1].count += 1;
		} else if(value < histogram[x].bin && value > histogram[x+1].bin){
		  histogram[x].count += 1;
		} else {
		    continue;
		}
	  };
    });

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
	  .call(d3.axisBottom(x))
	  .selectAll("text")	
	    .attr("y", 0)
	    .attr("x", 9)
	    .attr("dy", ".65em")
	    .style("font-size","1.3em")
	    .attr("transform", "rotate(65)")
	    .style("text-anchor", "start");


	// text label for the x axis
	svg.append("text")             
	  .attr("transform",
	            "translate(" + (width/2) + " ," + 
	                           (height + margin.top + 40) + ")")
	  .style("text-anchor", "middle")
	  .text(this.props.xAxisTitle);

	// add the y Axis
	svg.append("g")
	  .call(d3.axisLeft(y))
	  .selectAll("text")
	  .style("font-size","1.3em");

  // text label for the y axis
	svg.append("text")
	  .attr("transform", "rotate(-90)")
	  .attr("y", 0 - margin.left)
	  .attr("x",0 - (height / 2))
	  .attr("dy", "1em")
	  .style("text-anchor", "middle")
	  .text("Count"); 


  }
  generateHistogramForCopper(data){
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
  mountCopperHistogram(){
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

    let histogram = this.generateHistogramForCopper(graph_data)

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
  mountLeadHistogram(){
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

    let histogram = this.generateHistogramForLead(graph_data)

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

    let xAxis = d3.axisBottom(x)
        .tickFormat(d3.format(".1f"));

    let yAxis = d3.axisLeft(y)



	// add the x Axis
	svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x))
	  .tickFormat(d3.format(".1f"));


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
  componentDidMount() {
  	// if(this.props.isotope === 'deltaCopper65'){
   //    this.mountCopperHistogram();
  	// } else if (this.props.isotope === 'lead206To204'){

  	// }
  	this.generateHistogramForLead();
  }
  render(){
  		// <h6 style={{color: 'black'}}>&delta;<sup>65</sup> Cu {this.props.title} ({this.props.country})</h6>
	return(
	  <div className={'body'}>
	   <h6 style={{color: 'black'}}> {this.props.title} ({this.props.country})</h6>
	    <svg id={this.props.country + this.props.isotope} ></svg>
	  </div>
	);	
  }
}

export default Histogram;
