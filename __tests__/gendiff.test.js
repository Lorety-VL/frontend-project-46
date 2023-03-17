import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const file1json = getFixturePath('file1.json');
const file2json = getFixturePath('file2.json');
const file1yaml = getFixturePath('file1.yml');
const file2yaml = getFixturePath('file2.yml');
const result = readFileSync(getFixturePath('expected.txt'), 'utf-8').trim();

test('gendiff-json', () => {
  expect(genDiff(file1json, file2json)).toEqual(result);
});

test('gendiff-yaml', () => {
  expect(genDiff(file1yaml, file2yaml)).toEqual(result);
});
