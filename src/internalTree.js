import _ from 'lodash';

const buildInternalTree = (data1, data2) => {
  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();
  const result = keys.map((currentKey) => {
    if (!_.has(data1, currentKey)) return { key: currentKey, value: data2[currentKey], type: 'add' };
    if (!_.has(data2, currentKey)) return { key: currentKey, value: data1[currentKey], type: 'del' };
    if (_.isObject(data1[currentKey]) && _.isObject(data2[currentKey])) {
      return { key: currentKey, children: buildInternalTree(data1[currentKey], data2[currentKey]), type: 'children' };
    }
    const result1 = { key: currentKey, value: data1[currentKey], type: 'unchanged' };
    const result2 = {
      key: currentKey, oldValue: data1[currentKey], newValue: data2[currentKey], type: 'changed',
    };
    return (data1[currentKey] === data2[currentKey]) ? result1 : result2;
  });
  return result;
};

export default buildInternalTree;
