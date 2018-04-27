#!/usr/bin/env node

'use strict';

// gather dependencies
const program = require('commander');
const getFiles = require('./src/getFiles');
const generateImages = require('./src/generateImages');

// get args for program
program
	.version('1.0.0')
	.option('-s, --src <required>', 'The source folder to traverse')
	.option('-d, --dest <required>', 'The destination folder for resized images')
	.option('-z, --sizes <required>', 'A nested array of image sizes, i.e. [[800, 500], [400, 250]]')
	.parse(process.argv);

// modify sizes prop that is provided as a string to be an array
if (program.sizes) {
	program.sizes = JSON.parse(program.sizes);
}

// create new settings by merging defaults and args passed in
const settings = Object.assign(require('./settings.json'), program);

// get files
const files = getFiles(settings.src, settings.src);

// generate images
generateImages(files, settings);
