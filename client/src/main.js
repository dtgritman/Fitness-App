import { createApp } from 'vue';
import 'bulma';
import { library } from '@fortawesome/fontawesome';
import fas from '@fortawesome/fontawesome-free-solid/';


import App from './App.vue';
import router from './router';

library.add(fas);
createApp(App).use(router).mount('#app');
