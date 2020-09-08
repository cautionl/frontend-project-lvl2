#!/usr/bin/env node

import program from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'read more information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>');

program.version('0.0.1', '-v, --version', 'output the version number');

program.parse(process.argv);
