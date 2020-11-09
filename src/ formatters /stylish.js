import _ from 'lodash';

const linenIdent = 2;
const enclosureSpace = 4;

const createTab = (data, enclosure) => {
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
    return `${indent}  ${key}: ${createTab(data[key], enclosure + 1)}`;
  });
  const attachmentMargins = ' '.repeat(space - linenIdent);
  return `{\n${result.join('\n')}\n${attachmentMargins}}`;
};

const stylish = (tree) => {
  const iter = (data, enclosure) => {
    const space = enclosure * enclosureSpace + linenIdent;
    const indent = ' '.repeat(space);

    const result = data.map((item) => {
      if (item.status === 'add') {
        return `${indent}+ ${item.key}: ${createTab(item.value, enclosure)}`;
      }
      if (item.status === 'del') {
        return `${indent}- ${item.key}: ${createTab(item.value, enclosure)}`;
      }
      if (item.status === 'changed') {
        const oldVal = `${indent}- ${item.key}: ${createTab(item.oldValue, enclosure)}`;
        const newVal = `${indent}+ ${item.key}: ${createTab(item.newValue, enclosure)}`;
        return `${oldVal}\n${newVal}`;
      }
      if (item.status === 'unchanged') {
        return `${indent}  ${item.key}: ${createTab(item.value, enclosure)}`;
      }
      return `${indent}  ${item.key}: ${iter(item.children, enclosure + 1)}`;
    });

    const attachmentMargins = ' '.repeat(enclosure * enclosureSpace);
    return `{\n${result.join('\n')}\n${attachmentMargins}}`;
  };

  return iter(tree, 0);
};

export default stylish;
