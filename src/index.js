import fs from 'fs';
import path from 'path';
import buildInternalTree from './internalTree.js';
import parse from './parsers.js';
import formatter from './ formatters /index.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf8');

const getData = (filepath) => parse(readFile(filepath), path.extname(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const dataPresentation = buildInternalTree(data1, data2);
  return formatter(dataPresentation, format);
};

export { genDiff as default, readFile };
