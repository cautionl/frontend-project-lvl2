import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const definitionOutputFormat = (tree, format) => {
  switch (format) {
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      return stylish(tree);
  }
};

export default definitionOutputFormat;
