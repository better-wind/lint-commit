const checkNpmPackages = require('./npm-package');
const checkFileNaming = require('./file-naming')

function check() {
  checkNpmPackages();
  checkFileNaming();
}

check();
