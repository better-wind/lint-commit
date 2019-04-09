const chalk = require('chalk');

const packageJSON = require('../../package');

const LOCKED_VERSION = [
  'demo-fh'
]
const LOCKED_VERSION_REGEXP = /^[^*^~><=]+$/;

const WHITELIST = [
  'babel-eslint',
  'husky',
  'lint-staged',
  /^eslint.*$/,
  /^stylelint.*$/,
  'chalk',
  'fs',
  'path',
]

function isRegExp(val){
  return val instanceof RegExp;
}

const dependencies = {
  ...packageJSON.devDependencies,
  ...packageJSON.dependencies
}

function matchPackage(packageName, pkg) {
  if (isRegExp(pkg)) {
    return pkg.test(packageName)
  }
  return packageName === pkg;
}

function banNpmPackages(packageName) {
  const allow = WHITELIST.some(pkg => matchPackage(packageName, pkg));

  if (!allow) {
    const msg = `申诉请找${chalk.bold('wjf')}`;

    console.log(
      chalk.red(`不允许在依赖中使用此 npm 包 '${packageName}'，${msg}`)
    )
  }

  return !allow;
}

function isNpmPackageVersionLocked(packageName, version) {
  const isLocked = LOCKED_VERSION.some(pkg => matchPackage(packageName, pkg));

  if (!isLocked || LOCKED_VERSION_REGEXP.test(version)) {
    return true;
  }

  console.log(chalk.red(`必须写死版本号 ${packageName}: ${version}\n`));

  return false;

};

function checkNpmPackages() {
  const dependenciesList = Object.keys(dependencies);
  const somePackageBanned = dependenciesList.some(banNpmPackages);

  if (somePackageBanned) {
    process.exit(101);
  }

  const packageNotLocked = dependenciesList.some(
    pkg => !isNpmPackageVersionLocked(pkg, dependencies[pkg])
  );

  if (packageNotLocked) {
    process.exit(102);
  }
}

module.exports = checkNpmPackages;

