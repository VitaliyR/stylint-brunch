/* eslint-env mocha */
/* eslint no-unused-expressions: off */

'use strict';

const expect = require('chai').expect;
const StylintPlugin = require('.');

describe('stylint-brunch', () => {
  let plugin;

  beforeEach(() => {
    plugin = new StylintPlugin({
      plugins: {},
    });
  });

  it('should be an object', () => {
    expect(plugin).to.be.an.instanceof(StylintPlugin);
  });

  it('should have #lint method', () => {
    expect(plugin).to.respondTo('lint');
  });

  it('should lint a valid file and throw no errors', () => {
    const filepath = './test.styl';
    const data = 'h1 color: blue';

    return plugin.lint(data, filepath);
  });

  it('should lint a invalid file and catch the error', () => {
    const filepath = './test.styl';
    const data = 'h1 color: blue;';

    return plugin
      .lint(data, filepath)
      .catch(() => { });
  });
});
