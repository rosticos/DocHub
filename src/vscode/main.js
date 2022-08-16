import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';
import Vuex from 'vuex';
import App from './app/components/app.vue';
// import VueCookie from 'vue-cookie';
import gitlab from '@/storage/gitlab';

import DocHubDoc from '@/components/Docs/DocHubDoc.vue';
import Context from '@/components/Architecture/Context.vue';
import Anchor from '@/components/Tools/Anchor.vue';
import Image from '@/components/Tools/Image.vue';
import Aspect from '@/components/Architecture/Aspect.vue';
import Component from '@/components/Architecture/Component.vue';
import Technology from '@/components/Techradar/Technology.vue';
import Radar from '@/components/Techradar/Main.vue';
import PlantUML from '@/components/Schema/PlantUML.vue';
// import GlobalMixin from '@/mixins/global';

import { vuetify } from '@/app/plugins/vuetify';
import { createRouter } from '@/vscode/create-router';
import { createStore } from '@/vscode/store/store';

import '@/assets/styles/main.css';
import { createProviders } from './create-providers';

Vue.use(Vuex);
// Vue.use(VueCookie);

const store = new Vuex.Store(gitlab);
store.dispatch('init');

Vue.component('dochub-doc', DocHubDoc);
Vue.component('dochub-context', Context);
Vue.component('dochub-component', Component);
Vue.component('dochub-aspect', Aspect);
Vue.component('dochub-anchor', Anchor);
Vue.component('dochub-image', Image);
Vue.component('dochub-technology', Technology);
Vue.component('dochub-radar', Radar);
Vue.component('dochub-plantuml', PlantUML);

// Vue.mixin(GlobalMixin);

function main() {
	const providers = createProviders();
	const store = createStore();
	const router = createRouter();
  
	const app = new Vue({
		provide: {
			...providers
		},
		render(createElement) {
			return createElement(App);
		},
		router,
		vuetify,
		store
	});

	app.$mount('#app');
}

main();

