import { createApp } from 'vue';
import 'bulma';

import { library } from '@fortawesome/fontawesome';
import fas from '@fortawesome/fontawesome-free-solid/';

import { Notification, Config } from '@oruga-ui/oruga-next';
import '@oruga-ui/oruga-next/dist/oruga.css';

import moment from 'moment';

import App from './App.vue';
import router from './router';

library.add(fas);

let app = createApp(App);
app.config.globalProperties.$moment = moment;
app
    .use(router)
    .use(Notification)
    .use(Config, { iconPack: 'fas' })
    .use(moment)
    .mount('#app');
