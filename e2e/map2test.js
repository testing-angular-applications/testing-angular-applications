const fs = require('fs');
const path = require('path');
const spawnSync = require('child_process').spawnSync;
const glob = require('glob');
/**
 * Runs the command "git diff --name-only ..master" to find the differences between this branch
 * and the master branch.
 * @returns string[] of the file paths
 */
let gitdiff = () => {
  const task = 'git';
  const args = ["diff", "--name-only", "..master"]
  let diffs = spawnSync(task, args).output[1].toString();
  return diffs.split('\n');
}

/**
 * Reads the map2test json file.
 * @returns object directly mapping to the map2test json file
 */
let readMap2Test = () => {
  const map2testPath = path.resolve('e2e', 'map2test.json');
  return JSON.parse(fs.readFileSync(map2testPath));
}

/**
 * Matches the diff paths and returns a list of the test suites
 * @param map2Test object of the map2test json file
 * @param diffs string[] a list of file diffs
 * @returns string[] a list of test suites
 */
let diffPath2suite = (map2Test, diffs) => {
  let suites = [];
  // for each diff'd file
  for (let diff of diffs) {
    let diffFile = path.resolve(diff);
    // cycle through each mapping object
    for (let mapFiles of map2Test.mapping) {
      // check if the mapFiles path matches the diff'd file
      for (let mapFilePath of mapFiles.paths) {
        // use globbing because Protractor required globbing. 
        let files = glob.sync(mapFilePath);
        for (let file of files) {
          // if the diffFile matches any part of the file, we have a match
          if (diffFile.indexOf(file) !== -1) {
            // add the suites as long as the file does not exist
            for (let suite of mapFiles.suites) {
              if (!suites.includes(suite)) {
                suites.push(suite);
              }
            }
          }
        }
      }
    }
  }
  return suites;
}

/**
 * Gets the specs from the Protractor test
 * @param map2Test object of the map2test json file
 */
let getSpecs = (map2Test, suites) => {
  let specs = [];
  for (let suite of suites) {
    for (let spec of map2Test.suites[suite]) {
      if (!specs.includes(spec)) {
        specs.push(spec);
      }
    }
  }
  return specs;
}

// read file to get a list of specs
let map2Test = readMap2Test()
let suites = diffPath2suite(map2Test, gitdiff());
let specs = getSpecs(map2Test, suites);


// import protractor.conf.js and add spec on
let protractorConf = require('../protractor.conf').config;
protractorConf.specs = specs;
console.log('specs override');
console.log(specs.toString());
console.log('==============');

console.log('protractor config:');
console.log(protractorConf);
console.log('==============');
exports.config = protractorConf;
