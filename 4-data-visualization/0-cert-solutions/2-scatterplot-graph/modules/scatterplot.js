import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

class Scatterplot {
    /**
     * 
     * @param {Element} canvasID element we are rendering the plot on
     * @param {JSON} json data used to plot the scatterplot
     */
    constructor(canvasID, json) {
        this.svg = d3.select("#" + canvasID);
        this.tooltip = d3.select("#tooltip");
        this.data = json;
    }

    renderChart() {
        const w = this.svg.node().clientWidth;
        const h = this.svg.node().clientHeight;

        const radius = 6;

        const pX = 70;
        const pY = 60;

        const parseTime = d3.timeParse("%M:%S")
        const parseYear = d3.timeParse("%Y")

        const xScale = d3.scaleTime()
            .domain([
                d3.min(this.data, (d) => parseYear(parseInt(d.Year) - 1)),
                d3.max(this.data, (d) => parseYear(parseInt(d.Year) + 1))]
                // d3.extent(this.data, (d) => parseYear(d.Year))
            )
            .range([
                pX,
                w - (pX/2)
            ])

            console.log(xScale.domain())

        const yScale = d3.scaleTime()
            .domain(
                d3.extent(this.data, (d) => parseTime(d.Time))
            )
            .range([
                h - pY,
                pY
            ])

        // Draw our data points
        this.svg.selectAll("circle")
            .data(this.data)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(parseYear(d.Year)))
            .attr("cy", (d, i) => yScale(parseTime(d.Time)))
            .attr("r", radius)
            .attr("data-xvalue", (d) => d.Year)
            .attr("data-yvalue", (d) => parseTime(d.Time))
            .attr("class", (d) => (d.Doping === "" ? "dot clean" : "dot dirty"))
            .on("mouseover", (event, d) => {
                this.tooltip.attr("data-year", d.Year)
                    .style("visibility", "visible")
                    .style("top", event.clientY - this.tooltip.node().clientHeight - 3*radius + "px")
                    .style("left", event.clientX - this.tooltip.node().clientWidth/2 + "px")
                    .html(
                        `(${d.Nationality}) ${d.Name}` +
                        "<br />" +
                        `${d.Year}, ${d.Time}` +
                        "<br />" +
                        d.Doping
                    )
            })
            .on("mouseout", () => {
                this.tooltip.style("visibility", "hidden")
            })

        // Add our x/y axis
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat("%Y"))
            
        const yAxis = d3.axisLeft(yScale)
            .tickArguments([d3.timeSecond.every(10)])
            .tickFormat(d3.timeFormat("%M:%S"))

        this.svg.append("g")
            .attr("id", "x-axis")
            .attr("transform", "translate(0, " + (h-pY) + ")")
            .call(xAxis)

        this.svg.append("text")
            .attr("transform", "translate(0, " + (h-pY+40) + ")")
            .attr("x", "50%")
            .attr("text-anchor", "middle")
            .text("Year")

        this.svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", "translate(" + pX + ")")
            .call(yAxis)

        this.svg.append("text")
            .attr("id", "y-axis-label")
            .text("Time (m:s)")
            .attr("transform", "rotate(-90) translate(-250 17)")

        // Add graph title
        this.svg.append("text")
            .text("Doping Allegations in Cycling")
            .attr("id", "title")
            .attr("transform", "translate(0 30)")
            .attr("x", "50%")
            .attr("text-anchor", "middle")
            .style("font-size", "24px")
            
        // Add our legend
        this.svg.append("g")
            .attr("id", "legend")
            .attr("transform", `translate(${w - pX/2}, ${h/2})`)

        let legend = d3.select("#legend")
            .selectAll("g")
            .data([
                {
                    label: "dirty",
                    desc: "Doping accusations:"
                },
                {
                    label: "clean",
                    desc: "No doping accusations:"
                }])
            .enter()
            .append("g")

        legend.append("text")
            .attr("y", (d, i) => i * 17)
            .attr("text-anchor", "end")
            .text((d) => d.desc)

        legend.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("x", 5)
            .attr("y", (d, i) => i * 17 - 10 )
            .attr("class", (d) => d.label)
       
    }
}

export default Scatterplot;