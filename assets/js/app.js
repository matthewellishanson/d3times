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


d3.csv("data.csv").then(function(data) {
    console.log(data);
    
    //Cast data as numbers
    data.forEach(function(d) {
        d.income = +d.income;
        d.smokes = +d.smokes;
    });
    console.log(data[0]);

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
     .domain([37000, d3.max(data, d => d.income)])
     .range([0, width]);

    var yLinearScale = d3.scaleLinear()
     .domain([8.6, d3.max(data, d => d.smokes)])
     .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


    // Append axes to chart
    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);
    chartGroup.append("g").call(leftAxis);

    // Create circles
    var circles = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.income))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "10")
        .attr("fill", "salmon")
        .attr("opacity", ".7");
    
    // Initialize tooltip
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Income: ${d.income}<br>% smokers: ${d.smokes}`);
      });
    
    // Call tooltip
    chartGroup.call(toolTip);

    // Display and hide the tooltip on hover
    circles.on("mouseover", function(data) {
        toolTip.show(data, this);
      })
        // hover
        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        });

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 10 - margin.left + 40)
    .attr("x", 10 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Smoking (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Average Income");

     

});