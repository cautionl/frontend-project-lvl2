#!/usr/bin/env node

import program from 'commander';
import _ from 'lodash';
import fs from 'fs';

const genDiff = (file, file1) => {
  const data = JSON.parse(file);
  const data1 = JSON.parse(file1);
  let result = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of data) {
    if (_.has(data1, key)) {
      if (value === data1.key) {
        // eslint-disable-next-line no-unused-vars
        result += `${key}: ${value}\n`;
      } else {
        // eslint-disable-next-line no-unused-vars
        result += `+${key}: ${value}\n-${key}: ${data1.key}`;
      }
    }
  }
  return `${result}`;
};

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'read more information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const data = fs.readFileSync(filepath1);
    const data1 = fs.readFileSync(filepath2);
    genDiff(data, data1);
  });

program.version('0.0.1', '-v, --version', 'output the version number');

program.parse(process.argv);
