#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'read more information')
  .option('-f, --format [type]', 'output format [stylish, plain, json]', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });

program.version('0.0.1', '-v, --version', 'output the version number');

program.parse(process.argv);
