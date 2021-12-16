import { createApp } from 'vue';
import 'bulma';
import moment from 'moment';

import { library } from '@fortawesome/fontawesome';
import fas from '@fortawesome/fontawesome-free-solid/';

import { Autocomplete, Notification, Config } from '@oruga-ui/oruga-next';
import '@oruga-ui/oruga-next/dist/oruga.css';

import App from './App.vue';
import router from './router';

library.add(fas);

const app = createApp(App);
app.config.globalProperties.$moment = moment;
app
    .use(router)
    .use(Autocomplete)
    .use(Notification)
    .use(Config, { iconPack: 'fas' })
    .mount('#app');
