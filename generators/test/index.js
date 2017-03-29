'use strict';
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const camelCase = require('lodash.camelcase');
const upperFirst = require('lodash.upperfirst');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('filepath', {
      type: String,
      desc: 'Path to the file to test',
      required: true
    });

    this.option('componentName', {
      type: String,
      desc: 'Name of the component to test'
    });
  }

  writing() {
    var isDir = fs.lstatSync(this.options.filepath).isDirectory();

    if (isDir) {
      var files = glob.sync('**/**.jsx', { dot: true, cwd: this.options.filepath });
      files.forEach(file => {
        var filepath = path.join(this.options.filepath, file);
        this._createTest(filepath);
      });
    } else {
      this._createTest(this.options.filepath);
    }
  }

  _createTest(filepath) {
    // Use or define a default component name.
    var extname = path.extname(filepath);
    var componentName = this.options.componentName;
    if (!componentName) {
      componentName = path.basename(filepath, extname);
      componentName = upperFirst(camelCase(componentName));
    }

    var dirname = path.dirname(filepath);
    var destinationPath = path.join(dirname, '__tests__', componentName + '.js');
    destinationPath = this.destinationPath(destinationPath);

    this.fs.copyTpl(
      this.templatePath('test.js.tpl'),
      destinationPath,
      {
        filepath: '../' + path.basename(filepath),
        name: componentName
      }
    );
  }
};
