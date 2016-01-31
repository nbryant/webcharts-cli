var jsdom = require('jsdom');
var d3 = require('d3');
var webcharts = require('webcharts');
var fs = require('fs');
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

function makeChart(dataFilePath, configFilePath){
	//get config file at path provided
	var settings = require(configFilePath);

	function doStuff(error, window){
		var body = window.document.querySelector('body');
		//force a size on the body so that chart will render - will need to update webcharts to not look for window object explicitly
		d3.select(body).property('offsetWidth', 10);
		var chart = webcharts.createChart(body, settings);
		
		//get csv file and parse into json
		//end_parsed will be emitted once parsing finished 
		converter.on("end_parsed", function (jsonArray) {
		   chart.init(jsonArray); //here is your result jsonarray 
		   console.log(chart.svg.node().parentNode.outerHTML)
		});
		 
		//read from file 
		fs.createReadStream(dataFilePath).pipe(converter);
	}

	//set up very basic DOM
	jsdom.env({
		html: '<html><body></body></html>',
		features:{ QuerySelector:true},
		done: doStuff
	});

}

module.exports = makeChart;
