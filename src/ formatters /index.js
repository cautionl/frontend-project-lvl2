import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

// eslint-disable-next-line consistent-return
const formatter = (tree, format) => {
  if (format === 'stylish') {
    return stylish(tree);
  }
  if (format === 'plain') {
    return plain(tree);
  }
  if (format === 'json') {
    return json(tree);
  }
};

export default formatter;
