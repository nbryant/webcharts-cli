#! /usr/bin/env node
var program = require('commander');
var child = require('child_process');
var makeChart = require('./test');

var userArgs = process.argv.slice(2);

// var config = require(userArgs[0]);
// makeChart(config);

program
  .arguments('<config> <data>')
  .option('-c, --config', 'config file to use for chart settings')
  .option('-d, --data', 'csv file to use for chart data')
  .action(function(config, data){
  	makeChart(data, config)
  })
  .parse(process.argv);

// exec('node test', function(err, stdout, stderr){
// 	console.log(stderr || stdout)
// });