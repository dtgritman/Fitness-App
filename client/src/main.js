import { createApp } from 'vue';
import 'bulma';

import { library } from '@fortawesome/fontawesome';
import fas from '@fortawesome/fontawesome-free-solid/';

import { Notification } from '@oruga-ui/oruga-next';
import '@oruga-ui/oruga-next/dist/oruga.css';

import App from './App.vue';
import router from './router';

library.add(fas);
createApp(App)
    .use(router)
    .use(Notification)
    .use(Config, {
        iconPack: 'fas'
    })
    .mount('#app');
