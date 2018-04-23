const fs = require('fs');
const path = require('path');
const allowedExtensions = ['jpg', 'png'];

const getFiles = (path) => {
	return fs.readdirSync(path)
		.map(file => {
			const fileObj = {
				name: file,
				path: path.join(path, file)
			};

		});
};

module.exports = getFiles;
