import _ from 'lodash';

const stylish = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (_.isString(val)) {
    return `'${val}'`;
  }
  return val;
};

const plain = (treeData) => {
  const iter = (data, ancestry = null) => {
    const resultsFiltered = data.filter((item) => item.type !== 'unchanged');
    const result = resultsFiltered.map((item) => {
      const newKey = ancestry ? `${ancestry}.${item.key}` : item.key;
      const newValue = stylish(item.value);
      switch (item.type) {
        case 'added':
          return `Property '${newKey}' was added with value: ${newValue}`;
        case 'removed':
          return `Property '${newKey}' was removed`;
        case 'changed':
          return `Property '${newKey}' was updated. From ${stylish(item.oldValue)} to ${stylish(item.newValue)}`;
        case 'nested':
          return iter(item.children, newKey);
        default:
          throw new Error(`${item.type} is not defined`);
      }
    });

    return result.join('\n');
  };

  return iter(treeData);
};

export default plain;
