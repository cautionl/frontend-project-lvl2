import _ from 'lodash';

const linenIdent = 2;
const enclosureSpace = 4;

const createIndents = (depth) => {
  const space = (depth * enclosureSpace) - linenIdent;
  return ' '.repeat(space);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }

  const keys = Object.keys(data);

  const result = keys.map((key) => `${createIndents(depth + 1)}  ${key}: ${stringify(data[key], depth + 1)}`);

  const attachmentMargins = ' '.repeat(depth * enclosureSpace);
  return `{\n${result.join('\n')}\n${attachmentMargins}}`;
};

const renderStylish = (tree) => {
  const iter = (data, depth) => {
    const result = data.map((item) => {
      switch (item.type) {
        case 'added':
          return `${createIndents(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;
        case 'removed':
          return `${createIndents(depth)}- ${item.key}: ${stringify(item.value, depth)}`;
        case 'changed':
          return `${createIndents(depth)}- ${item.key}: ${stringify(item.oldValue, depth)}\n${createIndents(depth)}+ ${item.key}: ${stringify(item.newValue, depth)}`;
        case 'unchanged':
          return `${createIndents(depth)}  ${item.key}: ${stringify(item.value, depth)}`;
        case 'nested':
          return `${createIndents(depth)}  ${item.key}: ${iter(item.children, depth + 1)}`;
        default:
          throw new Error(`${item.type} is not defined`);
      }
    });

    const attachmentMargins = ' '.repeat(depth * enclosureSpace);
    console.log('--------');
    console.log(depth);
    console.log(data);
    console.log('--------');
    return `{\n${result.join('\n')}\n${attachmentMargins}}`;
  };

  return iter(tree, 1);
};

export default renderStylish;
