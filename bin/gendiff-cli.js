#!/usr/bin/env node

import genDiff from '../src/gendiff.js';
import { Command } from 'commander';
const program = new Command();


program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filePath1, filePath2, options) => {
        console.log(genDiff(filePath1, filePath2));
    });

program.parse();
