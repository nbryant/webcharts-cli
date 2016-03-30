var path = require('path');
var jsdom = require('jsdom');
var d3 = require('d3');
var webcharts = require('webcharts');
var fs = require('fs');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});

var cwd = process.cwd();

function makeChart(dataFilePath, configFilePath, viewBox){
	// get config file at path provided
	var settings = require(path.resolve(cwd, configFilePath));
	var viewBoxArray = viewBox ? viewBox.split(' ') : [];

	function doStuff(error, window){
		var body = window.document.querySelector('body');
		// force a size on the body so that chart will render
		d3.select(body).property('offsetWidth', 10);
		var chart = webcharts.createChart(body, settings);
		
		// get csv file and parse into json
		// end_parsed will be emitted once parsing finished 
		converter.on('end_parsed', function (jsonArray) {
			chart.init(jsonArray); 
			var svg = chart.svg.node().parentNode;
			// crop svg if argument supplied
			if (viewBox && viewBoxArray.length === 4) {
				svg.setAttribute('viewBox', viewBoxArray.join(' '));
				svg.setAttribute('width', viewBoxArray[2]);
				svg.setAttribute('height', viewBoxArray[3]);
			}
			// spit out raw SVG code - will appear in stdout
			console.log(svg.outerHTML);
		});
		 
		// read from file 
		fs.createReadStream(path.resolve(cwd, dataFilePath)).pipe(converter);
	}

	// set up very basic DOM
	jsdom.env({
		html: '<html><body></body></html>',
		features:{ QuerySelector:true},
		done: doStuff
	});

}

module.exports = makeChart;
