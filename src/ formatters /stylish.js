import _ from 'lodash';

const linenIdent = 2;
const enclosureSpace = 4;

const stringify = (data, enclosure) => {
  if (!_.isObject(data)) {
    return data;
  }

  const keys = Object.keys(data);
  const space = (enclosure + 1) * enclosureSpace + linenIdent;
  const indent = ' '.repeat(space);

  const result = keys.map((key) => {
    if (!_.isObject(data[key])) {
      return `${indent}  ${key}: ${data[key]}`;
    }
    return `${indent}  ${key}: ${stringify(data[key], enclosure + 1)}`;
  });
  const attachmentMargins = ' '.repeat(space - linenIdent);
  return `{\n${result.join('\n')}\n${attachmentMargins}}`;
};

const stylish = (tree) => {
  const iter = (data, depth) => {
    const space = depth * enclosureSpace + linenIdent;
    const indent = ' '.repeat(space);

    const result = data.map((item) => {
      switch (item.type) {
        case 'added':
          return `${indent}+ ${item.key}: ${stringify(item.value, depth)}`;
        case 'removed':
          return `${indent}- ${item.key}: ${stringify(item.value, depth)}`;
        case 'changed':
          return `${indent}- ${item.key}: ${stringify(item.oldValue, depth)}\n${indent}+ ${item.key}: ${stringify(item.newValue, depth)}`;
        case 'unchanged':
          return `${indent}  ${item.key}: ${stringify(item.value, depth)}`;
        case 'nested':
          return `${indent}  ${item.key}: ${iter(item.children, depth + 1)}`;
        default:
          throw new Error(`${item.type} is not defined`);
      }
    });

    const attachmentMargins = ' '.repeat(depth * enclosureSpace);
    return `{\n${result.join('\n')}\n${attachmentMargins}}`;
  };

  return iter(tree, 0);
};

export default stylish;
