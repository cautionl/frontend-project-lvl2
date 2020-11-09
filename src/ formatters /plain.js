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

const plain = (diff) => {
  const iter = (data, heir = null) => {
    const resultsFiltered = data.filter((item) => item.status !== 'unchanged');
    const result = resultsFiltered.map((item) => {
      const { key, value, status } = item;
      const newKey = heir ? `${heir}.${key}` : key;
      const newValue = createTab(value);

      if (status === 'add') {
        return `Property '${newKey}' was added with value: ${newValue}`;
      } if (status === 'del') {
        return `Property '${newKey}' was removed`;
      } if (status === 'changed') {
        return `Property '${newKey}' was updated. From ${createTab(item.oldValue)} to ${createTab(item.newValue)}`;
      }
      return iter(item.children, newKey);
    });

    return result.join('\n');
  };

  return iter(diff);
};

export default plain;
