# stylint-brunch

Adds stylint support to [Brunch](http://brunch.io).

## Usage

Install the plugin via npm with `npm install --save stylint-brunch`.

By default, only files in your `config.paths.app` are linted.

## Not available yet

By default the plugin checks if a .stylintrc exist, otherwise you can customize stylint config by changing brunch config:

```coffeescript
config =
  plugins:
    stylint:
      options:
        brackets: true
        colons: true
        emoji: true
```

For more options : [stylint](https://github.com/rossPatton/stylint).
