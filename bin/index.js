#! /usr/bin/env node
var program = require('commander');
var child = require('child_process');
var makeChart = require('../index');

program
  .arguments('<config> <data> [viewbox]')
  .option('-c, --config', 'config file to use for chart settings')
  .option('-d, --data', 'csv file to use for chart data')
  .option('-v, --viewbox', 'viewbox to crop svg')
  .action(function(config, data, viewbox) {
  	makeChart(data, config, viewbox);
  })
  .parse(process.argv);
