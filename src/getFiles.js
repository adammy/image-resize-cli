const fs = require('fs');
const path = require('path');
const colors = require('colors');
const settings = require('./../settings.json');

const filesToIgnore = ['.DS_Store', 'Thumbs.db'];
const allowedExtensions = ['.jpg', '.png', ''];
const originalSrc = settings.src;

/*
 * returns an array of objects
 * @param {String} src - the folder to traverse
 * @returns {Array}
 */
const getFiles = (src) => {

	return fs.readdirSync(src)

		// filter out certain system files
		.filter(file => !filesToIgnore.includes(file))

		// transform each element to an object literal
		.map(file => {

			const fullPath = path.join(src, file);
			const ext = path.extname(fullPath);
			const name = path.basename(file, ext);
			const fileStats = fs.statSync(fullPath);

			if (fileStats.isDirectory()) {
				return getFiles(fullPath);
			}

			return {
				name: name,
				ext: ext,
				path: fullPath.replace(originalSrc, '').replace(`${name}${ext}`, ''),
				size: fileStats.size
			};

		})

		/*
		 * flatten the array
		 * actual flatten() method is experimental and not integrated into Node runtime
		 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatten#Alternative
		 */
		.reduce((acc, val) => acc.concat(val), [])

		// filter out files that aren't images
		.filter(file => allowedExtensions.includes(file.ext));

};

module.exports = getFiles;
