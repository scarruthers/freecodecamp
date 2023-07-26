import Scatterplot from './modules/scatterplot.js'

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
const svg = "scatterplot";

document.addEventListener('DOMContentLoaded', function() {
    

    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.send();
    req.onload = function() {
        if(req.readyState === 4 && req.status === 200) {
            const json = JSON.parse(req.response);
            const plot = new Scatterplot(svg, json);

            plot.renderChart();
        }
    }
})

