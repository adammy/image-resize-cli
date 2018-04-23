const sharp = require('sharp');
const colors = require('colors');
const settings = require('./settings.json');
const getFiles = require('./src/getFiles');

const { src, output, sizes, ext } = settings;

// get all images specified in settings.src
const files = getFiles(src);

console.log(files);
