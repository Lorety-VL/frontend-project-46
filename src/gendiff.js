import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';
import parse from './parsers.js';
import getDiffTree from './getDiffTree.js';
import makeformat from './formatters/format.js';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const current = cwd();
  const file1 = readFileSync(path.resolve(current, filePath1), 'utf-8');
  const file2 = readFileSync(path.resolve(current, filePath2), 'utf-8');
  const fileExtension1 = path.extname(filePath1);
  const fileExtension2 = path.extname(filePath2);
  const obj1 = parse(file1, fileExtension1);
  const obj2 = parse(file2, fileExtension2);
  const diffTree = getDiffTree(obj1, obj2);
  return makeformat(diffTree, format);
};

export default genDiff;
