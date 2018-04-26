#!/usr/bin/env node

'use strict';

// gather dependencies
const program = require('commander');
const getFiles = require('./src/getFiles');
const generateImages = require('./src/generateImages');
const settings = require('./settings.json');

// get files
const files = getFiles(settings.src, settings.src);

// generate images
generateImages(files, settings);
