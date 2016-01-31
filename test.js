var jsdom = require('jsdom');
var d3 = require('d3');
var webcharts = require('webcharts');
var fs = require('fs');
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

// var csv = fs.readFileSync('./test/OlympicMedals2012_long.csv');
// console.log(csv)

var settings = {
	resizable: false,
  "width":"500",
  "x":{
    "label":"Medal Count",
    "type":"linear",
    "column":"count",
    domain: [0]
  },
  "y":{
    "type":"ordinal",
    "column":"Country",
    "sort":"total-descending"
  },
  "marks":[
    {
       "arrange":"grouped",
      "split":"type",
      "type":"bar",
      "per":["Country"],
      "attributes": {"fill-opacity": 0.8}
    }
  ],
  "gridlines":"x",
  "color_by":"type",
  colors: ["#8c7853", "#c0c0c0", "#e5c100"],
  legend: {
    label: 'Medal Type',
    order: ['Bronze', 'Silver', 'Gold']
  }
};

function doStuff(error, window){
	var body = window.document.querySelector('body');
	//force a size on the body so that chart will render - will need to update webcharts to not look for window object explicitly
	d3.select(body).property('offsetWidth', 10);
	var chart = webcharts.createChart(body, settings);
	//end_parsed will be emitted once parsing finished 
	converter.on("end_parsed", function (jsonArray) {
	   chart.init(jsonArray); //here is your result jsonarray 
	   console.log(chart.svg.node().innerHTML)
	});
	 
	//read from file 
	require("fs").createReadStream("./test/OlympicMedals2012_long.csv").pipe(converter);
}

jsdom.env({
	html: '<html><body></body></html>',
	features:{ QuerySelector:true},
	done: doStuff
});
