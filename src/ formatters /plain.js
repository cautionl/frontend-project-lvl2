import _ from 'lodash';

const stringify = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (_.isString(val)) {
    return `'${val}'`;
  }
  return val;
};

const renderPlain = (treeData) => {
  const iter = (data, ancestry = '') => {
    const filtredResult = data.filter((item) => item.type !== 'unchanged');
    const result = filtredResult.map((item) => {
      const property = ancestry ? `${ancestry}.${item.key}` : item.key;
      const newValue = stringify(item.value);
      switch (item.type) {
        case 'added':
          return `Property '${property}' was added with value: ${newValue}`;
        case 'removed':
          return `Property '${property}' was removed`;
        case 'changed':
          return `Property '${property}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
        case 'nested':
          return iter(item.children, property);
        default:
          throw new Error(`${item.type} is not defined`);
      }
    });

    return result.join('\n');
  };

  return iter(treeData);
};

export default renderPlain;
