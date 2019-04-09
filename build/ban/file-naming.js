const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const DIRS_TO_CHECK = ['app'].map(name => path.resolve(__dirname, '..', '..', name));


function checkNaming() {

}

module.exports = checkNaming;
