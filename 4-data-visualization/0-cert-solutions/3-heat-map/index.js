import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
const svg = d3.select("#root")
    .append("svg")
    .attr("id", "heatmap");

document.addEventListener('DOMContentLoaded', function() {
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    req.onload = function() {
        if(req.readyState === 4 && req.status === 200) {
            const json = JSON.parse(req.response);
            const chart = new Heatmap(svg, json)

            console.log(json)
            chart.renderChart();
        } else {
            console.error("Failed to retrieve JSON data.")
        }
    }
});

class Heatmap {
    // TODO: rework colors into a better gradient
    colors = [
        "darkblue",
        "blue",
        "teal",
        "lightblue",
        "lightgrey",
        "yellow",
        "orange",
        "pink",
        "red"
    ]
    legendSquareWidth = 30;

    constructor(svg, json) {
        this.svg = svg;
        this.tooltip = d3.select("body")
            .append("div")
            .attr("id", "tooltip")

        this.baseTemp = json.baseTemperature;
        this.data = json.monthlyVariance;

        this.varianceRange = d3.extent(this.data, (d) => d.variance);

        this.padding = {
            top: 90,
            right: 30,
            bottom: 80,
            left: 80
        };

        this.width = parseInt(this.svg.style("width"));
        this.height = parseInt(this.svg.style("height"));
    }

    formatMonth(month) {
        let tmp = new Date().setMonth(month-1);
        return d3.timeFormat("%B")(tmp)
    }

    // TODO: make sure the ranges are correct
    getColor(rangeMin, rangeMax, value, colorArray) {
        let rangeIncrement = (Math.abs(rangeMin) + Math.abs(rangeMax)) / colorArray.length;
        
        for(let lowerBound = rangeMin, i = 0; i < colorArray.length; i++) {
            if(lowerBound <= value && value <= lowerBound + rangeIncrement) {
                return colorArray[i]
            }
            
            lowerBound += rangeIncrement
        }
        
        return null;
    }

    renderChart() {
        console.log(this.data.length)

        const cellWidth = (this.width - this.padding.left - this.padding.right) / ((this.data.length / 12));
        const cellHeight = (this.height - this.padding.top - this.padding.bottom) / 12;

        // TODO: scaleband() instead?
        const xScale = d3.scaleLinear()
            .domain(
                d3.extent(this.data, (d) => d.year)
            )
            .range([this.padding.left, this.width - this.padding.right - cellWidth])

        const yScale = d3.scaleLinear()
            .domain(
                d3.extent(this.data, (d) => d.month)
            )
            .range([this.padding.top, this.height - this.padding.bottom - cellHeight])

        console.log(yScale.domain())
        console.log(yScale.range())

        // Draw all our data points / cells
        this.allCells = this.svg.selectAll("rect")
            .data(this.data)
            .enter()
            .append("rect")
                .attr("class", "cell") // TODO; add color
                .attr("width", cellWidth)
                .attr("height", cellHeight)
                .attr("x", (d) => xScale(d.year))
                .attr("y", (d) => yScale(d.month))
                .attr("data-month", (d) => d.month)
                .attr("data-year", (d) => d.year)
                .attr("data-temp", (d) => this.baseTemp + d.variance)
                .attr("fill", (d) => this.getColor(this.varianceRange[0], this.varianceRange[1], d.variance, this.colors))

        this.allCells
            .on("mouseover", (event, d) => {
                console.log(event)
                this.tooltip.style("visibility", "visible")
                    .style("top", event.clientY - (this.tooltip.node().clientHeight + cellHeight/2) +"px")
                    .style("left", event.clientX - (this.tooltip.node().clientWidth/2) + "px")
                    .attr("data-year", d.year)
                    .html(
                        this.formatMonth(d.month) + ", " + d.year +
                        "<br />" +
                        // TODO: base + variance
                        "temperature: " + (this.baseTemp + d.variance) +
                        "<br />" +
                        "variance: " + d.variance

                    )
            })
            .on("mouseout", () => {
                this.tooltip.style("visibility", "hidden")
            })

        // Setup for our axis
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.format("d"));
        const yAxis = d3.axisLeft(yScale)
            // .tickSize(10,)
            .tickFormat((d) => this.formatMonth(d));

        // Draw x-axis
        this.svg.append("g")
            .attr("id", "x-axis")
            .attr("transform", "translate(0, " + (this.height - this.padding.bottom) + ")")
            .call(xAxis)
            .append("text")
                .attr("id", "x-axis-label")
                .attr("fill", "black")
                .attr("x", "50%")
                .attr("y", 30)
                .attr("text-anchor", "middle")
                .text("Years");

        // Draw y-axis
        this.svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", `translate(${this.padding.left}, 0)`)
            .call(yAxis)
            .append("text")
                .attr("id", "y-axis-label")
                .attr("fill", "black")
                .attr("transform", "translate(-50, " + this.height / 2 + ") rotate(-90)")
                .text("Months")

        // Add title and description
        this.svg.append("text")
            .attr("id", "title")
            .attr("x", "50%")
            .attr("y", this.padding.top / 3)
            .attr("text-anchor", "middle")
            .text("Global Temperature Heatmap")

        this.svg.append("text")
            .attr("id", "description")
            .attr("x", "50%")
            .attr("y", this.padding.top / 1.5)
            .attr("text-anchor", "middle")
            .text("Visualize the average temperature and change from 1753 to 2015")

        // Add Legend
        const legend = this.svg.append("g")
            .attr("id", "legend")
            .attr("transform", "translate(" + (this.width - (this.colors.length*this.legendSquareWidth))/2 + ", " + (this.height - this.legendSquareWidth) + ")")
        
        legend.selectAll("rect")
            .data(this.colors)
            .enter()
            .append("rect")
                .attr("class", "color")
                .attr("width", this.legendSquareWidth)
                .attr("height", this.legendSquareWidth)
                .attr("x", (d, i) => i * this.legendSquareWidth)
                .attr("y", (d, i) => 0)
                .attr("fill", (d) => d)
                .attr("stroke", "black")
    }
}
