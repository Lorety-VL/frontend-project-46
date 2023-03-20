import _ from 'lodash';

const mkDir = (keyName, typeOfKey, childrens) => (
  {
    keyName,
    typeOfKey,
    type: 'directory',
    childrens,
  }
);
const mkFile = (keyName, typeOfKey, value) => (
  {
    keyName,
    typeOfKey,
    type: 'file',
    value,
  }
);

const getDiffTree = (object1, object2) => {
  const keys = _.uniq([...Object.keys(object2), ...Object.keys(object1)]);
  const sortedKeys = _.sortBy(keys);
  const treeOfDiffs = sortedKeys.flatMap((key) => {
    if (_.has(object1, key) && _.has(object2, key) && _.isEqual(object1[key], object2[key])) {
      const node = _.isObject(object1[key]) ? mkDir(key, 'same', getDiffTree(object1[key], object2[key])) : mkFile(key, 'same', object1[key]);
      return node;
    }
    if (_.has(object1, key) && _.has(object2, key)) {
      if (_.isObject(object1[key]) && _.isObject(object2[key])) {
        const node1 = mkDir(key, 'same', getDiffTree(object1[key], object2[key]));
        return node1;
      }
      const node1 = _.isObject(object1[key]) ? mkDir(key, 'deleted', getDiffTree(object1[key], object1[key])) : mkFile(key, 'deleted', object1[key]);
      const node2 = _.isObject(object2[key]) ? mkDir(key, 'added', getDiffTree(object2[key], object2[key])) : mkFile(key, 'added', object2[key]);
      return [node1, node2];
    }
    if (!_.has(object2, key)) {
      const node = _.isObject(object1[key]) ? mkDir(key, 'deleted', getDiffTree(object1[key], object1[key])) : mkFile(key, 'deleted', object1[key]);
      return node;
    }
    if (!_.has(object1, key)) {
      const node = _.isObject(object2[key]) ? mkDir(key, 'added', getDiffTree(object2[key], object2[key])) : mkFile(key, 'added', object2[key]);
      return node;
    }
    throw new Error('received unknown key');
  });
  return treeOfDiffs;
};

export default getDiffTree;
