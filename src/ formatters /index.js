import renderStylish from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

const format = (tree, form) => {
  switch (form) {
    case 'plain':
      return renderPlain(tree);
    case 'json':
      return renderJson(tree);
    case 'stylish':
      return renderStylish(tree);
    default:
      throw new Error(`${format} is not defined`);
  }
};

export default format;
