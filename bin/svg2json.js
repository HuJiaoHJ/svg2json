#!/usr/bin/env node
const svg2json = require('../index.js');

const argv = require('yargs')
  .option('i', {
    alias: 'inDir',
    describe: 'svg input directory',
    default: '',
    type: 'string',
  })
  .option('o', {
    alias: 'outFile',
    describe: 'json output file',
    default: '',
    type: 'string',
  })
  .help('h')
  .alias('h', 'help')
  .argv;

const inDir = argv.inDir;
const outFile = argv.outFile;

if (!inDir || !outFile) {
  throw new Error('options -i and -o can not empty');
}

svg2json(inDir, outFile);
