import Vue from 'vue';
import axios from 'axios';
import VueExposePlugin from 'util/VueExposePlugin';
import { URLNames, PropertyNames, VariableNames } from 'data/enum/configNames';
import PageNames from 'data/enum/PageNames';
import Pages from 'data/enum/Pages';
import { createPath } from 'util/routeUtils';
import Params from 'data/enum/Params';
import { getValue } from 'util/injector';
import { CONFIG_MANAGER, GATEWAY } from 'data/Injectables';
import localeLoader from 'util/localeLoader';
import BlockSystem from 'vue-block-system';
import block from 'block';
import { SET_USER } from '../store/module/user/user';

const initPlugins = (store) => {
	const configManager = getValue(CONFIG_MANAGER);

	// expose objects to the Vue prototype for easy access in your vue templates and components
	Vue.use(VueExposePlugin, {
		$config: configManager,
		$gateway: getValue(GATEWAY),
		$http: axios,
		$versionRoot: configManager.getVariable(VariableNames.VERSIONED_STATIC_ROOT),
		$staticRoot: configManager.getVariable(VariableNames.STATIC_ROOT),
		URLNames,
		PropertyNames,
		VariableNames,
		PageNames,
		Pages,
		Params,
		createPath,
	});

	// Enable the block system!
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
};

const waitForLocale = store => new Promise((resolve) => {
	if (localeLoader.isLoaded(store.getters.currentLanguage.code)) {
		resolve();
	} else {
		localeLoader.setLoadCallback((locale) => {
			if (locale === store.getters.currentLanguage.code) {
				resolve();
			}
		});
	}
});

const startUp = (store) => {
	// Subscribe to the mutation so we can store the init data in other stores as well!
	const unSubscribe = store.subscribe((mutation) => {
		if (mutation.type === 'init/setData') {
			// un-subscribe after we received the setData mutation
			unSubscribe();
			// commit the data to the desired stores
			store.commit(`user/${SET_USER}`, mutation.payload.user);
		}
	});

	// Initialise plugins
	initPlugins(store);

	const configManager = getValue(CONFIG_MANAGER);

	// Add async methods to the Promise.all array
	return Promise.all([
		Vue.blockSystemReady,
		configManager.getVariable(VariableNames.LOCALE_ENABLED) ? waitForLocale(store) : Promise.resolve(),
	]);
};

export default startUp;
