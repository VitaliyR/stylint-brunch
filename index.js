'use strict';

const stylint = require('stylint');

class Stylinter {
  constructor(config) {
    this.config = config.plugins.stylint || undefined;
  }

  lint(data, path) {
    let errors;
    let warnings;

    // do the lint
    stylint(path, this.config).methods({
      read() {
        this.cache.filesLen = 1;
        this.cache.fileNo = 1;
        this.cache.file = path;
        this.cache.files = [path];
        this.parse(null, [data]);
      },
      done() {
        errors = this.cache.errs;
        warnings = this.cache.warnings;
      },
    }).create();

    const hasWarnings = warnings.length > 0;
    const hasErrors = errors.length > 0;

    if (!hasWarnings && !hasErrors) return Promise.resolve();

    let msg = `Stylint reported:\n ${errors}`;

    if (hasWarnings) {
      msg = `warn: ${warnings} ${msg}`;
    }

    return Promise.reject(msg);
  }
}

Stylinter.prototype.brunchPlugin = true;
Stylinter.prototype.type = 'stylesheet';
Stylinter.prototype.extension = 'styl';

module.exports = Stylinter;
