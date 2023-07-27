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

            chart.renderChart();
        } else {
            console.error("Failed to retrieve JSON data.")
        }
    }
});

class Heatmap {
    constructor(svg, json) {
        this.svg = svg;
        this.tooltip = d3.select("body")
            .append("div")
            .attr("id", "tooltip")
            .text("temp")

        this.baseTemp = json.baseTemperature;
        this.data = json.monthlyVariance;

        this.padding = {
            top: 60,
            right: 30,
            bottom: 60,
            left: 60
        };

        this.width = parseInt(this.svg.style("width"));
        this.height = parseInt(this.svg.style("height"));
    }

    formatMonth(month) {
        let tmp = new Date().setMonth(month-1);
        return d3.timeFormat("%b")(tmp)
    }

    renderChart() {
        console.log(this.data.length)

        // TODO: scaleband() instead?
        const xScale = d3.scaleLinear()
            .domain(
                d3.extent(this.data, (d) => d.year)
            )
            .range([this.padding.left, this.width - this.padding.right])

        const yScale = d3.scaleLinear()
            .domain(
                d3.extent(this.data, (d) => d.month)
            )
            .range([this.padding.top, this.height - this.padding.bottom])

        const cellWidth = (this.width - this.padding.left - this.padding.right) / Math.floor((this.data.length / 12));
        const cellHeight = (this.height - this.padding.top - this.padding.bottom) / 12;

        console.log(yScale.domain())

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

        this.allCells
            .on("mouseover", (event, d) => {
                console.log(event)
                this.tooltip.style("visibility", "visible")
                    .style("top", event.clientY - (this.tooltip.node().clientHeight + cellHeight/2) +"px")
                    .style("left", event.clientX - (this.tooltip.node().clientWidth/2) + "px")
                    .html(
                        this.formatMonth(d.month) + ", " + d.year +
                        "<br />" +
                        // TODO: base + variance
                        d.variance

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
                .attr("transform", "translate(-40, " + this.height / 2 + ") rotate(-90)")
                .text("Months")

        // Add title
        svg.append("text")
            .attr("id", "title")
            .attr("x", "50%")
            .attr("y", this.padding.top / 1.5 )
            .attr("text-anchor", "middle")
            .text("Global Temperature Heatmap")

        // Add Legend
    }
}
