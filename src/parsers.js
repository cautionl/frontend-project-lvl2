import yaml from 'js-yaml';

const parsing = (data, expansion) => {
  if (expansion === '.json') {
    return JSON.parse(data);
  }
  return yaml.safeLoad(data);
};

export default parsing;
