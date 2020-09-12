import _ from 'lodash';
import fs from 'fs';

const getData = (filepath) => JSON.parse(fs.readFileSync(filepath));

const getResult = (entries, data, data1) => {
  let result = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const key of entries) {
    if (_.has(data, key) && _.has(data1, key)) {
      if (data[key] === data1[key]) {
        result += `${key}: ${data[key]}\n`;
      } else if (data[key] !== data1[key]) {
        result += `-${key}: ${data[key]}\n+${key}: ${data1[key]}\n`;
      }
    } else if (!_.has(data, key)) {
      result += `+${key}: ${data1[key]}\n`;
    } else if (!_.has(data1, key)) {
      result += `-${key}: ${data[key]}\n`;
    }
  }
  return `{\n${result}}`;
};

const genDiff = (filepath, filepath1) => {
  const data = getData(filepath);
  const data1 = getData(filepath1);
  const entries = [...new Set([...Object.keys(data), ...Object.keys(data1)])].sort();
  return getResult(entries, data, data1);
};

export default genDiff;
