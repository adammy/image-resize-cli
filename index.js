const jimp = require('jimp');
const colors = require('colors');
const settings = require('./settings.json');
const getFiles = require('./src/getFiles');
const { src, dest, sizes } = settings;

// get an array of all files to be modified
const files = getFiles(src);

// move through each file
files.forEach(file => {

	// gather the input var
	const input = `${src}${file.path}${file.name}${file.ext}`;

	// move through each requested size
	sizes.forEach(size => {

		// gather some reusable vars
		const width = size[0];
		const height = size[1];
		const output = `${dest}${file.path}${file.name}_${width}x${height}${file.ext}`;

		// read the image; returns a promise
		jimp.read(input)

			// if promise resolves
			.then(img => {

				// send messaging to user
				console.log('Source: ' + input.green);
				console.log('\tResized to ' + `${width}x${height}`.green);
				console.log('\tBuilt file sent to ' + output.green + '\n');

				// generate new image
				return img.resize(width, height).write(output);

			})

			// if promise rejects
			.catch(err => console.error(err.red + '\n'));

	});

});
