import React from 'react'
import * as d3 from 'd3'


export default class BarChart extends React.Component {
  constructor(){
  	super()
  	this.elementSymbols = {
      'antimony': 'Sb',
      'arsenic': 'As',
      'bismuth': 'Bi',
      'cobalt': 'Co',
      'copper': 'Cu',
      'lead': 'Pb',
      'nickel': 'Ni',
      'selenium': 'Se',
      'silver': 'Ag',
      'sulfur': 'S',
      'tellurium': 'Te',
      'tin': 'Sn',
      'zinc': 'Zn',
      'iron': 'Fe'
    };
  }
  componentDidMount() {
    let currentState = this;
    let _data = this.props.data;
    let elementTrace = {};
    let graph_data = [];
    
    _data.allElements.edges.forEach(function(element, index){
      elementTrace[element.node.id] = index
    });
    
    _data.allMetal.edges.forEach(function(element){
      let country = element.node.country
      if(country == currentState.props.country) {
        let node = {
          'country': country,
          'description': element.node.description,
          'site': element.node.site,
          'source':  element.node.source,
        };
        if (element.node.elementTraceAssayId){
          let elementTraceId = elementTrace[element.node.elementTraceAssayId.id]
          let elementTraceData = currentState.props.data.allElements.edges[elementTraceId];
          let combined_node = Object.assign(node, elementTraceData.node);
          graph_data.push(combined_node)
        }      
      }
    });

    let bar_data = this.convertToWeightPercent(graph_data);

    // set the dimensions and margins of the graph
	let margin = {top: 20, right: 20, bottom: 50, left: 40};
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
	let svg = d3.select("#" + this.props.id)
	  .attr("width", width + margin.left + margin.right)
	  .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	  .attr("transform", 
	          "translate(" + margin.left + "," + margin.top + ")");

	  // Scale the range of the data in the domains
	  x.domain(bar_data.map(function(d) { return d.element; }));
	  y.domain([0, d3.max(bar_data, function(d) { return d.percent; })]);

	// append the rectangles for the bar chart
	svg.selectAll(".bar")
	  .data(bar_data)
	  .enter().append("rect")
	  .attr("class", "bar")
	  .attr("x", function(d) { return x(d.element); })
	  // .attr("width", x.bandwidth())
	  .attr('width', '1.5em')
	  .attr("y", function(d) { return y(d.percent); })
	  .attr("height", function(d) { return height - y(d.percent); })
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
	  .text("element");

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
	  .text("Weight %"); 

  }
  convertToWeightPercent(data) {
    let graph_data = []
    let histogram = {
      'antimony': 0,
      'arsenic': 0,
      'bismuth': 0,
      'cobalt': 0,
      'copper': 0,
      'lead': 0,
      'nickel': 0,
      'selenium': 0,
      'silver': 0,
      'sulfur': 0,
      'tellurium': 0,
      'tin': 0,
      'zinc': 0,
      'iron': 0
    };
    let country = '';
    data.forEach(function(element){
      let node = { };
      for(let key in element) {
        node = {
          'antimonyPercent': element.antimonyPercent,
          'antimonyPpm': element.antimonyPpm,
          'arsenicPercent': element.arsenicPercent,
          'arsenicPpm': element.arsenicPpm,
          'bismuthPercent': element.bismuthPercent,
          'bismuthPpm': element.bismuthPpm,
          'cobaltPercent': element.cobaltPercent,
          'cobaltPpm': element.cobaltPpm,
          'copperPercent': element.copperPercent,
          'copperPpm': element.copperPpm,
          'ironPpm': element.ironPpm,
          'ironPercent': element.ironPercent,
          'leadPercent': element.leadPercent,
          'leadPpm': element.leadPpm,
          'nickelPercent': element.nickelPercent,
          'nickelPpm': element.nickelPpm,
          'seleniumPercent': element.seleniumPercent,
          'seleniumPpm': element.seleniumPpm,
          'silverPercent': element.silverPercent,
          'silverPpm': element.silverPpm,
          'sulfurPercent': element.sulfurPercent,
          'sulfurPpm': element.sulfurPpm,
          'telluriumPercent': element.telluriumPercent,
          'telluriumPpm': element.telluriumPpm,
          'tinPercent': element.tinPercent,
          'tinPpm': element.tinPpm,
          'zincPercent': element.zincPercent,
          'zincPpm': element.zincPpm
        };
      }

      for(let _key in node) {
        if(node[_key] == null) {
            delete node[_key];
            continue;
        } 
        if(node[_key].includes('<') == true) {
          let new_value = node[_key].split('<');
          node[_key] = new_value[1];
        }
        let metal_measurement = _key.split('P')
        
        if(metal_measurement[1] == 'pm') {          
          let value = parseFloat(node[_key])/10000;
          let new_key = metal_measurement[0];
          histogram[new_key] = histogram[new_key] + value;
        } else if(metal_measurement[1] == 'ercent') {
          let value = parseFloat(node[_key]);
          let new_key = metal_measurement[0];
          histogram[new_key] = histogram[new_key] + value;
        }
      };
      country = element.country;
    });
    let new_histogram = [];
    for(let key in histogram){
      if(Number.isNaN(histogram[key]) == true){
        delete histogram[key];
      } else {
      histogram[key] = histogram[key]/data.length;
      let _hist = {
        'element': this.elementSymbols[key],
        'percent': histogram[key],
        'country': country
      };
      new_histogram.push(_hist)
      }
    }
    return new_histogram;
  }

  render() {
    return(
	  <div className="body">
	    <svg id={this.props.id}/>
	  </div>
    );
  }
}
