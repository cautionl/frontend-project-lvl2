import _ from 'lodash';

const getTreeData = (data1, data2) => {
  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();
  const result = keys.map((currentKey) => {
    if (_.has(data1, currentKey) && _.has(data2, currentKey)) {
      if (_.isObject(data1[currentKey]) && _.isObject(data2[currentKey])) {
        return { key: currentKey, children: getTreeData(data1[currentKey], data2[currentKey]), status: 'children' };
      }
      const result1 = { key: currentKey, value: data1[currentKey], status: 'unchanged' };
      const result2 = {
        key: currentKey, oldValue: data1[currentKey], newValue: data2[currentKey], status: 'changed',
      };
      return (data1[currentKey] === data2[currentKey]) ? result1 : result2;
    }
    if (!_.has(data1, currentKey)) {
      return { key: currentKey, value: data2[currentKey], status: 'add' };
    }
    return { key: currentKey, value: data1[currentKey], status: 'del' };
  });
  return result;
};

export default getTreeData;
