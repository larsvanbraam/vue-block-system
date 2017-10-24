[![Travis](https://img.shields.io/travis/larsvanbraam/vue-block-system.svg?maxAge=2592000)](https://travis-ci.org/larsvanbraam/vue-block-system)
[![Code Climate](https://img.shields.io/codeclimate/github/larsvanbraam/vue-block-system.svg?maxAge=2592000)](https://codeclimate.com/github/larsvanbraam/vue-block-system)
[![npm](https://img.shields.io/npm/dm/vue-block-system.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-block-system)
[![GitHub issues](https://img.shields.io/github/issues/larsvanbraam/vue-block-system.svg?style=flat-square)](https://github.com/larsvanbraam/vue-block-system/issues)

# vue-block-system

**!!!! Work in progress, contains bugs !!!**

Easily create block based websites! 

The block system uses the vue-transition-component to handle all component transitions. If you want to read more about this see the [documentation](https://larsvanbraam.github.io/vue-transition-component/). All blocks are transitioned when they enter the viewport. This is done using the [seng-scroll-tracker](https://mediamonks.github.io/seng-scroll-tracker/). 

## Table of contents

1. [Installation](#installation)
2. [Demo](#demo)
2. [Baisc usage](#basic-usage)
	1. [Step 1: Configure the seng generator](#configure-the-seng-generator)
		1. [Updating the template path](#updating-the-template-path)
	2. [Step 2: Generating a page](#generating-a-page)
	3. [Step 3: Creating a wildcard route](#creating-a-wildcard-route)
	4. [Step 4: Enable the plugin](#enable-the-plugin)
		1. [Store](#store)
		2. [Block](#block)
		3. [Config](#config)
			1. [API Configuration](#api-configuration)
			2. [Debug label configuration](#debug-label-configuration)
		4. [Wait for the plugin to be ready](#wait-for-the-plugin-to-be-ready)
	5. [Step 5: Creating a block](#creating-a-block)
		1. [Typing block data](#typing-block-data)
4. [Extra Features](#extra-features)
	1. [Nesting blocks withing blocks](#nesting-blocks-within-blocks)
		1. [Nesting blocks within blocks using an array](#nesting-blocks-within-blocks-using-an-array)
		2. [Nesting blocks within blocks using an object](#nesting-blocks-within-blocks-using-an-object)
	2. [Buttons](#buttons)
	3. [Before and after route changes](#before-and-after-route-changes)
		1. [Before route change](#before-route-change)
		2. [After route change](#after-route-change)
	4. [Custom data in the init call](#custom-data-in-the-init-call)
5. [Building](#building)
6. [Authors](#authors)
7. [Contribute](#contribute)
8. [License](#license)

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


## Basic usage
To use the block system there are a couple of steps to follow:

### Configure the seng generator
The block system uses mixins to extend the desired functionality. Extending the data could be a manual thing by copy and pasting the extends and creating the transition controllers manually. But to make it a little bit easier you should use the [seng-generator](https://github.com/mediamonks/seng-generator). If you followed the steps as described in the seng-generator install instructions you can follow these steps to add the custom templates for generating blocks and content pages!

#### Updating the template path
Open the terminal and change directory to the root of your project. After you've changed the working directory you can run the following:

```sh
sg init
```
After this you can modify the seng-generator configuration. The thing we want to change here is the template path so when it comes up you can modify it to be the following:

```sh
./template,./node_modules/vue-block-system/template
```

### Generating a page
After configuring the seng-generator you have to generate your vue page that will be used to output the pages. To do this we will use the seng-generator. So change directory to the root of you project and run the following:

```sh
sg wizard
```
This will give you a couple of template options, choose the that is labeled: **block-content-page**. The seng-generator will now prompt you with a name for your new page, I would something abstract like:

```sh
ContentPage
```

### Creating a wildcard route
You now need to add the new page to the vue router. You can open the `src/router/routes.js` file and add the new page to the object

```typescript
import ContentPage from 'page/ContentPage';

...
{
	path: Pages.CONTENT_PAGE,
	component: ContentPage,
	name: PageNames.CONTENT_PAGE,
	props: { componentId: PageNames.CONTENT_PAGE },
}
...
```
Make sure the path for the new page is set to * when you open the `src/data/enum/Pages.js` file.

```typescript
export default {
	CONTENT_PAGE: '*',
};
```
If you open op the `src/page/ContentPage/ContentPage.vue` file you can see where the magic happens. here you can disable the debug label if you want to.

### Enable the plugin
To start using the block system you have to enable the Vue plugin in the `src/control/startUp.js` file

```typescript
import BlockSystem from 'vue-block-system';
import block from 'block';

...
Vue.use(BlockSystem, {
		store,
		block
		config: {
			api: {
				pageCall: 'static/api/page/{page}.json',
				initCall: 'static/api/init.json',
				layoutCache: true,
			},
			debugLabelStyling: {
				backgroundColor: 'blue',
			},
			enablePageTransition: false,
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
By default every pageCall is cached, this can be disabled by changing the boolean to false.

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
		"disableCache": false,
		"data": {
			"headerTheme": "red"
		},
		"blocks": [
			{
				"id": "BlockFoo",
				"data": {}
			},
			{
				"id": "BlockBar",
				"data": {}
			}
		]
	}
}

```
As you can see the root contains the main information about the page. The title being the title displayed in the 
tab-bar, the disableCache can be set to false to disable caching of this specific layout(default is set to true) and 
the data is extra page related data that you might need on page level coding. 
After the data the array of blocks is provided and as you can see blocks can be recursively nested. You can see more about this on the block example section

### Wait for the plugin to be ready
To make sure the block system is ready there is a promise available that will be resolved when the init call is completed. You can use the promise `Vue.blockSystemReady` to check if the system is ready. Simply add it to the `Startup.js` in the `Promise.all[]` check

```javascript
...

// Add async methods to the Promise.all array
return Promise.all([
	Vue.blockSystemReady,
	configManager.getVariable(VariableNames.LOCALE_ENABLED) ? waitForLocale(store) : Promise.resolve(),
]);

...
```

##### Debug label configuration
Since your site might have a lot of different blocks nested within each other it might be usefull to display their name so you can easily track them in your block folder. Therefore the debug label was added, by default the debug label is located at the top left corner in red with white text. If you want to change any of this styling you can use this object to add all your CSS styling.

### Creating a block
Creating blocks is just as easy as generating the content page, just run

```sh
sg wizard
```
from the root of your project. This will give you a couple of template options, choose the one that is named: **block-component** and choose your desired name, I would suggest starting blocks with the `Block` prefix. 

*Note: The first time you generate a button you need to make sure `src/component/block` exists. If it doesn't you'll have to create it manually or run the seng enerator in [forced mode](https://github.com/mediamonks/seng-generator#generate)*

*Note 2: make sure to add the newly generated block to the `src/block/index.js`*

#### Typing block data
When a block is created you get a `[blockNam]Data.js` file in your block folder, you should use this file to predefine all the data that your block will receive from the backend in the page call. This typing is done using [VueTypes](https://github.com/dwightjack/vue-types) which is included in the vue-skeleton. Typing your data is a way to avoid data mismatches with the backend and for generating documentation.

```javascript
import VueTypes from 'vue-types';
import { ButtonType, LinkType } from 'vue-block-system';

export default {
	heading: VueTypes.string.isRequired,
	link: VueTypes.shape({
		label: VueTypes.string.isRequired,
		title: VueTypes.string.isRequired,
		type: VueTypes.oneOf([
			ButtonType.ACTION,
			ButtonType.LINK,
		]),
		link: VueTypes.shape({
			type: VueTypes.oneOf([
				LinkType.INTERNAL,
				LinkType.EXTERNAL,
				LinkType.EXTERNAL_BLANK,
			]).isRequired,
			target: VueTypes.string.isRequired,
		}),
	}),
};

```

#### Using Block Data


## Extra features
Beside the basic usage there are a couple of extra features added which make it faster to build block websites.

### Nesting blocks within blocks
You can nest blocks within blocks in two different ways. One would be an array of blocks which could be anything. Another way would be an object with keys as the block id and the data as the value

#### Nesting blocks within blocks using an array
When nesting blocks with an array you must provide an array with blocks like shown below, in this case the **BlockBar** has a child block which is named **BlockFoo**. When nesting blocks within other blocks while using an array you cannot type the contents of the array since its dynamic, when you want to force certain blocks as a child you you should use the [object method of nesting blocks](#nesting-blocks-within-blocks-using-an-object).

```json
{
	"statusCode": 200,
	"data": {
		"title": "Home",
		"data": {},
		"blocks": [
			{
				"id": "BlockBar",
				"data": {
					"blocks": [
						{
							"id": "BlockFoo",
							"data": {}
						}
					]
				}
			}
		]
	}
}
```

You should update the `BlockBarData.js` file to let it expect blocks as data, since it's an array it could be anything so we can use the following:

```javascript
import VueTypes from 'vue-types';

export default {
	blocks: VueTypes.array,
};
```

To make sure the **BlockFoo** is dynamically rendered within **BlockBar** you have to add the following piece of code to the blockBar template file:

```html
<component
	v-for="(block, index) in data.blocks"
	@isReady="handleBlockComponentReady"
	:scrollId="block.scrollId"
	:data="block.data"
	:debugLabel="true"
	:is="block.id"
	:componentId="block.id + '.' + block.blockIndex"
	:key="index" />
```
This will make sure the data is passed to the new block, all the callback methods are properly set and the right component is loaded. Everything should be pretty much plug and play!

#### Nesting blocks within blocks using an object
When nesting blocks within an object you must provide an object with blocks like shown below, in this case the **BlockBar** has a child block which is named **BlockFoo**

```json
{
	"statusCode": 200,
	"data": {
		"title": "Home",
		"data": {},
		"blocks": [
			{
				"id": "BlockBar",
				"data": {
					"blocks": {
						"BlockFoo": {
							"data": {}
						}
					}				
				}
			}
		]
	}
}
```

You should update the `BlockBarData.js` file to let it expect blocks as data, since it's an object you could use the following:

```javascript
import VueTypes from 'vue-types';

export default {
	blocks: VueTypes.shape({
		BlockBar: VueTypes.shape({
			blockIndex: VueTypes.number,
			data: VueTypes.object
		});
	}),
};
```
*Note: The blockIndex has to be added when we use object style of nesting blocks*

To make sure the **BlockFoo** is dynamically rendered within **BlockBar** you have to add the following piece of code to the blockBar template file:

```html
<component
	v-for="(block, key) in data.blocks"
	@isReady="handleBlockComponentReady"
	:class="$style[camelCase(key)]"
	:scrollId="block.scrollId"
	:data="block.data"
	:is="key"
	:componentId="key + '.' + block.blockIndex"
	:key="key" />
```
This will make sure the data is passed to the new block, all the callback methods are properly set and the right component is loaded. Everything should be pretty much plug and play!

### Buttons
Buttons are pretty common in fancy websites to make sure you keep them structured and in the same directory I've added a template for buttons. 

#### Generating a button
Once you've completed [step 1](#step-1:-configure-the-seng-generator) the button-component should be visible once you run

```sh
sg wizard
```

**Note:** *The first time you generate a button you need to make sure `src/component/button` exists. If it doesn't you'll have to create it manually or run the seng enerator in [forced mode](https://github.com/mediamonks/seng-generator#generate)*

#### Added data to the button
When creating a button you need to provide a couple of props:

1. **type**
	- Type: `LinkType` 
	- Required: `true`
2. **label**
	- Type: `string`
	- Required: `true`	
3. **link**	
	- Type `ILink`
	- required: `false` - the link is only required if the type is set to LinkType.LINK

**Action example:**

```html
<ButtonFoo 
	label="Click me" 
	:type="ButtonType.ACTION" 
	@click="handleClick"></ButtonFoo>
```

**Link example:**

```html
<ButtonFoo 
	label="Click me" 
	:type="ButtonType.LINK" 
	:link="{
		type: LinkType.INTERNAL,
		target: 'path/to/page',
		title: 'Click me',
	}"></ButtonFoo>
```

### Before and after route changes
The vue-router offers a couple of [in-component guards](https://router.vuejs.org/en/advanced/navigation-guards.html), these guards are used for detecting page changes and updating the current layout.

#### Before route change
If you want to hijack the before route update you can use the `beforeRouteUpdate` method to prepend your application specific code (for example: adding a full page mask to do pretty page transitions).

```typescript
export default {
	name: 'HomePage',
	extends: AbstractContentPageComponent,
	beforeRouteUpdate(to, from, next) {
		// Add your awesome project specific code here.
		console.log('Awesome!');
		// When you are done, you should call the next method!
		next();
	},
};

```

#### After route change
After a route change is completed a method is triggered, this can be used to hide your full page mask or trigger page tracking code. 

```typescript
export default {
	name: 'HomePage',
	extends: AbstractContentPageComponent,
	methods: {
		handleRouteChangeComplete() {
			// Route change is completed.
			// This means all new blocks are registered and in the DOM.
		},
	},
};

```

### Custom data in the init call
The init call should contain the routes object, this object defines the default landing route and the not found route. Sometimes you might want to add custom data to this init call that is project specific. This can be done by [subscribing](https://vuex.vuejs.org/en/plugins.html) to the init mutation and passing along your data. Your example init call response could look like this:

```json
{
  "statusCode": 200,
  "data": {
	"routes": {
	  "landing": "/home",
	  "notFound": "/page-not-found"
	},
	"user": {
	  "firstName": "John",
	  "lastName": "Doe"
	}
  }
}
```
In the `src/control/startUp.js` file you can add the following piece of code before the vue-block-system plugin is initialized:

```typescript
...
// Subscribe to the mutation so we can store the init data in other stores as well!
const unSubscribe = store.subscribe((mutation) => {
	if (mutation.type === 'init/setData') {
		// un-subscribe after we received the setData mutation
		unSubscribe();
		// commit the data to the desired stores
		store.commit(`user/${SET_USER}`, mutation.payload.user);
	}
});
...
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
