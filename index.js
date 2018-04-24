const sharp = require('sharp');
const colors = require('colors');
const settings = require('./settings.json');
const getFiles = require('./src/getFiles');

const { src, output, sizes, ext } = settings;
const files = getFiles(src);

files.forEach(file => {
	const path = ``;
	sharp(`${src}${file.path}${file.name}${file.ext}`)
		.resize(800, 500)
		.toFile(`${output}${file.path}${file.name}_800x500${file.ext}`);
});
