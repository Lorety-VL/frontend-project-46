import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';
import _ from 'lodash';

const addDiff = (key, acc, object1, object2) => {
  if (_.has(object1, key) && _.has(object2, key) && object1[key] === object2[key]) {
    return [...acc, `    ${key}: ${object1[key]}`];
  }
  if (_.has(object1, key) && _.has(object2, key) && object1[key] !== object2[key]) {
    return [...acc, `  - ${key}: ${object1[key]}`, `  + ${key}: ${object2[key]}`];
  }
  if (_.has(object1, key) && !_.has(object2, key)) {
    return [...acc, `  - ${key}: ${object1[key]}`];
  }
  if (!_.has(object1, key) && _.has(object2, key)) {
    return [...acc, `  + ${key}: ${object2[key]}`];
  }
};

const genDiff = (filePath1, filePath2) => {
  const current = cwd();
  const file1 = readFileSync(path.resolve(current, filePath1));
  const file2 = readFileSync(path.resolve(current, filePath2));
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const keys = _.uniq([...Object.keys(obj2), ...Object.keys(obj1)]);
  const sortedKeys = _.sortBy(keys);
  const arrOfDiffs = sortedKeys.reduce((acc, key) => addDiff(key, acc, obj1, obj2), []);
  const strOfDiffs = arrOfDiffs.join('\n')
  return `{\n${strOfDiffs}\n}`;
};

//console.log(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json'))

export default genDiff;
