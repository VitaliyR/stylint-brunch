fs = require('fs')
path = require('path')
chalk = require('chalk')
pluralize = require('pluralize')
spawn = require('child_process').spawn
command = require.resolve('stylint').replace(/index\.js$/, 'bin/stylint')

module.exports = class StylusLinter
  brunchPlugin: yes
  type: 'stylesheet'
  extension: 'styl'

  constructor: (@config) ->

    cfg = @config?.plugins?.stylint ? {}
    @options = if cfg.options? then cfg.options

    # Add .stylintrc support
    # unless @options
    #   filename = path.join process.cwd(), ".stylintrc"
    #   # read settings from .stylintrc file if exists
    #   try
    #     stats = fs.statSync(filename)
    #     if stats.isFile()
    #       buff = fs.readFileSync filename
    #       @options = JSON.parse  buff.toString()
    #   catch e
    #     e = e.toString().replace "Error: ENOENT, ", ""
    #     console.warn ".stylintrc parsing error: #{e}. stylint will run with default options."

  lint: (data, path, callback) ->
    args = [path]
    stylint = spawn(command, args)
    stylint.stdout.setEncoding('utf8')
    stylint.stderr.setEncoding('utf8')
    warnings = []

    stylint.stdout.on('data', (output) ->
      output = output.toString()
      output = output.split("\n").slice(1).join("\n")
      output = output.substring(0, output.lastIndexOf("\n"))
      output = output.substring(0, output.lastIndexOf("\n"))
      output = output.substring(0, output.lastIndexOf("\n"))

      if output.indexOf("Warning:") > -1
        warnings.push(output)
    )

    stylint.on('close', (code) ->

      warnings.forEach((warning) ->
        console.warn("#{chalk.yellow warning}")
      )
      callback()
    )
