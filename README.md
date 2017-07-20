# WORK IN PROGRESS, DO NOT USE!

# vue-block-system

Easily create block based websites!

## Table of contents

1. [Installation](#installation)
2. [Building](#building)
3. [Authors](#authors)
4. [Contribute](#contribute)
5. [License](#license)

## Installation
### yarn / npm

```sh
yarn add vue-block-system
```

```sh
npm i -S vue-block-system
```


## Building

In order to build vue-block-system, ensure that you have [Git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/) installed.

Clone a copy of the repo:
```sh
git clone https://github.com/larsvanbraam/vue-block-system.git
```

Change to the vue-block-system directory:
```sh
cd vue-block-system
```

Install dev dependencies:
```sh
yarn
```

Use one of the following main scripts:
```sh
yarn build           # build this project
yarn dev             # run dev-watch mode, serving example/index.html in the browser
yarn generate        # generate all artifacts (compiles ts, webpack, docs and coverage)
yarn test:unit       # run the unit tests
yarn validate        # runs validation scripts, including test, lint and coverage check
yarn lint            # run tslint on this project
yarn doc             # generate typedoc documentation
```

When installing this module, it adds a pre-push hook, that runs the `validate`
script before committing, so you can be sure that everything checks out.

If you want to create the distribution files yourself, you can run the
`build-dist` script, and the following files will get generated in the
`dist` folder:

- **/dist/vue-block-system.js**: bundled with webpack, can be loaded from
	a script tag, available as `window.SengScrollTracker`
- **/dist/vue-block-system.min.js**: same as above, but minified
- **/dist/vue-block-system-amd.js**: bundled with webpack, can be used
	with e.g. requirejs
- **/dist/vue-block-system-commonjs.js**: bundled with webpack, can be
	used in systems that support commonjs, but you should just use npm
- **/dist/vue-block-system-umd.js**: bundled with webpack, works in the
	browser, with requirejs, and in a commonjs system
- **/dist/vue-block-system-umd.min.js**: same as above, but minified
- **/dist/vue-block-system-system.js**: bundled with typescript, can be
	used in systems	that support systemjs
- **/dist/vue-block-system-es6.zip**: transpiled with typescript, only
	types are removed from the source files

## Authors
View [AUTHORS.md](./AUTHORS.md)

## Contribute
View [CONTRIBUTING.md](./CONTRIBUTING.md)

## License
[MIT](./LICENSE) © Lars van Braam
