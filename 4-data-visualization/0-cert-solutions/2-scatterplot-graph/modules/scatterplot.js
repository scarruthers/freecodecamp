import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

class Scatterplot {
    /**
     * 
     * @param {Element} canvasID element we are rendering the plot on
     * @param {JSON} json data used to plot the scatterplot
     */
    constructor(canvasID, json) {
        this.svg = d3.select("#" + canvasID);
        this.data = json;
    }

    renderChart() {
        const w = this.svg.node().clientWidth;
        const h = this.svg.node().clientHeight;

        const pX = 50;
        const pY = 20;

        const parseTime = d3.timeParse("%M:%S")
        const parseYear = d3.timeParse("%Y")

        // console.log(this.svg);
        // console.log(w, h);
        console.log(this.data)

        const xScale = d3.scaleTime()
            .domain(
                d3.extent(this.data, (d) => parseYear(d.Year))
            )
            .range([
                pX,
                w - pX
            ])

        const yScale = d3.scaleTime()
            .domain(
                d3.extent(this.data, (d) => parseTime(d.Time))
            )
            .range([
                h - pY,
                pY
            ])

        this.svg.selectAll("circle")
            .data(this.data)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(parseYear(d.Year)))
            .attr("cy", (d, i) => yScale(parseTime(d.Time)))
            .attr("r", 5)
            .attr("data-xvalue", (d) => parseYear(d.Year))
            .attr("data-yvalue", (d) => parseTime(d.Time))
            .attr("class", "dot")

        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat("%Y"))
            
        const yAxis = d3.axisLeft(yScale)
            .tickArguments([d3.timeSecond.every(10)])
            .tickFormat(d3.timeFormat("%M:%S"))

        this.svg.append("g")
            .attr("id", "x-axis")
            .attr("transform", "translate(0, " + (h-pY) + ")")
            .call(xAxis)

        this.svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", "translate(" + pX + ")")
            .call(yAxis)

                
    }
}

export default Scatterplot;