'use strict';

// Documentation for Brunch plugins:
// http://brunch.io/docs/plugins

const stylint = require('stylint');

// Remove everything your plugin doesn't need.
class BrunchPlugin {
  constructor(config) {
    // Replace 'plugin' with your plugin's name;
    this.config = config.plugins.plugin || {};
  }

  // Optional
  // Specifies additional files which will be included into build.
  // get include() { return ['path-to-file-1', 'path-to-file-2']; }

  // file: File => Promise[Boolean]
  // Called before every compilation. Stops it when the error is returned.
  // Examples: ESLint, JSHint, CSSCheck.
  // lint(file) { return Promise.resolve(true); }
  lint(file) {
    stylint(file, {
      namingConvention: 'BEM',
    }).create();

    return Promise.resolve(true);
  }

  // files: [File] => null
  // Executed when each compilation is finished.
  // Examples: Hot-reload (send a websocket push).
  // onCompile(files) {}
}

// Required for all Brunch plugins.
BrunchPlugin.prototype.brunchPlugin = true;

// Required for compilers, linters & optimizers.
// 'javascript', 'stylesheet' or 'template'
BrunchPlugin.prototype.type = 'stylesheet';

// Required for compilers & linters.
// It would filter-out the list of files to operate on.
BrunchPlugin.prototype.extension = 'styl';
// BrunchPlugin.prototype.pattern = /\.js$/;

// Indicates which environment a plugin should be applied to.
// The default value is '*' for usual plugins and
// 'production' for optimizers.
// BrunchPlugin.prototype.defaultEnv = 'production';

module.exports = BrunchPlugin;
