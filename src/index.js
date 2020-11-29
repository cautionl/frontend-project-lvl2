import fs from 'fs';
import path from 'path';
import buildInternalTree from './internalTree.js';
import parse from './parsers.js';
import format from './ formatters /index.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf8');

const getData = (filepath) => parse(readFile(filepath), path.extname(filepath).slice(1));

const genDiff = (filepath1, filepath2, form = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const internalTree = buildInternalTree(data1, data2);
  return format(internalTree, form);
};

export default genDiff;
