import * as d3 from "d3"
import d3Tip from "d3-tip"
import React from 'react';
import ScatterPlot from './scatterplot'


export default class Plots extends React.Component {
    constructor(props) {
        super(props);
        // Set initial state
        this.state = {
          data: [],
          xVar: this.props.xVar,
          yVar: this.props.yVar,
          options: ['iron', 'antimony','arsenic','bismuth', 'cobalt',
            'copper', 'lead', 'nickel','selenium', 'silver',
            'sulfur', 'tellurium', 'tin', 'zinc', 'gold'],
          countries: this.props.countries
        };
    }
    componentDidMount() {
      // Picker options
      let currentState = this;
      let _options = [];     
      this.state.options.map((d) => {
        for(let x = 0; x < this.state.countries.length; x++) {
          _options.push(d + ' wt(%) in ' + this.state.countries[x]);
        };
      });
      let graph_data = [];
      let data = this.props.data
      let elementTraceMap = {}
      data.allElements.edges.forEach(function(element, index){
        elementTraceMap[element.node.id] = index
      });
      data.allMetal.edges.forEach(function(element){
        if(currentState.props.countries.indexOf(element.node.country) === -1) {
          return;
        }
        else {
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
      this.setState({data: data, options: _options});
    }
    convertToWeightPercent(data) {
      let graph_data = []

      data.forEach(function(element){

        for (let key in element) {

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
          node['country'] = element.country;
          node['description'] = element.description;
          graph_data.push(node)
        }
      });
      
      return graph_data;
    }

    renderOptions() {
      // Get list of possible x and y variables
      let options = this.state.options;
      return (
        <div className="control-container">

            {/* X Variable Select Menu */}
            <div className="control-wrapper">
                <label htmlFor="xVar">X Variable:</label>
                <select id="xVar" value={this.state.xVar} className="custom-select" onChange={(d) => this.setState({ xVar: d.target.value })}>
                    {options.map((d) => {
                        return <option key={d}>{d}</option>
                    })}
                </select>
            </div>

            {/* Y Variable Select Menu */}
            <div className="control-wrapper">
                <label htmlFor="yVar">Y Variable:</label>
                <select id="yVar" value={this.state.yVar} className="custom-select" onChange={(d) => this.setState({ yVar: d.target.value })}>
                    {options.map((d) => {
                        return <option key={d}>{d}</option>
                    })}
                </select>
            </div>                        
        </div>
      );
    }

    render() {
        // Store all of the data to be plotted 
        let allData = this.state.data.map((d) => {
          return {
            x: d[this.state.xVar],
            y: d[this.state.yVar],
            label: d.country
          };
        });

        return (
            <div className="container">
                <ScatterPlot
                    fill_color={this.props.fill_color}
                    xTitle={this.state.xVar}
                    yTitle={this.state.yVar}
                    data={allData}
                    />
            </div>
        )
    }
}
