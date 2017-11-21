[![Travis](https://img.shields.io/travis/larsvanbraam/vue-block-system.svg?maxAge=2592000)](https://travis-ci.org/larsvanbraam/vue-block-system)
[![Code Climate](https://img.shields.io/codeclimate/github/larsvanbraam/vue-block-system.svg?maxAge=2592000)](https://codeclimate.com/github/larsvanbraam/vue-block-system)
[![npm](https://img.shields.io/npm/dm/vue-block-system.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-block-system)
[![GitHub issues](https://img.shields.io/github/issues/larsvanbraam/vue-block-system.svg?style=flat-square)](https://github.com/larsvanbraam/vue-block-system/issues)

<p align="center">
    <img src="http://vue-block-system.larsvanbraam.nl/vue-block-system-1024.png" alt="vue-block-system" width="512"/>
</p>

Easily create block based websites! 

The block system uses the vue-transition-component to handle all component transitions. If you want to read more about this see the [documentation](https://larsvanbraam.github.io/vue-transition-component/). All blocks are transitioned when they enter the viewport. This is done using the [seng-scroll-tracker](https://mediamonks.github.io/seng-scroll-tracker/). 

## Global note: 
All examples below are based on the [vue-skeleton](https://github.com/hjeti/vue-skeleton) by [hjeti](https://github.com/hjeti/). 

## Installation
### yarn / npm

```sh
yarn add vue-block-system
```

```sh
npm i -S vue-block-system
```

## Demo
The repository contains a demo setup for the block system. It's based on the 0.3.1 version of the vue-skeleton. Since the block system is a plugin it should still work with newer versions of the skeleton. You can preview the demo either downloading the demo folder and running `yarn` to install all dependencies and then run `yarn dev` to start the dev server. 

### [Alternatively you can check the demo online.](http://vue-block-system.larsvanbraam.nl)


## Usage

Detailed documentation and examples are located in the wiki!

### [Check the wiki!](https://github.com/larsvanbraam/vue-block-system/wiki)

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
