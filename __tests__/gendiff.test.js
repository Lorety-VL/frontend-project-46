import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

let nestedFile1json;
let nestedFile2json;
let nestedFile1yml;
let nestedFile2yml;
let nestedResult;

beforeAll(() => {
  nestedFile1json = getFixturePath('nestedFile1.json');
  nestedFile2json = getFixturePath('nestedFile2.json');
  nestedFile1yml = getFixturePath('nestedFile1.yml');
  nestedFile2yml = getFixturePath('nestedFile2.yml');
  nestedResult = readFile('nestedResult.txt');
});

test('gendiff-json-nested', () => {
  expect(genDiff(nestedFile1json, nestedFile2json)).toEqual(nestedResult);
});

test('gendiff-yaml-nested', () => {
  expect(genDiff(nestedFile1yml, nestedFile2yml)).toEqual(nestedResult);
});
