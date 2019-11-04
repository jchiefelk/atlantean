import React from 'react';


export default class Bar extends React.Component {

  render() {
    let style = {
      fill: this.props.fill_color
    };

    return(
      <g>
        <rect class="bar" style={style} x={this.props.x} y={this.props.y + 5} width={this.props.width} height={this.props.height} />
      </g>
    )
  }

}
