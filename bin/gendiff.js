#!/usr/bin/env node

import program from 'commander';

program
  .description('Compares two configuration files and shows a difference.');

program.version('0.0.1', '-v, --version', 'output the version number');

program
  .helpOption('-h, --help', 'read more information');

program.parse(process.argv);
