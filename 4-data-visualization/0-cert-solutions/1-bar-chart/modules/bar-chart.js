import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

class barChart {
    constructor() {
        this.test = "bar-chart.js"
    }

    drawChart(canvasName, dataset) {
        const canvas = d3.select("#" + canvasName);
        const tooltip = d3.select("#" + "tooltip");

        const w = canvas.attr("width");
        const h = canvas.attr("height");
        
        const pX = 50; // set padding on x axis
        const pY = 25; // set padding on y axis

        const updatetooltip = new CustomEvent("updatetooltip");
        tooltip.node().addEventListener("updatetooltip", (event) => {
            let date = event.target.dataset.date;
            let gdp = event.target.dataset.gdp;
            tooltip.node().innerHTML = date + "<br />$" + parseFloat(gdp).toLocaleString("en-US") + " Billion";
        });

        // Set up our x, y data scaling
        const xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, (d) => new Date(d[0])),
                d3.max(dataset, (d) => new Date(d[0]))
            ])
            .range([
                pX,
                w - (pX / 2)
            ]);
        
        const yScale = d3.scaleLinear()
            .domain([
                0,
                d3.max(dataset, (d) => d[1])
            ])
            .range([
                h - pY,
                pY
            ]);

        // Draw bar chart on the canvas
        canvas.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(new Date(d[0])))
            .attr("y", (d, i) => yScale(d[1]))
            .attr("width", (d, i) => w / dataset.length)
            .attr("height", (d, i) => {
                return h - pY - yScale(d[1])
            })
            .attr("class", "bar")
            .attr("data-date", (d) => d[0])
            .attr("data-gdp", (d) => d[1])
            .on("mouseover", (event) => {
                // console.log(event.target)
                tooltip.attr("data-date", event.target.dataset.date);
                tooltip.attr("data-gdp", event.target.dataset.gdp);
                tooltip.style("visibility", "visible");
                tooltip.node().dispatchEvent(updatetooltip);
            })
            .on("mousemove", (event) => {
                tooltip.style("top", (event.target.y.baseVal.value) + "px");
                tooltip.style("left", (event.target.x.baseVal.value - tooltip.node().clientWidth/2) + "px");
            })
            .on("mouseout", (event) => {
                tooltip.style("visibility", "hidden");
            })


        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        canvas.append("g")
            .attr("transform", "translate(0, " + (h - pY) + ")")
            .attr("id", "x-axis")
            .call(xAxis);

        canvas.append("g")
            .attr("transform", "translate(" + pX + ")")
            .attr("id", "y-axis")
            .call(yAxis)
    }
}

export default barChart;