import * as d3 from 'd3';
import React from 'react';
import LinearGraph from './components/LinearGraph';
import ScatterPlotWithTrendline from './components/ScatterPlotWithTrendline';


export default class Plots extends React.Component {
    constructor(props) {
      super(props);
      // Set initial state
      this.state = {
        data: [],
        xVar: this.props.xVar,
        yVar: this.props.yVar,
        countries: this.props.countries
      };
    }
    componentDidMount() {
      // Picker options
      let currentState = this;
      let graph_data = [];
      let data = this.props.data
      let elementTraceMap = {}
      data.allElements.edges.forEach(function(element, index){
        elementTraceMap[element.node.id] = index
      });
      data.allMetal.edges.forEach(function(element){
        if(currentState.props.country == element.node.country) {
          let node = {
            'country': element.node.country,
            'description': element.node.description,
            'site': element.node.site,
            'source':  element.node.source,
          };

          let elementTraceId = element.node.elementTraceAssayId.id;
          let elementTraceData = data.allElements.edges[elementTraceMap[elementTraceId]];
          let combined_node = Object.assign(node, elementTraceData.node);
          graph_data.push(combined_node)
        }
      });
      data = this.convertToWeightPercent(graph_data);
      this.setState({data: data});
    }
    convertToWeightPercent(data) {
      let graph_data = []
      let currentState = this;
      data.forEach(function(element){

        for (let key in element) {
          if (element.country == currentState.props.country){
            let node = {
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
                let value = node[_key]/10000;
                let new_key = metal_measurement[0] + ' wt(%) in ' + element.country;
                delete node[_key];
                node[new_key] = value;
              } else {
                let value = parseFloat(node[_key])
                let new_key = metal_measurement[0] + ' wt(%) in ' + element.country;
                delete node[_key];
                node[new_key] = value;
              }
            };
            
            let new_node = {
              'label': element.country,
              'description': element.description,
               x: node[currentState.props.xVar]/100,
               y: node[currentState.props.yVar]/100
            };
            node['country'] = element.country;
            node['description'] = element.description;
            graph_data.push(new_node);
          } else {
            return;
          }
        };

      });
      return graph_data;
    }
    renderScatterPlotWithTrendline() {
      let country = '';
      if(this.props.country == 'Greece, Crete'){
        country = 'Crete';
      } else {
        country = this.props.country;
      }
      return (<ScatterPlotWithTrendline country={country} xVar={this.props.xVar} yVar={this.props.yVar} data={this.state.data} fill_color={this.props.fill_color} />);
    }
    render() {
        // Store all of the data to be plotted 
      return (this.renderScatterPlotWithTrendline());
    }
}
