var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("data.csv")
    .then(function(data) {
    console.log(data);
    
    //Cast data as numbers
    data.forEach(function(d) {
        d.income = +d.income;
        d.smokes = +d.smokes;
    });
    console.log(data[0]);

     // Create scale functions
     var xLinearScale = d3.scaleLinear()
     .domain([40000, d3.max(data, d => d.income)])
     .range([40000, width]);

     var yLinearScale = d3.scaleLinear()
     .domain([8, d3.max(data, d => d.smokes)])
     .range([height, 8]);

    });