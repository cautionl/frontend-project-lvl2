import _ from 'lodash';

const smallIdent = 2;
const indent = 4;

const createIndent = (depth) => {
  const indentCount = (depth * indent) + smallIdent;
  return ' '.repeat(indentCount);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }

  const keys = Object.keys(data);

  const result = keys.map((key) => `${createIndent(depth + 1)}  ${key}: ${stringify(data[key], depth + 1)}`);

  const attachmentMargins = ' '.repeat((depth + 1) * indent);
  return `{\n${result.join('\n')}\n${attachmentMargins}}`;
};

const renderStylish = (tree) => {
  const iter = (data, depth) => {
    const result = data.map((noda) => {
      switch (noda.type) {
        case 'added':
          return `${createIndent(depth)}+ ${noda.key}: ${stringify(noda.value, depth)}`;
        case 'removed':
          return `${createIndent(depth)}- ${noda.key}: ${stringify(noda.value, depth)}`;
        case 'changed': {
          const oldValue = `${createIndent(depth)}- ${noda.key}: ${stringify(noda.oldValue, depth)}`;
          const newValue = `${createIndent(depth)}+ ${noda.key}: ${stringify(noda.newValue, depth)}`;
          return `${oldValue}\n${newValue}`;
        }
        case 'unchanged':
          return `${createIndent(depth)}  ${noda.key}: ${stringify(noda.value, depth)}`;
        case 'nested':
          return `${createIndent(depth)}  ${noda.key}: ${iter(noda.children, depth + 1)}`;
        default:
          throw new Error(`${noda.type} is not defined`);
      }
    });

    const attachmentMargins = ' '.repeat(depth * indent);
    return `{\n${result.join('\n')}\n${attachmentMargins}}`;
  };

  return iter(tree, 0);
};

export default renderStylish;
