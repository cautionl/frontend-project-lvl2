import fs from 'fs';
import yaml from 'js-yaml';

const parseJson = (filepath) => JSON.parse(fs.readFileSync(filepath));
const parseYaml = (filepath) => yaml.safeLoad(fs.readFileSync(filepath));

const getData = (filepath) => {
  if (filepath.split('.')[1] === 'json') {
    return parseJson(filepath);
  }
  return parseYaml(filepath);
};

export default getData;
