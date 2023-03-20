import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

let file1json;
let file2json;
let nestedFile1json;
let nestedFile2json;
let file1yaml;
let file2yaml;
let result;
let nestedResult;

beforeAll(() => {
  file1json = getFixturePath('file1.json');
  file2json = getFixturePath('file2.json');
  nestedFile1json = getFixturePath('nestedFile1.json');
  nestedFile2json = getFixturePath('nestedFile2.json');
  file1yaml = getFixturePath('file1.yml');
  file2yaml = getFixturePath('file2.yml');
  result = readFile('result.txt');
  nestedResult = readFile('nestedResult.txt');
});

test('gendiff-json-flat', () => {
  expect(genDiff(file1json, file2json)).toEqual(result);
});

test('gendiff-yaml', () => {
  expect(genDiff(file1yaml, file2yaml)).toEqual(result);
});

test('gendiff-json-nested', () => {
  expect(genDiff(nestedFile1json, nestedFile2json)).toEqual(nestedResult);
});
