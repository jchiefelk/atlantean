import React from 'react';
import * as d3 from 'd3';
import Bar from './bar';
import XAxis from './xaxis';
import YAxis from './yaxis';


export default class BarChart extends React.Component {
  constructor(props){
    super(props);
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
    this.state = {
      data: [],
      binWidth: 10,
      histogram: {
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
      }, 
      'country': this.props.country,
      'description': this.props.description
    };
  }
  componentDidMount(){
    let currentState = this;
    let data = this.props.data;
    let elementTrace = {};
    let graph_data = [];
    data.allElements.edges.forEach(function(element, index){
      elementTrace[element.node.id] = index
    });
    data.allMetal.edges.forEach(function(element){
      let country = element.node.country
      if(country == currentState.state.country) {
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

    data = this.convertToWeightPercent(graph_data);

    this.setState({
      data: data
    });
  }

  convertToWeightPercent(data) {
    let graph_data = []
    let histogram = this.state.histogram;
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
    let data = this.state.data
    let margin = {top: 20, right: 20, bottom: 30, left: 45},
      width = this.props.width - margin.left - margin.right,
      height = this.props.height - margin.top - margin.bottom;

    let elements = data.map((d) => d.element)

    //D3 mathy bits    
    let ticks = d3.range(0, width, (width / data.length))
    
    let x = d3.scaleOrdinal()
      .domain(elements)
      .range(ticks)
    let y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.percent)])
      .range([height, 0])

    let bars = []
    let bottom = this.props.height - 50;
    
    data.forEach((datum, index) => {
      bars.push(<Bar data={data} key={index} x={x(datum.element)} y={bottom - 6 - (height - y(datum.percent))} width={10} height={height - y(datum.percent)} fill_color={this.props.fill_color}/>)
    })

    return (
    <div>
    <h6 style={{color: 'black'}}>{this.state.country} {this.state.description} Trace Elements</h6>
      <svg width={this.props.width} height={this.props.height}>
      	<YAxis y={40} labels={y.ticks().reverse()} start={15} end={height} />
	      
	      <g className="chart" transform={`translate(${margin.left},${margin.top})`}>
	         { bars }
	         <XAxis x={ bottom } labels={elements} start={0} end={width} />
	      </g>
      </svg>
    </div>
    );
  }

}
