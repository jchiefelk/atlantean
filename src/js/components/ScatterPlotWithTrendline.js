import React, {Component} from 'react';
import * as d3 from 'd3';


class ScatterPlotWithTrendline extends Component {
  calcLinear(data, x, y, minX, minY){
    // Calculate a linear regression from the data

    // Takes 5 parameters:
    // (1) Your data
    // (2) The column of data plotted on your x-axis
    // (3) The column of data plotted on your y-axis
    // (4) The minimum value of your x-axis
    // (5) The minimum value of your y-axis

    // Returns an object with two points, where each point is an object with an x and y coordinate

    /////////
    //SLOPE//
    /////////

    // Let n = the number of data points
    var n = 0;

    // // Get just the points
    var pts = [];
    data.forEach(function(d,i){
      var obj = {};
      obj.x = d[x];
      obj.y = d[y];
      obj.mult = obj.x*obj.y;
      pts.push(obj);
    });

    // // Let a equal n times the summation of all x-values multiplied by their corresponding y-values
    // // Let b equal the sum of all x-values times the sum of all y-values
    // // Let c equal n times the sum of all squared x-values
    // // Let d equal the squared sum of all x-values
    var sum = 0;
    var xSum = 0;
    var ySum = 0;
    var sumSq = 0;
    pts.forEach(function(pt){
      if(isNaN(pt.mult) == false){
        sum = sum + pt.mult;
        xSum = xSum + pt.x;
        ySum = ySum + pt.y;
        sumSq = sumSq + (pt.x * pt.x);
        n += 1;
      }
    });
    var a = sum * n;
    var b = xSum * ySum;
    var c = sumSq * n;
    var d = xSum * xSum;

    // // Plug the values that you calculated for a, b, c, and d into the following equation to calculate the slope
    // // slope = m = (a - b) / (c - d)
    var m = (a - b) / (c - d);

    // /////////////
    // //INTERCEPT//
    // /////////////

    // // Let e equal the sum of all y-values
    var e = ySum;

    // // Let f equal the slope times the sum of all x-values
    var f = m * xSum;

    // // Plug the values you have calculated for e and f into the following equation for the y-intercept
    // // y-intercept = b = (e - f) / n
    var b = (e - f) / n;

    // // Print the equation below the chart
    // document.getElementsByClassName("equation")[0].innerHTML = "y = " + m + "x + " + b;
    // document.getElementsByClassName("equation")[1].innerHTML = "x = ( y - " + b + " ) / " + m;

    // // return an object of two points
    // // each point is an object with an x and y coordinate
    
   let ptBX = 0;
   if ( (minY - b) / m < 0 ) {
     ptBX = -(minY - b) / m;
   } else {
     ptBX = (minY - b) / m;
   }

    return {
      ptA : {
        x: minX,
        y: m * minX + b
      },
      ptB : {
        y: minY,
        x: ptBX
      }
    }
  }
  renderSvg() {
    var margin = this.props.margin;
    var width = this.props.width - margin.left - margin.right;
    var height = this.props.height - margin.top - margin.bottom;

    var svg = d3.select("body").select("#" + this.props.country)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom()
        .scale(x)
        .ticks(5)
        .tickFormat(d3.format(".0%"));

    var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(5)
        .tickFormat(d3.format(".3%"));
    
      y.domain(d3.extent(this.props.data, function(d){ return d.y}));
      x.domain(d3.extent(this.props.data, function(d){ return d.x}));

      // // see below for an explanation of the calcLinear function
      var lg = this.calcLinear(this.props.data, "x", "y", d3.min(this.props.data, function(d){ return d.x}), d3.min(this.props.data, function(d){ return d.x}));
      svg.append("line")
          .attr("class", "regression-" + this.props.country)
          .attr("x1", x(lg.ptA.x))
          .attr("y1", y(lg.ptA.y))
          .attr("x2", x(lg.ptB.x))
          .attr("y2", y(lg.ptB.y))
          .attr("stroke", this.props.fill_color)
          .attr("stroke-width", '3px')
          .attr("stroke-dasharray", "10,5");

      svg.append("g")
          .attr("class", "x-axis-" + this.props.country)
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)


      svg.append("g")
          .attr("class", "y-axis" + this.props.country)
          .call(yAxis);

      svg.selectAll(".point")
          .data(this.props.data)
          .enter().append("circle")
          .attr("class", "point")
          .attr("r", 3)
          .attr("cy", function(d){ return y(d.y); })
          .attr("cx", function(d){ return x(d.x); })
          .style('fill', this.props.fill_color);
      
      // text label for the x axis
      svg.append("text")             
          .attr("transform",
                "translate(" + (width/2) + " ," + 
                               (height + margin.top + 20) + ")")
          .style("text-anchor", "middle")
          .text(this.props.xVar);

      // text label for the y axis
      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text(this.props.yVar);

  
  }
  render() {
    return (
      <div className="body">
        <svg id={this.props.country} />
        {this.renderSvg()}
      </div>
    );
  }
}


ScatterPlotWithTrendline.defaultProps = {
    width: 300,
    height: 300,
    margin: {
        left: 70,
        right: 10,
        top: 20,
        bottom: 50
    },
};

export default ScatterPlotWithTrendline;
