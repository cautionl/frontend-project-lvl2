import _ from 'lodash';

const createTab = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (_.isString(val)) {
    return `'${val}'`;
  }
  return val;
};

const plain = (treeData) => {
  const iter = (data, heir = null) => {
    const resultsFiltered = data.filter((item) => item.status !== 'unchanged');
    const result = resultsFiltered.map((item) => {
      const newKey = heir ? `${heir}.${item.key}` : item.key;
      const newValue = createTab(item.value);
      if (item.status === 'add') {
        return `Property '${newKey}' was added with value: ${newValue}`;
      } if (item.status === 'del') {
        return `Property '${newKey}' was removed`;
      } if (item.status === 'changed') {
        return `Property '${newKey}' was updated. From ${createTab(item.oldValue)} to ${createTab(item.newValue)}`;
      }
      return iter(item.children, newKey);
    });

    return result.join('\n');
  };

  return iter(treeData);
};

export default plain;
