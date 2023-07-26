// codepen submission:
// https://codepen.io/scarruthers/pen/XWyxapB

import barChart from './modules/bar-chart.js'

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const canvasName = "bar-chart";

document.addEventListener('DOMContentLoaded', function () {
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    req.onload = function() {
        const json = JSON.parse(req.responseText);
        // console.log(json);

        document.getElementById("title").textContent = json.source_name + ", " + json.name;

        const chart = new barChart;
        chart.drawChart(canvasName, json.data);
};
});