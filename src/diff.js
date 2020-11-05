import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';

const getJson = (filepath) => JSON.parse(fs.readFileSync(filepath));
const getYaml = (filepath) => yaml.safeLoad(fs.readFileSync(filepath));

const getData = (filepath) => {
  if (filepath.split('.')[1] === 'json') {
    return getJson(filepath);
  }
  return getYaml(filepath);
}

const buildString = (key, data1, data2) => {
  if (_.has(data1, key) && _.has(data2, key)) {
    if (data1[key] === data2[key]) {
      return `${key}: ${data1[key]}\n`;
    } if (data1[key] !== data2[key]) {
      return `-${key}: ${data1[key]}\n+${key}: ${data2[key]}\n`;
    }
  } else if (!_.has(data1, key)) {
    return `+${key}: ${data2[key]}\n`;
  } else if (!_.has(data2, key)) {
    return `-${key}: ${data1[key]}\n`;
  }
};

const getResult = (data1, data2) => {
  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();
  const result = keys.map((key) => buildString(key, data1, data2));
  return `{\n${result.join('')}}`;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  return getResult(data1, data2);
};

export default genDiff;
