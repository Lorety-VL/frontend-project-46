import _ from 'lodash';

const getDiffTree = (object1, object2) => {
  const keys = _.uniq([...Object.keys(object2), ...Object.keys(object1)]);
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.flatMap((key) => {
    if (!_.has(object2, key)) {
      return { key, type: 'deleted', value: object1[key] };
    }
    if (!_.has(object1, key)) {
      return { key, type: 'added', value: object2[key] };
    }
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return { key, type: 'nested', value: getDiffTree(object1[key], object2[key]) };
    }
    if (_.isEqual(object1[key], object2[key])) {
      return { key, type: 'unChanged', value: object1[key] };
    }
    if (!_.isEqual(object1[key], object2[key])) {
      return {
        key, type: 'changed', value1: object1[key], value2: object2[key],
      };
    }
    throw new Error('received unknown key');
  });
};

export default getDiffTree;
