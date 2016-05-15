#!/usr/bin/env node

const util = require('util');
const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const setupProject = (package, author) => { 

  const packageJSON =
`{
  "name": "${package}",
  "version": "1.0.0",
  "private": false,
  "preferGlobal": true,
  "bin": {
    "${package}": "bin/index.js"
  },
  "description": "",
  "engines": {
    "node": ">=6.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/${author}/${package}"
  },
  "keywords": [],
  "author": "${author}",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/${author}/${package}/issues"
  },
  "homepage": "https://github.com/${author}/${package}"
}
`;

  const indexJS =
`#!/usr/bin/env node

//
// Write your module.
//
`;

  const license = 
`The MIT License (MIT)

Copyright (c) 2016 ${author}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

  const readme =
`# ${package}
========================

`;

  const dirs = [
    `./${package}`,
    `./${package}/bin`,
  ];

  createDirectories(dirs);
  createFile(`./${package}/package.json`, packageJSON);
  createFile(`./${package}/bin/index.js`, indexJS);
  createFile(`./${package}/LICENSE`, license);
  createFile(`./${package}/README`, readme);
}

main();

function main() {
  console.log('*** starter-npm-cli: A npm CLI Package Starter Kit ***');
  const args = process.argv;
  switch (args.length) {
    case 4:
      setupProject(args[2], args[3]);
      showComplete();
      break;
    default:
      showUsage();
      break;
  }
}

function showUsage() {
  console.log('Usage:');
  console.log('starter-npm-cli [Project Name] [Author Name]');
  process.exit(-1);
}

function showComplete() {
  console.log('Completed.');
}

function getFileNames(dir) {
  if (fs.existsSync(dir)) { 
    return fs.readdirSync(dir);
  }
  return [];
}

function createDirectories(dirs) {
  dirs.map(function(dir) {
    if (!fs.existsSync(dir)) { 
      fs.mkdirSync(dir); 
      console.log('Create:', dir);
    }
  })
}

function npmInstall(npms) {
  npms.map(command => {
    console.log(command);
    exec(command, puts);
  });
}

function puts(error, stdout, stderr) { 
  util.puts(stdout);
  util.puts(stderr);
  util.puts(error);
}

function createFile(file, content) {
  if (!fs.existsSync(file)) { 
    fs.writeFileSync(file, content);
    console.log('Create:', file);
  }
}

function createJSON(file, json) {
  if (!fs.existsSync(file)) { 
    fs.writeFileSync(file, JSON.stringify(json, null, "  "));
    console.log('Create:', file);
  }
}

function fixJSON(file, key, value) {
  var json = JSON.parse(fs.readFileSync(file));
  json[key] = value;
  fs.writeFileSync(file, JSON.stringify(json, null, "  "));
  console.log('Fix:', file, 'Key:', key);
}

