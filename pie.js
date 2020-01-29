data = {};

function createFinalObject(CityMap) {

  let string = "";

  for (let key in CityMap) {
    string += CityMap[key].state;
  }
  for (let value of states) {
    let counter = 0;
    let pos = 0;
    while (true) {
      let foundPos = string.indexOf(value, pos);
      if (foundPos == -1) break;

      counter += 1;
      pos = foundPos + 1;
    }
    data[value] = counter;
  }
}

function update(data) {
  var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    margin = 20;
    radius = Math.min(width, height) / 2 - margin;

  var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var color = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemeSet2);

  var pie = d3.pie().value(function (d) {
    return d.value;
  });

  var data_ready = pie(d3.entries(data))

  var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius - 100);

  var arc = g.selectAll(".arc")
    .data(data_ready)
    .enter().append("g")
    .attr("class", "arc");

  arc.append("path")
    .attr("d", path)
    .attr("fill", function (d) {
      return color(d.data.key);
    })
    .attr('stroke', '#d6d6d6')
    .style('stroke-width', '1px')

  arc.append("text")
    .text(function (d) {
      return d.data.value + " " + d.data.key;
    })
    .attr("transform", function (d) {
      return "translate(" + label.centroid(d) + ")";
    })
    .style("text-anchor", "middle")
}