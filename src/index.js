import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import buildInternalTree from './internalTree.js';
import parsing from './parsers.js';
import formatter from './ formatters /index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const getData = (filename) => parsing(readFile(filename), path.extname(filename));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const dataPresentation = buildInternalTree(data1, data2);
  return formatter(dataPresentation, format);
};

export { genDiff as default, readFile };
