[![Travis](https://img.shields.io/travis/larsvanbraam/vue-block-system.svg?maxAge=2592000)](https://travis-ci.org/larsvanbraam/vue-block-system)
[![Code Climate](https://img.shields.io/codeclimate/github/larsvanbraam/vue-block-system.svg?maxAge=2592000)](https://codeclimate.com/github/larsvanbraam/vue-block-system)
[![npm](https://img.shields.io/npm/dm/vue-block-system.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-block-system)
[![GitHub issues](https://img.shields.io/github/issues/larsvanbraam/vue-block-system.svg?style=flat-square)](https://github.com/larsvanbraam/vue-block-system/issues)

# vue-block-system

Easily create block based websites! 

The block system uses the vue-transition-component to handle all component transitions. If you want to read more about this see the [documentation](https://larsvanbraam.github.io/vue-transition-component/). All blocks are transitioned when they enter the viewport. This is done using the [seng-scroll-tracker](https://mediamonks.github.io/seng-scroll-tracker/). 

## Table of contents

1. [Installation](#installation)
2. [Usage](#setup-for-usage)
	1. [Step 1: Enable the plugin](#step-1:-enable-the-plugin)
	2. [Step 2: Creating a wildcard route & content page](#step-2:-creating-a-wildcard-route-&-content-page)
	3. [Step 3: Generating a block](#step-3:-generating-a-block)
3. [Building](#building)
4. [Authors](#authors)
5. [Contribute](#contribute)
6. [License](#license)

## Installation
### yarn / npm

```sh
yarn add vue-block-system
```

```sh
npm i -S vue-block-system
```

## Global note: 
All examples below are based on the [vue-skeleton](https://github.com/hjeti/vue-skeleton) by [hjeti](https://github.com/hjeti/). 

## Usage
To use the block system there are a couple of steps to follow:

### Step 1: Enable the plugin
To start using the block system you have to enable the Vue plugin in the `src/control/startUp.js` file

```typescript
import BlockSystem from 'vue-block-system';
import block from 'block';

...
Vue.use(BlockSystem, {
		store,
		block,
		config: {
			api: {
				pageCall: 'static/api/page/{page}.json',
				initCall: 'static/api/init.json',
			},
			debugLabelStyling: {
				backgroundColor: 'blue',
			},
		},
	});
...

```
#### Store
The store option is the reference to the vuex store.

#### Block
The block option is the collection of blocks components that can be used on the page. Create a folder called **block** in the root of your applications src directory (`src/block`). This file should contain an `index.js` file that exports the block components just like any other component.

```typescript
import BlockBar from './BlockBar';
import BlockFoo from './BlockFoo';

export default {
	BlockBar,
	BlockFoo,
};
```

#### Config
The config object contains the configuration for the block-system

##### API configuration
The block system uses axios to do XHR requests, there are two types of requests that will be made. The first one is the `initCall`, this call should return at all the basic information that is required for the site to work. 

```json
{
	"data": {
		"routes": {
			"landing": "/home",
			"notFound": "/page-not-found"
		}
	}
}

```

After the init call is completed the block-system will try and load the page layout using the `pageCall`. The response should be in the following stucture.

```json
{
	"statusCode": 200,
	"data": {
		"title": "Home",
		"data": {
			"headerTheme": "red"
		},
		"blocks": [
			{
				"id": "blockFoo",
				"data": {}
			},
			{
				"id": "blockBar",
				"data": {
					"blocks": [
						{
							"id": "blockFoo",
							"data": {}
						}
					]
				}
			}
		]
	}
}

```
As you can see the root contains the main information about the page. The title being the title displayed in the tab-bar and the data is extra page related data that you might need on page level coding. After the data the array of blocks is provided and as you can see blocks can be recursively nested. You can see more about this on the block example section

##### Debug label configuration
Since your site might have a lot of different blocks nested within each other it might be usefull to display their name so you can easily track them in your block folder. Therefore the debug label was added, by default the debug label is located at the top left corner in red with white text. If you want to change any of this styling you can use this object to add all your CSS styling.

### Step 2: Creating a wildcard route & content page
Since the entire layout will be generated by either a static json file or a dynamic backend we need to frontend to work with a wildcard route that always ends up at the same vue page. You can do this by generating a content page with the [seng-generator](https://github.com/mediamonks/seng-generator). I've included a template folder that contains the files for generating this page. After you've went through the installation steps of the seng-generator you can add the new template path with the following actions:

````sh
sg init
````

This will allow you to change the settings, you can provide multiple paths as a template, make sure you keep the original value and add this path to the block-system templates. Leave the destination as it is.

````sh
./template,./node_modules/block-system/template
````

#### Rendering the content page
After you've added the templates to the seng-generator you can run:

````sh
sg wizard
````

from the root of your project. This will give you a couple of template options, choose the that is named `block-content-page`, the seng-generator will now prompt you with a name for your new page. I would suggest `ContentPage` to keep it as generic as possible. 

#### Adding the wildcard route
You now need to add the new page to the vue router. You can open the `src/router/routes.js` file and add the new page to the object

````typescript
import ContentPage from 'page/ContentPage';

...
{
	path: Pages.CONTENT_PAGE,
	component: ContentPage,
	name: PageNames.CONTENT_PAGE,
	props: { componentId: PageNames.CONTENT_PAGE },
}
...
````

Make sure the path for the new page is set to * when you open the `src/data/enum/Pages.js` file.

````typescript
export default {
	CONTENT_PAGE: '*',
};
````

If you open op the `src/page/ContentPage/ContentPage.vue` file you can see where the magic happens. here you can disable the debug label if you want to.

### Step 3: Generating a block
Creating blocks is just as easy as generating the content page, just run

````sh
sg wizard
````
from the root of your project. This will give you a couple of template options, choose the one that is named: `block-component` and choose your desired name, I would suggest starting blocks with the `Block` prefix. 

*Note: make sure to add the newly generated block to the `src/block/index.js`*

#### Nesting blocks within blocks
If you want to nest blocks within other blocks you need to add some code to your parent block. This will make sure it will render out the child blocks, this should be pretty much plug and play!

````html
<component
	v-for="(block, index) in data.blocks"
	@isReady="handleBlockComponentReady"
	:scrollId="block.scrollId"
	:data="block.data"
	:debugLabel="true"
	:is="block.id"
	:componentId="block.id + '.' + block.blockIndex"
	:key="index"></component>
````

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
