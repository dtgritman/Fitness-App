import { createRouter, createWebHistory } from 'vue-router'
import session from '../services/session'
import Home from '../views/Home.vue'
import MyProfile from '../views/MyProfile.vue'
import Friends from '../views/Friends.vue'
import Activity from '../views/Activity.vue'
import Feed from '../views/Feed.vue'


const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'MyProfile',
        path: '/myprofile',
        component: MyProfile,
        meta: { requiresLogin: true }
    },
    {
        name: 'Activity',
        path: '/activity',
        component: Activity,
        meta: { requiresLogin: true }
    },
    {
        name: 'Friends',
        path: '/friends',
        component: Friends,
        meta: { requiresLogin: true }
    },
    {
        name: 'Feed',
        path: '/feed',
        component: Feed,
        meta: { requiresLogin: true }
    },
    {
        name: 'Signup',
        path: '/signup',
        component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('../views/Login.vue')
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresLogin && !session.user) {
        session.toRoute = to.fullPath;
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router
