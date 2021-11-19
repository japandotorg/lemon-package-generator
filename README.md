lemon-package-generator

> optionated template

## Why?

`lemon-package-generator` ensures all the rules given below are followed:

- provide your users with a helpful `.env.example`
  - [ ] TODO: update README to include a default paragraph to describe what to do with `.env.example`
- use [`dotenv`](https://www.npmjs.com/package/dotenv) for configuration, *following the tenets of a [twelve-factor app](http://12factor.net/)*
  - only use `dotenv` in your application entry point, *or library if applicable*.
- use container mode in [`travis`](https://travis-ci.org/) and leverage folder caching.
- use [`mocha`](https://www.npmjs.com/package/mocha) for testing
- use [`istanbul`](https://www.npmjs.com/package/istanbul) to generate coverage reports
- publish coverage reports to [codeclimate](https://codeclimate.com/) *(requires configuring travis with the appropriate `CODECLIMATE_REPO_TOKEN`)*
- use [`standard`](https://www.npmjs.com/package/standard) and [`echint`](https://www.npmjs.com/package/echint) for linting files
- enforce `standard` & `echint` by running on [`pretest`](https://docs.npmjs.com/misc/scripts)
- always generate code coverage reports by running `istanbul` on [`posttest`](https://docs.npmjs.com/misc/scripts)
- use [`commander`](https://www.npmjs.com/package/commander) to provide a CLI (Command Line Interface) *when applicable*
- use [`debug-log`](https://www.npmjs.com/package/debug-log) to provide helpful debugging messages without the use of `console.log`
- use [`EditorConfig`](http://editorconfig.org/) files *enforced by [`echint`](https://www.npmjs.com/package/echint)*
- keep your package lean, only include useful files for developers when running `npm install` *(see package.json + .npmignore files)*
- use the most permissive open source license *(currently ISC)*
- always expose your package's library modules *(see folder tree below)*
- follow a preferred folder tree & npm's default expected file naming:
  ```
  /package-name/
  ├── bin
  │   └── package-name
  ├── docs
  │   ├── API.md
  │   └── INSTALL.md
  ├── .editorconfig
  ├── .env.example
  ├── .gitattributes
  ├── .gitignore
  ├── .jshintrc
  ├── lib
  │   └── index.js
  ├── LICENSE
  ├── .npmignore
  ├── package.json
  ├── README.md
  ├── server.js
  ├── src
  │   └── index.js
  ├── test
  │   ├── fixtures
  │   └── index.js
  └── .travis.yml
  ```

  - `/docs/INSTALL.md`: detailed instructions for anything beyond `npm install`
  - `/docs/API.md`: if your package exposes an language API, or as an application a web API, document here.
  - `/lib`: library files: all common business logic, use this folder as heavily as possible, `e.g. Express routers`
  - `/src`: application files: the application logic (if any), `e.g. Express Server Setup`
  - `server.js`: your application entry point (this is the default target of `npm start`), use for initializing and managing the application state
  - `.jshintrc`: this is only useful for running through an online quality check tool *e.g. [codeclimate](https://codeclimate.com/)* which does not follow [`standard`](https://www.npmjs.com/package/standard) and has no configuration option for [`eslint`](http://eslint.org/) yet.

### Post Generating

  - remove any optional files and folders based on the type of project (e.g. `./bin`, `./src`, `./server.js`)
  - unless directly affecting your logic, don't write custom logic for clustering, use [`pm2`](https://www.npmjs.com/package/pm2) instead
  - only use `node v0.12.x` and above *(unless open-source, start with: `node v0.10`)*
  - use `npm scripts` when possible to automate install and build steps:
    - e.g. `"postinstall": "bower install"`
    - e.g. `"beforestart": "gulp build"`

## Work in progress...

This is a work in progress, and will likely be in this state forever!
I will be updating this frequently as common practices change over time, or as I learn new trick.

please reach out to share some feedback & contribute!

## Install

```sh
npm install --save lemon-package-generator
```

## Usage

```
  Usage: lemon-package-generator [options] name path
  Options:
    -h, --help          output usage information
    -V, --version       output the version number
    -a, --author        Author Name
    -d, --description   description
    -e, --author-email  Author Email
    -g, --github        Github Username
    -i, --install       Install Dependencies
    -q, --quiet         hide npm install output
    -w, --website       Author Website
```

## API

### lemon-package-generator([options])

```js
var generator = require('lemon-package-generator')
var options = {
    name: 'my-awesome-package',
    target: '~/Projects/my-awesome-package'
}
generator(options)
    .then(function (files) {
        console.log(files) /*-> [array of files created] */
    })
    .catch(function (err) {
        console.error(err)
    })
```

#### options

| option        | description                                     | default                           |
| ------------- | ----------------------------------------------- | --------------------------------- |
| `author`      | author name                                     | `process.env.AUTHOR_NAME`         |
| `description` | package description                             | `process.env.PACKAGE_DESCRIPTION` |
| `email`       | author email                                    | `process.env.AUTHOR_EMAIL`        |
| `github`      | github account                                  | `process.env.GITHUB_USERNAME`     |
| `install`     | run `npm install` and update dependencies       | `false`                           |
| `name`        | package name                                    | `process.env.PACKAGE_NAME`        |
| `quiet`       | pipe npm output to `process.stdout`             | `false`                           |
| `target`      | local path where the package files are created  | `process.cwd()`                   |
| `website`     | author website                                  | `process.env.AUTHOR_WEBSITE`      |
